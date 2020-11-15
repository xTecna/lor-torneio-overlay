import React from 'react';

import {Subsection, SubsectionTitle, SubsectionContent, Decks} from './style';
import DeckJogador from './DeckJogador';

const Jogador = ({jogador, jogadorIndex}) => {

	const { nome: nomeJogador, time, decks } = jogador;
	const { nome: nomeTime } = time;

	return (
		<Subsection>
			<SubsectionTitle>Jogador {jogadorIndex+1}</SubsectionTitle>
			<SubsectionContent>
				<p>Nome: {nomeJogador}</p>
				<p>Time: {nomeTime}</p>
				<Decks>
					{
						decks.map((deck, index) => {
							return (
								<DeckJogador key={`${jogadorIndex}${index}`} deck={deck}
											 index={index} jogadorIndex={jogadorIndex}/>
							)
						})
					}
				</Decks>
			</SubsectionContent>
		</Subsection>
	);
};

export default Jogador;