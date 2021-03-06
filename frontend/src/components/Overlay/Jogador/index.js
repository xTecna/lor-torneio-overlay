import React from 'react';

import {useSaveState} from '../../../context/SaveState';

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
	return atuais.findIndex((atual) => atual);
}

const Jogador = ({jogador, atuais, bans, vitorias}) => {

	const {saveState} = useSaveState();
	const {webcam} = saveState;

	const atual = deckAtual(atuais);

	return (
		<JogadorDecks className="jogador-decks">
			<JogadorDiv className="jogador">
				{
					webcam ?
						<>
							<Coluna className="coluna" time={jogador.time.url_logo}>
								<ScoreNome inline={false} time={jogador.time.url_logo} score={calculaScore(vitorias)} nome={jogador.nome}/>
								<Webcam className="webcam"/>
							</Coluna>
							<Coluna className="coluna" time={jogador.time.url_logo}>
								{ jogador.time.url_logo && <Time className="time"><img src={jogador.time.url_logo} alt={jogador.time.nome}/></Time> }
								<RegionsChampions inline={false} time={jogador.time.url_logo} regions={jogador.decks[atual].regions} champions={jogador.decks[atual].champions}/>
							</Coluna>
						</>
					:
						<>
							<Coluna className="coluna" time={jogador.time.url_logo}>
								<ScoreNome inline={true} className="score-nome" time={jogador.time.url_logo} score={calculaScore(vitorias)} nome={jogador.nome}/>
								<RegionsChampions className="regions-champions" inline={true} time={jogador.time.url_logo} regions={jogador.decks[atual].regions} champions={jogador.decks[atual].champions}/>
							</Coluna>
							{ jogador.time.url_logo &&
								<Coluna className="coluna" time={jogador.time.url_logo}>
									<Time className="time"><img src={jogador.time.url_logo} alt={jogador.time.nome}/></Time>
								</Coluna>
							}
						</>
				}
			</JogadorDiv>
			<Decks className="decks">
				{
					jogador.decks.map((deck, index) => {
						return <Deck key={index} status={statusCheck(index, bans, vitorias)} deck={deck}/>
					})
				}
			</Decks>
		</JogadorDecks>
	)
};

export default Jogador;
