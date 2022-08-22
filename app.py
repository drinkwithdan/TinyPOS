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
  print(items)
  return jsonify(items)
