-- PLAY NOW: Supabase database schema
create extension if not exists pgcrypto;
create table if not exists public.content (
  id bigint primary key,
  title text not null,
  type text not null check (type in ('movies','series','programs','cartoon')),
  genre text default '',
  year int default 2026,
  rating numeric(3,1) default 0,
  views bigint default 0,
  duration text default '',
  description text default '',
  image_url text default '',
  video_url text default '',
  featured boolean default false,
  created_at timestamptz default now()
);
create index if not exists content_type_idx on public.content(type);
create index if not exists content_featured_idx on public.content(featured);
alter table public.content enable row level security;
create policy "public can read content" on public.content for select using (true);
create policy "authenticated can insert content" on public.content for insert to authenticated with check (true);
create policy "authenticated can update content" on public.content for update to authenticated using (true) with check (true);
create policy "authenticated can delete content" on public.content for delete to authenticated using (true);

create table if not exists public.live_settings (
  id int primary key default 1,
  enabled boolean default false,
  provider text default 'IPTV',
  mode text default 'm3u' check (mode in ('m3u','xtream','portal')),
  source_url text default '',
  portal_url text default '',
  username text default '',
  password text default '',
  updated_at timestamptz default now()
);
create table if not exists public.live_channels (
  id bigserial primary key,
  name text not null,
  logo_url text default '',
  group_name text default 'LIVE',
  stream_url text not null,
  enabled boolean default true,
  featured boolean default false,
  sort_order int default 0,
  created_at timestamptz default now()
);
alter table public.live_settings enable row level security;
alter table public.live_channels enable row level security;
create policy "public can read live channels" on public.live_channels for select using (enabled=true);
create policy "authenticated manage live settings" on public.live_settings for all to authenticated using (true) with check (true);
create policy "authenticated manage live channels" on public.live_channels for all to authenticated using (true) with check (true);
