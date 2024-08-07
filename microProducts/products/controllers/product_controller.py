from flask import Blueprint, request, jsonify
from products.models.product_model import Products
from db.db import db

product_controller = Blueprint('product_controller', __name__)

@product_controller.route('/api/products', methods=['GET'])
def fetch_products():
    print("Retrieving product list")
    products = Products.query.all()
    output = [{'id': p.id, 'name': p.name, 'description': p.description, 'price': p.price} for p in products]
    return jsonify(output)

@product_controller.route('/api/products/<int:id>', methods=['GET'])
def fetch_product(id):
    print("Fetching product")
    product = Products.query.get_or_404(id)
    return jsonify({'id': product.id, 'name': product.name, 'description': product.description, 'price': product.price})

@product_controller.route('/api/products', methods=['POST'])
def add_product():
    data = request.json
    new_product = Products(name=data['name'], description=data['description'], price=data['price'])
    db.session.add(new_product)
    db.session.commit()
    return jsonify({'message': 'Product successfully created'}), 201

@product_controller.route('/api/products/<int:id>', methods=['PUT'])
def modify_product(id):
    product = Products.query.get_or_404(id)
    data = request.json
    product.name = data['name']
    product.description = data['description']
    product.price = data['price']
    db.session.commit()
    return jsonify({'message': 'Product successfully updated'})

@product_controller.route('/api/products/<int:id>', methods=['DELETE'])
def remove_product(id):
    product = Products.query.get_or_404(id)
    db.session.delete(product)
    db.session.commit()
    return jsonify({'message': 'Product successfully deleted'})