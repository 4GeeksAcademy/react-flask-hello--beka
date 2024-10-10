from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash

api = Blueprint('api', __name__)

# Configurar CORS para permitir el origen específico y métodos necesarios
CORS(api, resources={r"/*": {
    "origins": ["https://fictional-space-lamp-7vv6qv7g64w5cprg7-3000.app.github.dev"],
    "methods": ["GET", "POST", "OPTIONS"],
    "allow_headers": ["Content-Type", "Authorization"]
}})

@api.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    # Validaciones básicas
    if not email or not password:
        return jsonify({"message": "Email y contraseña son requeridos"}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({"message": "Email ya está en uso"}), 400

    try:
        new_user = User(email=email, password=generate_password_hash(password), is_active=True)
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"message": "Usuario creado exitosamente"}), 201
    except Exception as e:
        db.session.rollback()  # Asegúrate de revertir la sesión en caso de error
        return jsonify({"message": "Error al crear el usuario", "error": str(e)}), 500

@api.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()
    if user and check_password_hash(user.password, password):
        return jsonify({"message": "Inicio de sesión exitoso", "user_id": user.id}), 200
    return jsonify({"message": "Credenciales inválidas"}), 401

@api.route('/logout', methods=['POST'])
def logout():
    return jsonify({"message": "Sesión cerrada exitosamente"}), 200

@api.route('/private', methods=['GET'])
def private():
    return jsonify({"message": "Bienvenido a la ruta privada!"}), 200
