from flask import Flask, render_template
from flask_consulate import Consul
from products.controllers.product_controller import product_controller
from db.db import db
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/healthcheck')
def health_check():
    return "OK", 200

app.config.from_object('config.Config')
db.init_app(app)

consul = Consul(app)
consul.register_service(name='products_service', interval='10s', tags=['products'], port=5003, httpcheck='http://localhost:5003/healthcheck')

app.register_blueprint(product_controller)

if __name__ == '__main__':
    app.run()
