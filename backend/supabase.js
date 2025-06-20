const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

const supabase = require('@supabase/supabase-js').createClient(supabaseUrl, supabaseAnonKey);

if (supabaseUrl && supabaseAnonKey) {
  console.log('Supabase client initialized successfully.');
} else {
  console.error('Supabase URL or Anon Key is missing. Please check your .env file.');
}

module.exports = supabase;