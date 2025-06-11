from sklearn.cluster import KMeans  
import numpy as np 
from scipy.spatial.distance import cdist 
import GenClustersNum as cn

def genRoute(coords, origin):
    x = np.array(coords)
    num_clusters = cn.getCustersNum(coords)
    if num_clusters < 1:
        num_clusters = 1

    kmeans = KMeans(n_clusters=num_clusters, random_state=42).fit(x)

    centers = kmeans.cluster_centers_
    distances = cdist([origin], centers)[0]
    ordem_clusters = np.argsort(distances)

    final_route = []

    clusters = genClusters(coords)
    for cluster_id in clusters:
        pontos_cluster = clusters[cluster_id]  
        rota_cluster = orderCoords(pontos_cluster, origin)  
        final_route.extend(rota_cluster)

    return  [list(coord) for coord in final_route]

def genClusters(coords):
    x = np.array(coords)
    kmeans = KMeans(cn.getCustersNum(coords), random_state=42).fit(x)

    labels = kmeans.labels_

    clusters = {}

    for idx, label in enumerate(labels):
        if label not in clusters:
            clusters[label] = []
        clusters[label].append(coords[idx])
    
    return clusters

def orderCoords(coords, origin):
    remaining_coords = coords.copy()
    route = []
    current = origin

    while remaining_coords:
        distances = cdist([current], remaining_coords)[0]
        closer_idx = np.argmin(distances)
        nex = remaining_coords.pop(closer_idx)
        route.append(nex)
        current = nex
    
    return route