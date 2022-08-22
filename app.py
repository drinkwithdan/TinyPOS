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

# INDEX ROUTE
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

@app.route("/users/register", methods=["POST"])
def register():
  username = request.json["username"]
  password = request.json["password"]
  password_hash = generate_password_hash(password)
  query = """
    INSERT INTO users
    (username, password_hash)
    VALUES (%s, %s)
    RETURNING user_id, username
  """
  cur = g.db["cursors"]

  try:
    cur.execute(query, (username, password_hash))
  except psycopg2.IntegrityError:
    return jsonify(success=False, msg="Username already taken")
  
  g.db["connection"].commit()
  user = cur.fetchone()
  session["user"] = user
  return jsonify(success=True, user=user)


