export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      devis_requests: {
        Row: {
          city: string | null
          created_at: string
          description: string | null
          email: string | null
          estimated_surface_m2: number | null
          free_dimensions: string | null
          full_name: string | null
          id: string
          length_m: number | null
          message: string | null
          name: string | null
          phone: string | null
          postal_code: string | null
          project_type: string | null
          project_type_label: string | null
          project_type_slug: string | null
          surface_estimate: string | null
          width_m: number | null
        }
        Insert: {
          city?: string | null
          created_at?: string
          description?: string | null
          email?: string | null
          estimated_surface_m2?: number | null
          free_dimensions?: string | null
          full_name?: string | null
          id?: string
          length_m?: number | null
          message?: string | null
          name?: string | null
          phone?: string | null
          postal_code?: string | null
          project_type?: string | null
          project_type_label?: string | null
          project_type_slug?: string | null
          surface_estimate?: string | null
          width_m?: number | null
        }
        Update: {
          city?: string | null
          created_at?: string
          description?: string | null
          email?: string | null
          estimated_surface_m2?: number | null
          free_dimensions?: string | null
          full_name?: string | null
          id?: string
          length_m?: number | null
          message?: string | null
          name?: string | null
          phone?: string | null
          postal_code?: string | null
          project_type?: string | null
          project_type_label?: string | null
          project_type_slug?: string | null
          surface_estimate?: string | null
          width_m?: number | null
        }
        Relationships: []
      }
      email_send_log: {
        Row: {
          created_at: string
          error_message: string | null
          id: string
          message_id: string | null
          metadata: Json | null
          recipient_email: string
          status: string
          template_name: string
        }
        Insert: {
          created_at?: string
          error_message?: string | null
          id?: string
          message_id?: string | null
          metadata?: Json | null
          recipient_email: string
          status: string
          template_name: string
        }
        Update: {
          created_at?: string
          error_message?: string | null
          id?: string
          message_id?: string | null
          metadata?: Json | null
          recipient_email?: string
          status?: string
          template_name?: string
        }
        Relationships: []
      }
      email_send_state: {
        Row: {
          auth_email_ttl_minutes: number
          batch_size: number
          id: number
          retry_after_until: string | null
          send_delay_ms: number
          transactional_email_ttl_minutes: number
          updated_at: string
        }
        Insert: {
          auth_email_ttl_minutes?: number
          batch_size?: number
          id?: number
          retry_after_until?: string | null
          send_delay_ms?: number
          transactional_email_ttl_minutes?: number
          updated_at?: string
        }
        Update: {
          auth_email_ttl_minutes?: number
          batch_size?: number
          id?: number
          retry_after_until?: string | null
          send_delay_ms?: number
          transactional_email_ttl_minutes?: number
          updated_at?: string
        }
        Relationships: []
      }
      email_unsubscribe_tokens: {
        Row: {
          created_at: string
          email: string
          id: string
          token: string
          used_at: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          token: string
          used_at?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          token?: string
          used_at?: string | null
        }
        Relationships: []
      }
      gallery_categories: {
        Row: {
          active: boolean
          cover_url: string | null
          created_at: string
          description: string | null
          display_order: number
          id: string
          slug: string
          title: string
        }
        Insert: {
          active?: boolean
          cover_url?: string | null
          created_at?: string
          description?: string | null
          display_order?: number
          id?: string
          slug: string
          title: string
        }
        Update: {
          active?: boolean
          cover_url?: string | null
          created_at?: string
          description?: string | null
          display_order?: number
          id?: string
          slug?: string
          title?: string
        }
        Relationships: []
      }
      gallery_photos: {
        Row: {
          alt_text: string | null
          caption: string | null
          category_id: string | null
          created_at: string
          display_order: number
          id: string
          url: string
        }
        Insert: {
          alt_text?: string | null
          caption?: string | null
          category_id?: string | null
          created_at?: string
          display_order?: number
          id?: string
          url: string
        }
        Update: {
          alt_text?: string | null
          caption?: string | null
          category_id?: string | null
          created_at?: string
          display_order?: number
          id?: string
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "gallery_photos_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "gallery_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      gallery_section: {
        Row: {
          id: number
          subtitle: string | null
          title: string | null
          updated_at: string
        }
        Insert: {
          id?: number
          subtitle?: string | null
          title?: string | null
          updated_at?: string
        }
        Update: {
          id?: number
          subtitle?: string | null
          title?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      project_types: {
        Row: {
          active: boolean
          created_at: string
          description: string | null
          display_order: number
          id: string
          label: string
          price_from: number | null
          price_unit: string
          show_price: boolean
          slug: string
          updated_at: string
        }
        Insert: {
          active?: boolean
          created_at?: string
          description?: string | null
          display_order?: number
          id?: string
          label: string
          price_from?: number | null
          price_unit?: string
          show_price?: boolean
          slug: string
          updated_at?: string
        }
        Update: {
          active?: boolean
          created_at?: string
          description?: string | null
          display_order?: number
          id?: string
          label?: string
          price_from?: number | null
          price_unit?: string
          show_price?: boolean
          slug?: string
          updated_at?: string
        }
        Relationships: []
      }
      quote_section: {
        Row: {
          id: number
          subtitle: string | null
          tag: string | null
          title: string | null
          updated_at: string
        }
        Insert: {
          id?: number
          subtitle?: string | null
          tag?: string | null
          title?: string | null
          updated_at?: string
        }
        Update: {
          id?: number
          subtitle?: string | null
          tag?: string | null
          title?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      service_area: {
        Row: {
          cta_text: string | null
          description: string | null
          id: number
          tag: string | null
          title: string | null
          updated_at: string
        }
        Insert: {
          cta_text?: string | null
          description?: string | null
          id?: number
          tag?: string | null
          title?: string | null
          updated_at?: string
        }
        Update: {
          cta_text?: string | null
          description?: string | null
          id?: number
          tag?: string | null
          title?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      service_area_cities: {
        Row: {
          created_at: string
          display_order: number
          id: string
          is_headquarters: boolean
          name: string
        }
        Insert: {
          created_at?: string
          display_order?: number
          id?: string
          is_headquarters?: boolean
          name: string
        }
        Update: {
          created_at?: string
          display_order?: number
          id?: string
          is_headquarters?: boolean
          name?: string
        }
        Relationships: []
      }
      site_content: {
        Row: {
          data: Json
          key: string
          updated_at: string
        }
        Insert: {
          data?: Json
          key: string
          updated_at?: string
        }
        Update: {
          data?: Json
          key?: string
          updated_at?: string
        }
        Relationships: []
      }
      site_content_fields: {
        Row: {
          content_type: Database["public"]["Enums"]["content_type"]
          content_value: string | null
          field_key: string
          id: string
          section_key: string
          site_id: string
          updated_at: string
        }
        Insert: {
          content_type?: Database["public"]["Enums"]["content_type"]
          content_value?: string | null
          field_key: string
          id?: string
          section_key: string
          site_id: string
          updated_at?: string
        }
        Update: {
          content_type?: Database["public"]["Enums"]["content_type"]
          content_value?: string | null
          field_key?: string
          id?: string
          section_key?: string
          site_id?: string
          updated_at?: string
        }
        Relationships: []
      }
      suppressed_emails: {
        Row: {
          created_at: string
          email: string
          id: string
          metadata: Json | null
          reason: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          metadata?: Json | null
          reason: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          metadata?: Json | null
          reason?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      why_us_cards: {
        Row: {
          active: boolean
          created_at: string
          description: string | null
          display_order: number
          icon_name: string | null
          id: string
          title: string
          updated_at: string
        }
        Insert: {
          active?: boolean
          created_at?: string
          description?: string | null
          display_order?: number
          icon_name?: string | null
          id?: string
          title: string
          updated_at?: string
        }
        Update: {
          active?: boolean
          created_at?: string
          description?: string | null
          display_order?: number
          icon_name?: string | null
          id?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      why_us_section: {
        Row: {
          cta_text: string | null
          id: number
          tag: string | null
          title: string | null
          updated_at: string
        }
        Insert: {
          cta_text?: string | null
          id?: number
          tag?: string | null
          title?: string | null
          updated_at?: string
        }
        Update: {
          cta_text?: string | null
          id?: number
          tag?: string | null
          title?: string | null
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      delete_email: {
        Args: { message_id: number; queue_name: string }
        Returns: boolean
      }
      email_queue_dispatch: { Args: never; Returns: undefined }
      enqueue_email: {
        Args: { payload: Json; queue_name: string }
        Returns: number
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      move_to_dlq: {
        Args: {
          dlq_name: string
          message_id: number
          payload: Json
          source_queue: string
        }
        Returns: number
      }
      read_email_batch: {
        Args: { batch_size: number; queue_name: string; vt: number }
        Returns: {
          message: Json
          msg_id: number
          read_ct: number
        }[]
      }
    }
    Enums: {
      app_role: "admin" | "user"
      content_type: "text" | "image" | "richtext"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
      content_type: ["text", "image", "richtext"],
    },
  },
} as const
