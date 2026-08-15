import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const url = process.env.EXPO_PUBLIC_SUPABASE_URL ?? 'https://aycfrqzgyeeteamxacof.supabase.co';
const key = process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? 'sb_publishable_4Y7VeRJiPxbHgYOOwr5tTg_ixDM-ptP';

export const isSupabaseConfigured = Boolean(url && key);
export const supabase = createClient(url || 'https://placeholder.supabase.co', key || 'placeholder', {
  auth: { storage: AsyncStorage, autoRefreshToken: true, persistSession: true, detectSessionInUrl: false },
});
