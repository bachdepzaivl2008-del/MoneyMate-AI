-- 1. Bảng Profiles (Lưu cài đặt người dùng)
create table profiles (
  id uuid references auth.users on delete cascade primary key,
  user_persona text,
  theme text default 'light',
  simple_mode boolean default false,
  currency text default 'VND',
  enabled_features jsonb default '{"budgets": true, "goals": true, "aiInsights": true, "debt": true, "investments": true, "recurring": true, "reports": true}'::jsonb,
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- 2. Bảng Wallets (Ví tiền)
create table wallets (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  name text not null,
  balance numeric default 0,
  icon text,
  color text,
  is_default boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- 3. Bảng Transactions (Giao dịch)
create table transactions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  wallet_id uuid references wallets on delete cascade not null,
  title text not null,
  amount numeric not null,
  type text check (type in ('income', 'expense')),
  category text,
  date timestamp with time zone default timezone('utc'::text, now()),
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- 4. Bảng Budgets (Ngân sách)
create table budgets (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  category text not null,
  "limit" numeric not null,
  color text,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- 5. Bảng Savings Goals (Mục tiêu tiết kiệm)
create table savings_goals (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  name text not null,
  target_amount numeric not null,
  saved_amount numeric default 0,
  deadline date,
  icon text,
  color text,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Row Level Security (RLS) - Bảo mật dữ liệu người dùng
alter table profiles enable row level security;
alter table wallets enable row level security;
alter table transactions enable row level security;
alter table budgets enable row level security;
alter table savings_goals enable row level security;

-- Policies (Quyền truy cập)
create policy "Users can view their own profile" on profiles for select using (auth.uid() = id);
create policy "Users can update their own profile" on profiles for update using (auth.uid() = id);

create policy "Users can manage their own wallets" on wallets for all using (auth.uid() = user_id);
create policy "Users can manage their own transactions" on transactions for all using (auth.uid() = user_id);
create policy "Users can manage their own budgets" on budgets for all using (auth.uid() = user_id);
create policy "Users can manage their own goals" on savings_goals for all using (auth.uid() = user_id);
