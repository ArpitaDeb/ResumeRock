const express = require('express');
const router = express.Router();

module.exports = (db) => {
  const getUserByEmail = async (email) => {
    const { data, error } = await db.supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (error) {
      throw error;
    }
    return data;
  };

  const registerUser = async (user) => {

    const { data, error } = await db.supabase
      .from('users')
      .insert([{ username: user.username, email: user.email, password: user.password }])
      .select()
      .single();

    if (error) {
      throw error;
    }
    return data;
  };

  const createEmptyResume = async (userID) => {
    console.log('Creating empty resume for user ID:', userID);
    if (!userID) {
      throw new Error('User ID is undefined when creating empty resume');
    }
    const { data, error } = await db.supabase
      .from('resume')
      .insert([{ user_id: userID }])
      .single();

    if (error) {
      throw error;
    }
    return data;
  };

  router.post('/', async (req, res) => {
    const { username, email, password } = req.body;
    try {
      const { data, error } = await db.supabase
        .from('users')
        .insert([{ username, email, password }])
        .single();
      if (error) {
        throw error;
      }
      res.json(data);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  });

  router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      let templateVars = {
        errorMsg: "Please fill in all details to register"
      };
      return res.json(templateVars);
    }
    const values = { username, email, password };
    
    try {
      const newUser = await registerUser(values);
      console.log('New User:', newUser);
      if (!newUser || !newUser.id) {
        throw new Error('User registration failed.');
      }
      await createEmptyResume(newUser.id);
    
      req.session['user_id'] = newUser.id;
      req.session.username = newUser.username;
      res.json({});
    } catch (error) {
      console.log(error);
      res.status(422).json({ error: error.message });
    }
  });

  router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      let templateVars = {
        errorMsg: "Please fill in all details to login",
        user: req.session
      };
      return res.status(401).json(templateVars);
    }

    try {
      const user = await getUserByEmail(email);

      if (!user) {
        let templateVars = {
          errorMsg: 'Email is not registered with us',
          user: req.session
        };
        return res.status(401).json(templateVars);
      } else if (user.password !== password) {
        let templateVars = {
          errorMsg: 'Invalid credentials, please try again',
          user: req.session
        };
        return res.status(401).json(templateVars);
      } else {
        req.session['user_id'] = user.id;
        req.session.username = user.username;
        res.json({});
      }
    } catch (error) {
      console.log(error);
      res.status(500).end();
    }
  });

  router.get('/', async (req, res) => {
    const userID = req.session['user_id'];

    if (!userID) {
      return res.status(400).send('User ID is not set in the session.');
    }

    try {
      const { data, error } = await db.supabase
        .from('users')
        .select('*')
        .eq('id', userID)
        .single();

      if (error) {
        throw error;
      }

      res.json(data);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  });

  router.get('/logout', (req, res) => {
    req.session['user_id'] = null;
    req.session.username = null;
    res.status(200).end();
  });

  return router;
};