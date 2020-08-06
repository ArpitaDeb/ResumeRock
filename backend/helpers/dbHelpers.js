module.exports = (db) => {
  const registerUser = (values) => {
    const query = {
      text: `INSERT INTO users (userName, email, password) VALUES ($1, $2, $3) RETURNING *;`,
      values
    }
    return db
      .query(query)
      .then(result => res.json(result[0]));
  };
  const getUserByEmail = (email) => {
    const query = {
      text: `SELECT * FROM users WHERE email = $1;`,
      values: [email],
    };
    return db
      .query(query)
      .then(result => res.json(result[0]));
  };
  return {
    registerUser,
    getUserByEmail
  };
};