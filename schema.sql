DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS items CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS order-items CASCADE;

CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL
);

CREATE TABLE items (
  item_id SERIAL PRIMARY KEY,
  name VARCHAR(100) UNIQUE NOT NULL,
  description VARCHAR(255),
  imageURL VARCHAR(255),
  price FLOAT,
  active BOOLEAN DEFAULT True
);

CREATE TABLE orders (
  order_id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  contact INTEGER,
  status INTEGER DEFAULT 1,
  timestamp TIMESTAMP DEFAULT current_timestamp
);

CREATE TABLE order_items (
  item_id SERIAL REFERENCES items (item_id) ON DELETE CASCADE,
  order_id SERIAL REFERENCES orders (order_id) ON DELETE CASCADE,
  quantity INTEGER
);

