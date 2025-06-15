from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_score
import numpy as np


def getCustersNum(pontos):
    if len(pontos) <= 1:
        raise ValueError("São necessários pelo menos 2 pontos para clustering.")
    
    x = np.array(pontos)  # Converte para array numpy
    k_max = min(10, len(pontos) - 1)

    melhores_k = []
    for k in range(2, k_max + 1):  # Começa em 2, pois k=1 não tem Silhouette válido
        kmeans = KMeans(n_clusters=k).fit(x)
        score = silhouette_score(pontos, kmeans.labels_)
        print(f'{k}, {score}')
        melhores_k.append((k, score))

    if len(melhores_k) < 1:
        return 1
    # Retorna o k com maior score (garantindo que seja ≥ 2)
    melhor_k = max(melhores_k, key=lambda x: x[1])

    return melhor_k[0]