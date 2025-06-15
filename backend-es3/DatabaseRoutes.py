from flask import request, Blueprint, jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql import text
from sqlalchemy.orm import with_polymorphic
from Models import User, Cliente
from extensions import db
from RouteGen import adrToCoord, coordToAdr

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
    endereco = adrToCoord(content['endereco'])
    try:
        with db.session.begin():
            result = db.session.execute(text("SELECT RegistrarUsuario(:param1, :param2, :param3, :param4, :param5, :param6)"), {
                'param1': content['nome'],
                'param2': content['email'],
                'param3': content['password'],
                'param4': content['cel'],
                'param5': content['user_type'],
                'param6': endereco
            }).fetchone()

            print(result)

            if result and hasattr(result, 'registrarusuario'):
                if 'violates unique constraint' in result.registrarusuario:
                    raise ValueError("E-mail já cadastrado")
                elif 'error' in result.registrarusuario.lower():
                    raise ValueError(result.registrarusuario)
            
            return jsonify({
                'msg': 'Usuário registrado com sucesso',
                'status': 201
            }), 201

    except Exception as e:
        db.session.rollback()
        user_data = {
            'msg': str(e),
            'status': 400
        }
        return jsonify(user_data), 400

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
            user_data['endereco'] = coordToAdr(usuario[4])

        return jsonify(user_data), 200
    except Exception as e:
        db.session.rollback()
        user_data = {
            'msg': str(e),
            'status': 400
        }
        return jsonify(user_data), 400
    
@dbr.route('/users/buscarpedidos', methods=['POST'])
def getDeliveries():
    content = request.get_json()
    try:
        result = db.session.execute(text(
            "select * FROM buscar_pedidos(:param1, :param2)" 
        ), {
            'param1': content['id'],
            'param2': content['user_type']
        })

        deliveries = [dict(row._asdict()) for row in result]
        

        for delivery in deliveries:
            if 'endereco' in delivery and isinstance(delivery['endereco'], str) and ',' in delivery['endereco']:
                try:
                    # Tenta converter e sobrescreve o campo original
                    delivery['endereco'] = coordToAdr(delivery['endereco']) or delivery['endereco']
                except Exception as e:
                    print(f"Falha ao converter {delivery['endereco']}: {e}")
                    # Mantém as coordenadas originais se houver erro


        return jsonify({
            'data': deliveries,
            'status': 200
        }), 200

    except Exception as e:
        db.session.rollback()
        user_data = {
            'msg': str(e),
            'status': 400
        }
        return jsonify(user_data), 400


@dbr.route('/users/buscarpedidosrota', methods=['POST'])
def getDeliveriesRoute():
    content = request.get_json()
    try:
        result = db.session.execute(text(
            "select * FROM pedidos_em_rota(:param1, :param2)" 
        ), {
            'param1': content['id'],
            'param2': content['user_type']
        })

        deliveries = [dict(row._asdict()) for row in result]
        

        for delivery in deliveries:
            if 'endereco' in delivery and isinstance(delivery['endereco'], str) and ',' in delivery['endereco']:
                try:
                    # Tenta converter e sobrescreve o campo original
                    delivery['endereco'] = coordToAdr(delivery['endereco']) or delivery['endereco']
                except Exception as e:
                    print(f"Falha ao converter {delivery['endereco']}: {e}")
                    # Mantém as coordenadas originais se houver erro


        return jsonify({
            'data': deliveries,
            'status': 200
        }), 200

    except Exception as e:
        db.session.rollback()
        user_data = {
            'msg': str(e),
            'status': 400
        }
        return jsonify(user_data), 400
    
@dbr.route('/users/confirmarEntrega',  methods=['POST'])
def confirmarEntrega():
    content = request.get_json()
    try:
        with db.session.begin():
            db.session.execute(text("SELECT update_pedido(:param1, :param2)"), {
                'param1': content['cod'],
                'param2': content['id']
            })

        return jsonify({
            'msg': 'Pedido entregue com sucesso',
            'status': 200
        }), 200

    except Exception as e:
        db.session.rollback()
        user_data = {
            'msg': str(e),
            'status': 400
        }
        return jsonify(user_data), 400