from flask import Flask
from flask_cors import CORS
from Routes import bp
from DatabaseRoutes import dbr
import os
from extensions import db
import ssl

app = Flask(__name__)
@app.route("/")
def hello():
    return "Hello World!"

db_user = os.getenv('DB_USER', 'postgres')  
db_pass = os.getenv('DB_PASSWD', '')
db_host = os.getenv('DB_HOST', 'localhost')
db_name = os.getenv('DB_NAME', 'postgres')

try:
    db_port = int(os.getenv('DB_PORT', '5432'))
except ValueError:
    db_port = 5432 
app.config['SQLALCHEMY_DATABASE_URI'] = (
    f'postgresql+psycopg2://{db_user}:{db_pass}'
    f'@{db_host}:{db_port}/{db_name}'
)

app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')

app.register_blueprint(bp)
app.register_blueprint(dbr)

db.init_app(app)
CORS(app)

if __name__ == "__main__":
    app.run(
        host='192.168.0.151',
        port=5000,
        ssl_context=('cert.pem', 'key.pem')
    )
