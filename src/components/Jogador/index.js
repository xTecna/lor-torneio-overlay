import React, {useState} from 'react';

import ScoreNomeWebcam from './ScoreNomeWebcam';
import TimeRegionsChampions from './TimeRegionsChampions';
import Deck from './Deck';
import {JogadorDecks, Jogador as JogadorDiv, Decks} from './style';

function calculaScore(vitorias){
	let score = 0;
	for (let deck of vitorias){
		if (deck)	score += 1;
	}
	return score;
}

function statusCheck(deck, bans, vitorias){
	if (bans[deck])		return "ban";
	if (vitorias[deck])	return "victory";
	return undefined;
}

function deckAtual(atuais){
	for (let i = 0; i < 3; ++i){
		if (atuais[i])	return i;
	}
}

const Jogador = ({webcam, jogador, atuais, bans, vitorias}) => {
	const atual = deckAtual(atuais);

	return (
		<>
			<JogadorDecks>
				<JogadorDiv>
					<ScoreNomeWebcam webcam={webcam} score={calculaScore(vitorias)} nome={jogador.nome}/>
					<TimeRegionsChampions url_logo={jogador.time.url_logo} regions={jogador.decks[atual].regions} champions={jogador.decks[atual].champions}/>
				</JogadorDiv>
				<Decks>
					<Deck status={statusCheck(0, bans, vitorias)} champions={jogador.decks[0].champions}/>
					<Deck status={statusCheck(1, bans, vitorias)} champions={jogador.decks[1].champions}/>
					<Deck status={statusCheck(2, bans, vitorias)} champions={jogador.decks[2].champions}/>
				</Decks>
			</JogadorDecks>
		</>
	)
};

export default Jogador;
