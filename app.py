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

@app.route("/items")
def get_items():
  query = """
    SELECT * FROM items
  """
  g.db["cursor"].execute(query)
  items = g.db["cursor"].fetchall()
  return jsonify(items)

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

# TO-DO: finish Edit and Delete Routes
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
    SET (name, description, imageurl, price, active)
    WHERE item_id =
  """


