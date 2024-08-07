from flask import Flask, render_template
from flask_consulate import Consul
from users.controllers.user_controller import user_controller
from db.db import db
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/healthcheck')
def healthcheck():
    return "OK", 200

app.config.from_object('config.Config')
db.init_app(app)

consul = Consul(app)
consul.register_service(name='users', interval='10s', tags=['users'], port=5002, httpcheck='http://localhost:5002/healthcheck')

# Registrando el blueprint del controlador de usuarios
app.register_blueprint(user_controller)

if __name__ == '__main__':
    app.run()
