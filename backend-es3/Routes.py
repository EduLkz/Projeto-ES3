from RouteGen import genRoute
import numpy as np
from flask import request, Blueprint

bp = Blueprint('routes', __name__)

@bp.route("/gen-route", methods=['POST'])
def getRoutes():
    content = request.get_json()

    coords = np.array([list(map(float, coord.split(','))) for coord in content['coords']])
    origin = np.fromstring(content['origin'], sep=',')

    route = genRoute(coords, origin)
    waypoints = "|".join(f"{x[0]},{x[1]}" for x in route[:-1])
    destination = f'{route[len(route) - 1][0]}, {route[len(route) - 1][1]}'

    return f'https://www.google.com/maps/dir/?api=1&origin={origin[0]},{origin[1]}&destination={destination}&waypoints={waypoints}'

