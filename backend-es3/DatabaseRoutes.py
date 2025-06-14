from flask import request, Blueprint, jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql import text
from sqlalchemy.orm import with_polymorphic
from Models import User, Cliente
from extensions import db

dbr = Blueprint('database', __name__)

@dbr.route('/user/<string:email>')
def user_info(email):
    user = db.session.query(User.id, User.email, User.password, User.user_type).filter_by(email=email).first()
    if user:
        return jsonify({'id': user.id, 'email': user.email, 'user_type': user.user_type})
    return jsonify({'error': 'Usuário não encontrado'}), 404

@dbr.route('/users/register',  methods=['POST'])
def usuarios():
    content = request.get_json()
    print(content)
    try:
        with db.session.begin():
            print('Begin')
            result = db.session.execute(text("SELECT RegistrarUsuario(:param1, :param2, :param3, :param4, :param5, :param6)"), {
                'param1': content['nome'],
                'param2': content['email'],
                'param3': content['password'],
                'param4': content['cel'],
                'param5': content['user_type'],
                'param6': content['endereco']
            })

            return 'Usuario Registrado', 204
    except Exception as e:
        db.session.rollback()
        return jsonify(error=str(e))

@dbr.route('/users/login', methods=['POST'])
def login():
    content = request.get_json()
    requestInfo = [content['email'], content['password'], content['user_type']]
    try:
        usuario = db.session.execute(text("SELECT * FROM AutenticarUsuario(:param1, :param2, :param3)"),
                                      {
                                          'param1': requestInfo[0],
                                          'param2': requestInfo[1],
                                          'param3': requestInfo[2]
                                      }
                                    ).fetchone()

        if not usuario:
            return jsonify({"error": 'Usuario não encontrado'}), 404
        
        user_data = {
            'id': usuario[0],
            'nome': usuario[1],
            'email': usuario[2],
            'cel': usuario[3],
            'user_type': requestInfo[2],
            'status': 200
        }

        # Adiciona endereço se for cliente
        if content['user_type'] == '0':
            user_data['endereco'] = usuario[4]

        return jsonify(user_data)
    except Exception as e:
        db.session.rollback()
        user_data = {
            'msg': str(e),
            'status': 400
        }
        return jsonify(user_data)