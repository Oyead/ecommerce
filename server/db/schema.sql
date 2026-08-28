-- E-commerce persistent database schema (PostgreSQL / NeonDB)
-- Products, categories and brands are served by the external
-- ecommerce.routemisr.com API, so we persist user-generated data here.

BEGIN;

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ---------------------------------------------------------------------------
-- Users
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS users (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name          TEXT NOT NULL,
  email         TEXT NOT NULL UNIQUE,
  phone         TEXT,
  password      TEXT NOT NULL,                 -- bcrypt hash
  reset_code    TEXT,                          -- password recovery code
  reset_code_expires_at TIMESTAMPTZ,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- A phone number may be registered by only one account.
CREATE UNIQUE INDEX IF NOT EXISTS users_phone_key ON users(phone);

-- ---------------------------------------------------------------------------
-- Addresses (user saved shipping addresses)
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS addresses (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name        TEXT NOT NULL,                   -- label e.g. "Home"
  details     TEXT NOT NULL,                   -- street / building / apartment
  city        TEXT NOT NULL,
  phone       TEXT,
  is_default  BOOLEAN NOT NULL DEFAULT false,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_addresses_user ON addresses(user_id);

-- ---------------------------------------------------------------------------
-- Cart items
-- product_id is the external ecommerce.routemisr.com product id (text).
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS cart_items (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  product_id  TEXT NOT NULL,
  count       INTEGER NOT NULL DEFAULT 1 CHECK (count >= 1),
  price       NUMERIC(10, 2),                  -- unit price snapshot at add time
  UNIQUE (user_id, product_id),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_cart_items_user ON cart_items(user_id);

-- ---------------------------------------------------------------------------
-- Wishlist
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS wishlist_items (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  product_id  TEXT NOT NULL,
  UNIQUE (user_id, product_id),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_wishlist_user ON wishlist_items(user_id);

-- ---------------------------------------------------------------------------
-- Orders
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS orders (
  id                 UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id            UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  total_price        NUMERIC(10, 2) NOT NULL,
  payment_method     TEXT NOT NULL DEFAULT 'card',
  payment_status     TEXT NOT NULL DEFAULT 'pending', -- pending | paid | failed
  address_name       TEXT,
  address_details    TEXT,
  address_city       TEXT,
  address_phone      TEXT,
  shipping_fee       NUMERIC(10, 2) NOT NULL DEFAULT 0,
  created_at         TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_orders_user ON orders(user_id);

-- ---------------------------------------------------------------------------
-- Order items (snapshot of each product at checkout time)
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS order_items (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id     UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id   TEXT NOT NULL,
  title        TEXT,
  image_cover  TEXT,
  price        NUMERIC(10, 2) NOT NULL,        -- unit price at checkout
  count        INTEGER NOT NULL DEFAULT 1,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_order_items_order ON order_items(order_id);

-- ---------------------------------------------------------------------------
-- Updated-at trigger helper
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_users_updated ON users;
CREATE TRIGGER trg_users_updated BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

DROP TRIGGER IF EXISTS trg_cart_items_updated ON cart_items;
CREATE TRIGGER trg_cart_items_updated BEFORE UPDATE ON cart_items
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

COMMIT;
