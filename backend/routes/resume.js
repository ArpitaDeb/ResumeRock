const express = require('express');
const router = express.Router();

module.exports = (db) => {
  // Middleware to check user session
  const checkSession = (req, res, next) => {
    const userID = req.session.user_id;
    if (!userID) {
      return res.status(400).send('User ID is not set in the session.');
    }
    next();
  };

  router.get('/', checkSession, async (req, res) => {
    const userID = req.session.user_id;
    console.log('Fetching resume for user ID:', userID);

    try {
      const { data, error } = await db.supabase
        .from('resume')
        .select('*')
        .eq('user_id', userID);

      if (error) {
        throw error;
      }

      res.json(data);
    } catch (err) {
      console.error('Error fetching resume:', err);
      res.status(500).send('Internal Server Error');
    }
  });

  router.post('/', checkSession, async (req, res) => {
    const { resumeData } = req.body;
    const userID = req.session.user_id;
    console.log('Updating resume for user ID:', userID, 'with data:', resumeData);

    if (!resumeData) {
      return res.status(400).send('Resume data is not provided.');
    }

    try {
      const { data, error } = await db.supabase
        .from('resume')
        .update({ resumedata: resumeData })
        .eq('user_id', userID);

      if (error) {
        throw error;
      }

      res.status(200).send('Resume updated successfully!');
    } catch (err) {
      console.error('Error updating resume:', err);
      res.status(500).send('Internal Server Error');
    }
  });

  return router;
};
