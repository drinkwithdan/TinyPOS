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
from twilio.rest import Client

from .db import get_db, close_db

# # # # # INITIALISING # # # # #

app = Flask(__name__, static_folder="./build", static_url_path="/")
app.secret_key = os.environ.get("SECRET_KEY")

@app.before_request
def connect_to_db():
  get_db()

@app.after_request
def disconnect_from_db(response):
  close_db()
  return response

# # # # # TWILIO API # # # # #


def twilio_SMS(order):
  # # Un-comment below for SMS functionality:

  # customer_number = order["contact"]
  # formatted_number = f"+61{customer_number}"
  # account_sid = os.environ["TWILIO_ACCOUNT_SID"]
  # auth_token = os.environ["TWILIO_AUTH_TOKEN"]
  # twilio_number=os.environ["TWILIO_NUMBER"]
  # client = Client(account_sid, auth_token)

  # message = client.messages \
  #               .create(
  #                    body="Your Tiny Tacos order is ready for collection!",
  #                    from_=twilio_number,
  #                    to=formatted_number
  #                )

  # print(message.sid)

  # # End commented section
  print("Message sent to customer")

  
# # # # # CRUD RESTFUL ROUTES FOR ITEMS # # # # #

# INDEX ROUTE "GET" ITEMS
@app.route("/items")
def get_items():
  query = """
    SELECT * FROM items
    ORDER BY item_id ASC
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

  # Get order_items for each order
  for order in orders:
    query = """
      SELECT * FROM order_items
      WHERE order_id = %s
    """
    g.db["cursor"].execute(query, (order["order_id"],))
    order_items = g.db["cursor"].fetchall()
    order["items"] = order_items
  return jsonify(orders)

# NEW ORDER "POST" ROUTE
@app.route("/orders/new", methods=["POST"])
def new_order():
  name = request.json["name"]
  contact = request.json["contact"]
  total = request.json["total"]
  items = request.json["items"]

  # CREATING NEW ORDER
  query = """
    INSERT INTO orders
    (name, contact, total)
    VALUES (%s, %s, %s)
    RETURNING *
  """
  g.db["cursor"].execute(query, (name, contact, total))
  g.db["connection"].commit()
  new_order = g.db["cursor"].fetchone()

  # CREATING NEW ORDER ITEMS
  # Add (item_id, cart_quantity) to a new List (filtering out all other cart item data)
  order_items = []
  for item in items:
    order_items.append({"item_id": item["item_id"], "cart_quantity": item["cartQuantity"], "item_name": item["name"]})
  
  # Looping through the new order_items List and adding each item to the order_items table
  created_order_items = []
  for item in order_items:
    query = """
      INSERT INTO order_items
      (order_id, item_id, quantity, item_name)
      VALUES
      (%s, %s, %s, %s)
      RETURNING *
    """
    g.db["cursor"].execute(query, (new_order["order_id"], item["item_id"], item["cart_quantity"], item["item_name"]))
    g.db["connection"].commit()
    new_order_item = g.db["cursor"].fetchone()
    created_order_items.append(new_order_item)
  
  new_order["items"] = created_order_items
  return jsonify(new_order)

# # (NOT NEEDED FOR MVP)
# # SHOW ORDER_ITEMS "GET" ROUTE
# @app.route("orders/items/<id>")
# def show_order_items(id):
#   order_id = request.json["order_id"]
#   query = """
#     SELECT * FROM order_items
#     WHERE order_id = %s
#   """
#   g.db["cursor"].execute(query, (order_id,))
#   order_items = g.db["cursor"].fetchall()
#   return jsonify(order_items)

# EDIT ORDER "PUT" ROUTE
@app.route("/orders/edit/<id>", methods=["PUT"])
def edit_order(id):
  order_id = request.json["order_id"]
  new_status = request.json["new_status"]
  query = """
    UPDATE orders
    SET status = %s
    WHERE order_id = %s
    RETURNING *
  """
  g.db["cursor"].execute(query, (new_status, order_id))
  g.db["connection"].commit()
  updated_order = g.db["cursor"].fetchone()

  # If order.status = 3 (completed) - call Twilio API to send "completed" SMS
  if updated_order["status"] == 3:
    twilio_SMS(updated_order)

  # Fetch order items for this order and append to updated_order
  query = """
  SELECT * FROM order_items
  WHERE order_id = %s
  """
  g.db["cursor"].execute(query, (order_id,))
  order_items = g.db["cursor"].fetchall()
  updated_order["items"] = order_items

  return jsonify(updated_order)

# # (NOT NEEDED FOR MVP)
# # DESTROY ORDER "DELETE" ROUTE
# app.route("/orders/<id>", methods=["DELETE"])
# def delete_order(id):
#   order_id = request.json["order_id"]
#   query = """
#     DELETE FROM orders
#     WHERE order_id = %s
#     RETURNING *
#   """
#   g.db["cursor"].execute(query, (order_id,))
#   g.db["connection"].commit()
#   deleted_order = g.db["cursor"].fetchone()
#   return jsonify(deleted_order)

# # # # # DEPLOYMENT # # # # #

# Default route
app.route("/")
def index():
  return app.send_static_file("index.html")

# React route to index.html
@app.errorhandler(404)
def not_found(e):
  return app.send_static_file("index.html")

if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=False, port=os.environ.get('PORT', 80))

