from flask import Flask, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from routes import bp
import envmock as em

db = SQLAlchemy()


from sqlalchemy import Integer, String
from sqlalchemy.orm import Mapped, mapped_column

class User(db.Model):
    __tablename__ = 'usuarios'
    id: Mapped[int] = mapped_column(primary_key=True)
    user_type: Mapped[str]
    email: Mapped[str] = mapped_column(unique=True)
    password: Mapped[str]


app = Flask(__name__)
CORS(app)


@app.route("/")
def hello():
    return "Hello World!"

app.config['SQLALCHEMY_DATABASE_URI'] = f'postgresql+psycopg2://{em.DB_USER}:{em.DB_PASSWD}@{em.DB_HOST}:{em.DB_PORT}/{em.DB_NAME}'
print(f'postgresql://{em.DB_USER}:{em.DB_PASSWD}@{em.DB_HOST}:{em.DB_PORT}/{em.DB_NAME}')
app.register_blueprint(bp)
db.init_app(app)

@app.route('/user/<string:email>')
def user_info(email):
    user = db.session.query(User.id, User.email, User.password, User.user_type).filter_by(email=email).first()
    if user:
        return jsonify({'id': user.id, 'email': user.email, 'user_type': user.user_type})
    return jsonify({'error': 'Usuário não encontrado'}), 404

if __name__ == "__main__":
    app.run()