import json

lista = dict()
with open('sets.js', 'r', encoding='utf-8') as arquivo:
	campeoes = json.load(arquivo)
	for campeao in campeoes:
		print(campeao)
		if campeao['type'] == 'Campeão' and not campeao['name'].endswith('(nível 2)'):
			lista[campeao['cardCode']] = campeao['name']
with open('champions.json', 'w', encoding='utf-8') as arquivo:
	json.dump(lista, arquivo, ensure_ascii=False)