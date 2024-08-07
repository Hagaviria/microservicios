from db.db import db

class Products(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    price = db.Column(db.Integer, nullable=False)

    def __init__(self, name, description, price):
        self.name = name
        self.description = description
        self.price = price

