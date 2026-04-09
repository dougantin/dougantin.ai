create table if not exists public.tickers (
  symbol text primary key,
  name text not null,
  vertical text not null,
  vehicle_type text not null check (vehicle_type in ('equity', 'etf')),
  description text not null,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.daily_snapshots (
  id bigint generated always as identity primary key,
  symbol text not null references public.tickers(symbol) on delete cascade,
  snapshot_date date not null,
  price numeric,
  change numeric,
  change_percent numeric,
  ytd_change_pct numeric,
  previous_close numeric,
  day_high numeric,
  day_low numeric,
  market_cap numeric,
  enterprise_value numeric,
  ev_to_sales numeric,
  operating_margin numeric,
  fetched_at timestamptz not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (symbol, snapshot_date)
);

create index if not exists daily_snapshots_snapshot_date_idx
  on public.daily_snapshots (snapshot_date desc);

create index if not exists daily_snapshots_symbol_snapshot_date_idx
  on public.daily_snapshots (symbol, snapshot_date desc);

alter table public.tickers enable row level security;
alter table public.daily_snapshots enable row level security;

drop policy if exists "Public read tickers" on public.tickers;
create policy "Public read tickers"
  on public.tickers
  for select
  using (true);

drop policy if exists "Public read daily snapshots" on public.daily_snapshots;
create policy "Public read daily snapshots"
  on public.daily_snapshots
  for select
  using (true);
