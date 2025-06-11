from flask import Flask
from flask import request
from flask_cors import CORS
from RouteGen import genRoute
import numpy as np

app = Flask(__name__)
CORS(app)

@app.route("/")
def hello():
    return "Hello World!"

@app.route("/gen-route", methods=['POST', 'GET'])
def getRoutes():
    content = request.get_json()

    coords = np.array([list(map(float, coord.split(','))) for coord in content['coords']])
    origin = np.fromstring(content['origin'], sep=',')

    route = genRoute(coords, origin)
    waypoints = "|".join(f"{x[0]},{x[1]}" for x in route[:-1])
    destination = f'{route[len(route) - 1][0]}, {route[len(route) - 1][1]}'

    return f'https://www.google.com/maps/dir/?api=1&origin={origin[0]},{origin[1]}&destination={destination}&waypoints={waypoints}'

if __name__ == "__main__":
    app.run()