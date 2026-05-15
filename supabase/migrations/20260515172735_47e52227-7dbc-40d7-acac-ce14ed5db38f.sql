
-- Roles
create type public.app_role as enum ('admin', 'user');

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.app_role not null,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);

alter table public.user_roles enable row level security;

create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from public.user_roles where user_id = _user_id and role = _role);
$$;

create policy "user_roles readable by self or admin"
  on public.user_roles for select
  using (auth.uid() = user_id or public.has_role(auth.uid(), 'admin'));

create policy "admins manage roles"
  on public.user_roles for all
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));

-- Site content
create table public.site_content (
  key text primary key,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.site_content enable row level security;

create policy "site content public read"
  on public.site_content for select
  using (true);

create policy "admins write site content"
  on public.site_content for all
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));

create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end; $$;

create trigger site_content_touch
  before update on public.site_content
  for each row execute function public.touch_updated_at();

-- Storage bucket for uploaded images
insert into storage.buckets (id, name, public)
values ('site-images', 'site-images', true)
on conflict (id) do nothing;

create policy "site-images public read"
  on storage.objects for select
  using (bucket_id = 'site-images');

create policy "site-images admin write"
  on storage.objects for insert
  with check (bucket_id = 'site-images' and public.has_role(auth.uid(), 'admin'));

create policy "site-images admin update"
  on storage.objects for update
  using (bucket_id = 'site-images' and public.has_role(auth.uid(), 'admin'));

create policy "site-images admin delete"
  on storage.objects for delete
  using (bucket_id = 'site-images' and public.has_role(auth.uid(), 'admin'));
