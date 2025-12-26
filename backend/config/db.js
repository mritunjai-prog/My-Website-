import { createClient } from "@supabase/supabase-js";
import { config } from "./env.js";

const supabaseUrl = config.supabase.url;
const supabaseKey = config.supabase.key;

if (!supabaseUrl || !supabaseKey) {
  console.error("❌ Missing Supabase credentials in .env file");
  console.error("Please add SUPABASE_URL and SUPABASE_KEY to backend/.env");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

console.log("✅ Supabase Connected");

export default supabase;
