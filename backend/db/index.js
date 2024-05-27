// const { Pool } = require('pg');
// require('dotenv').config();

// const pool = new Pool({
//   user: process.env.DB_USER,
//   host: process.env.DB_HOST,
//   database: process.env.DB_NAME,
//   password: process.env.DB_PASS,
//   port: process.env.DB_PORT
// });

// module.exports = {
//   query: (query) => {
//     return pool.query(query).then(result => result.rows);
//   },
// }
const  { createClient } = require('@supabase/supabase-js');
require('dotenv').config();


const supabaseUrl = 'https://vcvposrykwlbtbzglzrx.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)
module.exports = {supabase}