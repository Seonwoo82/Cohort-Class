-- Create users table with additional profile fields
create table if not exists public.users (
  id uuid references auth.users on delete cascade not null primary key,
  email text,
  full_name text,
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS on users table
alter table public.users enable row level security;

-- Create policy to allow users to view their own profile
create policy "Users can view own profile" on public.users
  for select using (auth.uid() = id);

-- Create policy to allow users to update their own profile
create policy "Users can update own profile" on public.users
  for update using (auth.uid() = id);

-- Create classes table
create table if not exists public.classes (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text,
  image_url text,
  instructor_id uuid references public.users(id) on delete cascade not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS on classes table
alter table public.classes enable row level security;

-- Create policy to allow anyone to view classes
create policy "Anyone can view classes" on public.classes
  for select using (true);

-- Create policy to allow instructors to manage their classes
create policy "Instructors can manage own classes" on public.classes
  for all using (auth.uid() = instructor_id);

-- Create enrollments table
create table if not exists public.enrollments (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.users(id) on delete cascade not null,
  class_id uuid references public.classes(id) on delete cascade not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, class_id)
);

-- Enable RLS on enrollments table
alter table public.enrollments enable row level security;

-- Create policy to allow users to view their own enrollments
create policy "Users can view own enrollments" on public.enrollments
  for select using (auth.uid() = user_id);

-- Create policy to allow users to enroll themselves
create policy "Users can enroll themselves" on public.enrollments
  for insert with check (auth.uid() = user_id);

-- Create policy to allow users to unenroll themselves
create policy "Users can unenroll themselves" on public.enrollments
  for delete using (auth.uid() = user_id);

-- Create storage bucket for class images and avatars
insert into storage.buckets (id, name, public) values ('public', 'public', true);

-- Create storage policy to allow anyone to view public files
create policy "Anyone can view public files"
  on storage.objects for select
  using ( bucket_id = 'public' );

-- Create storage policy to allow authenticated users to upload files
create policy "Authenticated users can upload files"
  on storage.objects for insert
  with check ( bucket_id = 'public' AND auth.role() = 'authenticated' );

-- Create storage policy to allow users to update and delete their own files
create policy "Users can update and delete own files"
  on storage.objects for all
  using ( bucket_id = 'public' AND auth.uid() = owner )
  with check ( bucket_id = 'public' AND auth.uid() = owner ); 