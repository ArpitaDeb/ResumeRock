const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get('/', async (req, res) => {
    const userID = req.session.user_id;
    
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
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  });
  

  router.post('/', async (req, res) => {
    console.log("post to resume: req.body", req.body);
 
    const { resumeData } = req.body;
    const userID = req.session.user_id;

    if (!userID) {
      return res.status(400).send('User ID is not set in the session.');
    }

    if (!resumeData) {
      return res.status(400).send('Resume data is not provided.');
    }

    try {
      const { data, error } = await db.supabase
        .from('resume')
        .update({ resumedata: resumeData })
        .eq('user_id', userID);

      if (error) {
        console.log("post err", error);
        throw error;
      }

      res.status(200).send('All good!');
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  });

  return router;

};