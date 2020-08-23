import React, {useState} from 'react';

import ScoreNomeWebcam from './ScoreNomeWebcam';
import TimeRegionsChampions from './TimeRegionsChampions';
import Deck from './Deck';
import {JogadorDecks, Jogador as JogadorDiv, Decks} from './style';

function renderDeck(deck_champions){
	return <Deck champions={deck_champions}/>
}

const Jogador = ({score, jogador, bans}) => {
	return (
		<>
			<JogadorDecks>
				<JogadorDiv>
					<ScoreNomeWebcam score={score} nome={jogador.nome}/>
					<TimeRegionsChampions regions={jogador.decks[1].regions} champions={jogador.decks[1].champions}/>
				</JogadorDiv>
				<Decks>
					<Deck status="ban" champions={jogador.decks[0].champions}/>
					<Deck status="victory" champions={jogador.decks[1].champions}/>
					<Deck champions={jogador.decks[2].champions}/>
				</Decks>
			</JogadorDecks>
		</>
	)
};

export default Jogador;
