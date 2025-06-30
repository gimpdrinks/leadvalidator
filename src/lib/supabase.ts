import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          company: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          company?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          company?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      projects: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          description: string | null;
          api_key: string;
          webhook_url: string | null;
          email_notifications: boolean;
          notification_email: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          description?: string | null;
          api_key: string;
          webhook_url?: string | null;
          email_notifications?: boolean;
          notification_email?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          name?: string;
          description?: string | null;
          api_key?: string;
          webhook_url?: string | null;
          email_notifications?: boolean;
          notification_email?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      leads: {
        Row: {
          id: string;
          project_id: string;
          email: string;
          phone: string | null;
          first_name: string | null;
          last_name: string | null;
          company: string | null;
          message: string | null;
          form_data: any;
          validation_score: number;
          email_valid: boolean;
          phone_valid: boolean | null;
          ip_address: string | null;
          user_agent: string | null;
          referrer: string | null;
          is_spam: boolean;
          is_qualified: boolean;
          webhook_sent: boolean;
          webhook_attempts: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          project_id: string;
          email: string;
          phone?: string | null;
          first_name?: string | null;
          last_name?: string | null;
          company?: string | null;
          message?: string | null;
          form_data?: any;
          validation_score: number;
          email_valid: boolean;
          phone_valid?: boolean | null;
          ip_address?: string | null;
          user_agent?: string | null;
          referrer?: string | null;
          is_spam?: boolean;
          is_qualified?: boolean;
          webhook_sent?: boolean;
          webhook_attempts?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          project_id?: string;
          email?: string;
          phone?: string | null;
          first_name?: string | null;
          last_name?: string | null;
          company?: string | null;
          message?: string | null;
          form_data?: any;
          validation_score?: number;
          email_valid?: boolean;
          phone_valid?: boolean | null;
          ip_address?: string | null;
          user_agent?: string | null;
          referrer?: string | null;
          is_spam?: boolean;
          is_qualified?: boolean;
          webhook_sent?: boolean;
          webhook_attempts?: number;
          created_at?: string;
        };
      };
    };
  };
};