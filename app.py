# # # # # IMPORTS # # # # #

from urllib import response
from flask import (
    Flask,
    redirect,
    jsonify,
    session,
    request,
    g
)
from werkzeug.security import generate_password_hash, check_password_hash
import psycopg2
import os

from .db import get_db, close_db

# # # # # INITIALISING # # # # #

app = Flask(__name__)
app.secret_key = os.environ.get("SECRET_KEY")

@app.before_request
def connect_to_db():
  get_db()

@app.after_request
def disconnect_from_db(response):
  close_db()
  return response

# # # # # CRUD RESTFUL ROUTES FOR ITEMS # # # # #

# INDEX ROUTE "GET" ITEMS
@app.route("/items")
def get_items():
  query = """
    SELECT * FROM items
  """
  g.db["cursor"].execute(query)
  items = g.db["cursor"].fetchall()
  return jsonify(items)

# NEW ITEM "POST" ROUTE
@app.route("/items/new", methods=["POST"])
def new_item():
  name = request.json["name"]
  description = request.json["description"]
  imageURL = request.json["imageURL"]
  price = request.json["price"]
  active = request.json["active"]
  query = """
    INSERT INTO items
    (name, description, imageURL, price, active)
    VALUES (%s, %s, %s, %s, %s)
    RETURNING *
  """
  g.db["cursor"].execute(query, (name, description, imageURL, price, active))
  g.db["connection"].commit()
  new_item = g.db["cursor"].fetchone()
  return jsonify(new_item)

# EDIT "PUT" ROUTE
@app.route("/items/edit/<id>", methods=["PUT"])
def edit_item(id):
  name = request.json["name"]
  description = request.json["description"]
  imageurl = request.json["imageurl"]
  price = request.json["price"]
  active = request.json["active"]
  item_id = request.json['item_id']
  query = """
    UPDATE items
    SET name = %s, description = %s, imageurl = %s, price = %s, active = %s
    WHERE item_id = %s
    RETURNING *
  """
  g.db["cursor"].execute(query, (name, description, imageurl, price, active, item_id))
  g.db["connection"].commit()
  edited_item = g.db["cursor"].fetchone()
  return jsonify(edited_item)

# DESTROY "DELETE" ROUTE
@app.route("/items/delete", methods=["DELETE"])
def delete_item():
  item_id = request.json["item_id"]
  print(item_id)
  query = """
    DELETE FROM items
    WHERE item_id = %s
    RETURNING *
  """
  g.db["cursor"].execute(query, (item_id,))
  g.db["connection"].commit()
  deleted_item = g.db["cursor"].fetchone()
  return jsonify(deleted_item)

# # # # # RESTFUL ROUTES FOR USERS # # # # #

# REGISTER "POST" NEW USER ROUTE
@app.route("/users/register", methods=["POST"])
def register():
  username = request.json["username"]
  password = request.json["password"]
  secret = request.json["secret"]

  # Check secret phrase matches, else return out
  if secret != os.environ.get("SECRET_PHRASE"):
    return jsonify(success=False, msg="Incorrect details")
  
  password_hash = generate_password_hash(password)
  query = """
    INSERT INTO users
    (username, password_hash)
    VALUES (%s, %s)
    RETURNING user_id, username
  """
  cur = g.db["cursor"]

  # Check if username already exists
  try:
    cur.execute(query, (username, password_hash))
  except psycopg2.IntegrityError:
    return jsonify(success=False, msg="Username already taken")
  
  g.db["connection"].commit()
  user = cur.fetchone()
  session["user"] = user
  return jsonify(success=True, user=user)

# LOGIN "POST" ROUTE
@app.route("/users/login", methods=["POST"])
def login():
  username = request.json["username"]
  password = request.json["password"]
  query = """
    SELECT * FROM users
    WHERE username = %s
  """
  cur = g.db["cursor"]
  cur.execute(query, (username,))
  user = cur.fetchone()

  # Check username
  if user is None:
    return jsonify(success=False, msg="Username or password is incorrect")
  
  password_matches = check_password_hash(user["password_hash"], password)

  # Check password
  if not password_matches:
    return jsonify(success=False, msg="Username or password is incorrect")

  user.pop("password_hash")
  session["user"] = user
  return jsonify(success=True, user=user)

# LOGOUT "POST" ROUTE 
@app.route("/users/logout", methods=["post"])
def logout():
  session.pop("user", None)
  return jsonify(success=True)

# IS-AUTHENTICATED "GET" ROUTE 
@app.route("/users/is-authenticated")
def is_authenticated():
  user = session.get("user", None)
  if user:
    return jsonify(success=True, user=user)
  else:
    return jsonify(success=False, msg="User is not logged in")

# # # # # RESTFUL ROUTES FOR ORDERS # # # # #

# INDEX "GET" ORDERS ROUTE
@app.route("/orders")
def get_orders():
  query = """
    SELECT * FROM orders
  """
  g.db["cursor"].execute(query)
  orders = g.db["cursor"].fetchall()
  return jsonify(orders)

# NEW ORDER "POST" ROUTE
@app.route("/orders/new", methods=["POST"])
def new_order():
  name = request.json["name"]
  contact = request.json["contact"]
  items = request.json["items"]
  print(items)
  # query = """
  #   INSERT INTO orders
  #   (name, contact)
  #   VALUES (%s, %s)
  #   RETURNING *
  # """
  # g.db["cursor"].execute(query, (name, contact))
  # g.db["connection"].commit()
  # new_order = g.db["cursor"].fetchone()
  return jsonify("Bonjour")

# SHOW ORDER "GET" ROUTE
def show_order():
  # pass in id
  query = """
    SELECT * FROM orders
    WHERE order.order_id === %s
  """
  g.db["cursor"].execute(query, (id,))
  order = g.db["cursor"].fetchone()
  return jsonify(order)

# EDIT ORDER "PUT" ROUTE
def edit_order():
  order_id = request.json["order_id"]
  status = request.json["status"]
  query = """
    UPDATE orders
    SET status = %s
    WHERE orders.order_id = %s
    RETURNING *
  """
  g.db["cursor"].execute(query, (status, order_id))
  g.db["connection"].commit()
  order = g.db["cursor"].fetchone()
  return jsonify(order)

