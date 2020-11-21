module.exports = mongoose => {
	const Time = mongoose.Schema({
		nome: String,
		url_logo: String
	});

	const Champion = mongoose.Schema({
		nome: String,
		qtd: Number
	})

	const Deck = mongoose.Schema({
		code: String,
		regions: [String],
		champions: [Champion]
	});

	const Jogador = mongoose.Schema({
		nome: String,
		time: Time,
		decks: [Deck]
	});

	const Overlay = mongoose.model(
		"overlay",
		mongoose.Schema(
			{
				webcam: Boolean,
				cronometro: Boolean,
				nomeTorneio: String,
				faseTorneio: String,
				tempo: Number,
				tempoLimiteTorneio: Number,
				jogador1: Jogador,
				jogador2: Jogador,
				jogadores: [Jogador],
				times: [Time],
				atuais1: [Boolean],
				bans1: [Boolean],
				vitorias1: [Boolean],
				atuais2: [Boolean],
				bans2: [Boolean],
				vitorias2: [Boolean]
			},
			{ timestamps: true }
		)
	);

	return Overlay;
};