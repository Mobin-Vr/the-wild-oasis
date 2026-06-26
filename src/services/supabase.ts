import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;

export const supabase = createClient(
  supabaseUrl,
  import.meta.env.VITE_SUPABASE_ANON_KEY as string
);