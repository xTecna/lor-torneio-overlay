const db = require('../models');
const Overlay = db.Overlay;

// Criar e salvar os dados de um overlay
exports.create = (request, response) => {
	if (!request.body){
		response.status(400).send({
			message: 'Conteúdo não pode ser vazio!'
		});
		return;
	}

	const dados = request.body;
	const overlay = new Overlay({
		webcam: dados.webcam,
		cronometro: dados.cronometro,
		nomeTorneio: dados.nomeTorneio,
		faseTorneio: dados.faseTorneio,
		tempo: dados.tempo,
		tempoLimite: dados.tempoLimite,
		jogador1: dados.jogador1,
		jogador2: dados.jogador2,
		jogadores: dados.jogadores,
		times: dados.times,
		atuais1: dados.atuais1,
		bans1: dados.bans1,
		vitorias1: dados.vitorias1,
		atuais2: dados.atuais2,
		bans2: dados.bans2,
		vitorias2: dados.vitorias2
	});

	overlay.save(overlay)
		   .then(data => {
			   response.send(data);
		   })
		   .catch(err => {
			   response.status(500).send({
				   message: err.message || 'Algum erro ocorreu.'
			   });
		   })
};

// Encontrar os dados de um overlay especifico
exports.findOne = (request, response) => {
	const id = request.params.id;

	Overlay.findById(id)
		   .then(data => {
			   if (!data)
			   		response.status(404).send({
					   message: `Não foi encontrado os dados do overlay com o id ${id}`
					});
			   else response.send(data);
		   })
		   .catch(err => {
			   response.status(500).send({
				   message: `Erro buscando os dados do overlay com id ${id}: ${err}`
			   });
		   })
};

// Atualizar os dados de um overlay especifico
exports.update = (request, response) => {
	if (!request.body){
		return response.status(400).send({
			message: 'Dados a atualizar não podem ser vazios!'
		});
	}

	const id = request.params.id;

	Overlay.findByIdAndUpdate(id, request.body, { useFindAndModify: false })
		   .then(data => {
			   if (!data) {
				   response.status(404).send({
					   message: `Não é possível atualizar os dados do overlay com id ${id}. Talvez esse id não exista.`
				   });
			   } else response.send(data)
		   })
		   .catch(err => {
			   response.status(500).send({
				   message: `Erro atualizando os dados do overlay com id ${id}: ${err}`
			   })
		   })
}