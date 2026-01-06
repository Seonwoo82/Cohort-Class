-- Create a table to store instructor leads
create table if not exists public.instructor_leads (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  phone text not null,
  course_title text,
  expected_price text,
  expected_students text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table public.instructor_leads enable row level security;

-- Policy: Allow public insert (since this is a landing page form)
create policy "Allow public insert to instructor_leads"
on public.instructor_leads
for insert
to public
with check (true);

-- Policy: Allow only admins to view (assuming RLS is needed for viewing later, though public client won't view it)
-- For now, we might not strictly need a view policy if we only insert from server action, 
-- but it's good practice to restrict viewing.
