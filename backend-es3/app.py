from flask import Flask
from flask_cors import CORS
from Routes import bp
from DatabaseRoutes import dbr
import envmock as em
from extensions import db

app = Flask(__name__)
@app.route("/")
def hello():
    return "Hello World!"

app.config['SQLALCHEMY_DATABASE_URI'] = f'postgresql+psycopg2://{em.DB_USER}:{em.DB_PASSWD}@{em.DB_HOST}:{em.DB_PORT}/{em.DB_NAME}'
print(f'postgresql://{em.DB_USER}:{em.DB_PASSWD}@{em.DB_HOST}:{em.DB_PORT}/{em.DB_NAME}')

app.register_blueprint(bp)
app.register_blueprint(dbr)

db.init_app(app)
CORS(app)

if __name__ == "__main__":
    app.run()