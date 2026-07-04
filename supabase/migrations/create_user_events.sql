-- Run this in Supabase SQL Editor (Dashboard → SQL Editor → New query)
-- Creates the user_events table for behavior tracking

CREATE TABLE IF NOT EXISTS public.user_events (
  id          uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id  text        NOT NULL,
  event_type  text        NOT NULL,   -- 'page_view' | 'scroll_depth' | 'section_view' | 'cta_click'
  event_data  jsonb       DEFAULT '{}',
  user_agent  text,
  created_at  timestamptz DEFAULT now()
);

-- Index for analytics queries
CREATE INDEX IF NOT EXISTS idx_user_events_session   ON public.user_events (session_id);
CREATE INDEX IF NOT EXISTS idx_user_events_type      ON public.user_events (event_type);
CREATE INDEX IF NOT EXISTS idx_user_events_created   ON public.user_events (created_at DESC);

-- Allow anonymous inserts (anon key) — read requires service_role
ALTER TABLE public.user_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "allow_anon_insert" ON public.user_events
  FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "allow_service_select" ON public.user_events
  FOR SELECT TO service_role USING (true);
