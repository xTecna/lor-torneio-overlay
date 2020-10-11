import React, {useState} from 'react';

import ScoreNome from './ScoreNome';
import RegionsChampions from './RegionsChampions';
import Deck from './Deck';
import {JogadorDecks, Jogador as JogadorDiv, Coluna, Decks, Webcam, Time} from './style';

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

const Jogador = ({toggleForm, webcam, jogador, atuais, bans, vitorias}) => {
	const atual = deckAtual(atuais);

	return (
		<JogadorDecks>
			<JogadorDiv>
				{
					webcam ?
						<>
							<Coluna>
								<ScoreNome className="score-nome" toggleForm={toggleForm} time={jogador.time.url_logo} score={calculaScore(vitorias)} nome={jogador.nome}/>
								<Webcam className="webcam"/>
							</Coluna>
							<Coluna>
								{ jogador.time.url_logo && <Time className="time"><img src={jogador.time.url_logo}/></Time> }
								<RegionsChampions className="regions-champions" inline={false} time={jogador.time.url_logo} regions={jogador.decks[atual].regions} champions={jogador.decks[atual].champions}/>
							</Coluna>
						</>
					:
						<>
							<Coluna>
								<ScoreNome className="score-nome" toggleForm={toggleForm} time={jogador.time.url_logo} score={calculaScore(vitorias)} nome={jogador.nome}/>
								<RegionsChampions className="regions-champions" inline={true} time={jogador.time.url_logo} regions={jogador.decks[atual].regions} champions={jogador.decks[atual].champions}/>
							</Coluna>
							{ jogador.time.url_logo &&
								<Coluna>
									<Time className="time"><img src={jogador.time.url_logo}/></Time>
								</Coluna>
							}
						</>
				}
			</JogadorDiv>
			<Decks>
				<Deck status={statusCheck(0, bans, vitorias)} champions={jogador.decks[0].champions}/>
				<Deck status={statusCheck(1, bans, vitorias)} champions={jogador.decks[1].champions}/>
				<Deck status={statusCheck(2, bans, vitorias)} champions={jogador.decks[2].champions}/>
			</Decks>
		</JogadorDecks>
	)
};

export default Jogador;
