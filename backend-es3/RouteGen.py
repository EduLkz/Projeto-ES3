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

import requests
import re

def adrToCoord(endereco):
    try:
        estados = {
            "Acre": "AC", "Alagoas": "AL", "Amapá": "AP", "Amazonas": "AM", "Bahia": "BA",
            "Ceará": "CE", "Distrito Federal": "DF", "Espírito Santo": "ES", "Goiás": "GO",
            "Maranhão": "MA", "Mato Grosso": "MT", "Mato Grosso do Sul": "MS", "Minas Gerais": "MG",
            "Pará": "PA", "Paraíba": "PB", "Paraná": "PR", "Pernambuco": "PE", "Piauí": "PI",
            "Rio de Janeiro": "RJ", "Rio Grande do Norte": "RN", "Rio Grande do Sul": "RS",
            "Rondônia": "RO", "Roraima": "RR", "Santa Catarina": "SC", "São Paulo": "SP",
            "Sergipe": "SE", "Tocantins": "TO"
        }

        # Extrai e remove CEP do endereço
        cep_match = re.search(r'\d{5}-\d{3}', endereco)
        cep = cep_match.group() if cep_match else ""
        endereco = re.sub(r'CEP:\s*\d{5}-\d{3}', '', endereco)
        endereco = endereco.replace(cep, '').strip()

        # Normaliza separadores e espaços
        endereco = endereco.replace(' - ', ', ')
        endereco = endereco.replace('-', ',')  # hífens restantes viram vírgulas
        endereco = re.sub(r'\s+', ' ', endereco).strip()

        # Substitui o nome completo do estado pela sigla, se encontrar no final
        for nome_estado, uf in estados.items():
            if endereco.endswith(f", {nome_estado}"):
                endereco = endereco[:-(len(nome_estado) + 2)] + f", {uf}"
                break


        url = f"https://nominatim.openstreetmap.org/search?format=json&q={endereco}"
        response = requests.get(url, headers={'User-Agent': 'YourApp/1.0'})
        data = response.json()
        
        if data:
            latitude = float(data[0]['lat'])
            longitude = float(data[0]['lon'])
            return f"{latitude},{longitude}"
        return None
    except Exception as e:
        print(f"Erro ao geocodificar: {e}")
        return None

def coordToAdr(coordenadas):
    try:
        lat, lon = coordenadas.split(',')
        url = f"https://nominatim.openstreetmap.org/reverse?format=json&lat={lat}&lon={lon}"
        response = requests.get(url, headers={'User-Agent': 'YourApp/1.0'})
        data = response.json()
        adr = data.get('address', '')
        Addr = f'{adr.get('road', '')}, {adr.get('suburb', '')}, {adr.get('city', '')} - {adr.get('state', '')} - CEP: {adr.get('postcode', '')}'
        return Addr
    except Exception as e:
        print(f"Erro no reverse geocoding: {e}")
        return None