import React, {useState} from 'react';

import ScoreNomeWebcam from './ScoreNomeWebcam';
import TimeRegionsChampions from './TimeRegionsChampions';
import Deck from './Deck';
import {JogadorDecks, Jogador as JogadorDiv, Decks} from './style';

function renderDeck(deck_champions){
	return <Deck champions={deck_champions}/>
}

const Jogador = ({score, nome, url_imagem, url_logo, regions, champions, decks}) => {
	return (
		<>
			<JogadorDecks>
				<JogadorDiv>
					<ScoreNomeWebcam score={score} nome={nome} url_imagem={url_imagem}/>
					<TimeRegionsChampions url_logo={url_logo} regions={['noxus', 'ionia']} champions={['Ashe', 'Lux', 'Braum', 'Karma', 'Lulu', 'Zoe']}/>
				</JogadorDiv>
				<Decks>
					<Deck status="ban" champions={[{qtd: '3', nome: 'Ashe'}, {'qtd': 3, 'nome': 'Sejuani'}]}/>
					<Deck status="victory" champions={[{qtd: '3', nome: 'Zoe'}, {'qtd': 3, 'nome': 'Lulu'}]}/>
					<Deck champions={[{qtd: '3', nome: 'Kalista'}, {'qtd': 2, 'nome': 'Elise'}, {'qtd': 1, 'nome': 'Hecarim'}]}/>
				</Decks>
			</JogadorDecks>
		</>
	)
};

export default Jogador;
