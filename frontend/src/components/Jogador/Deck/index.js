import React from 'react';

import {Deck as DeckDiv, Champions, Champion, QtdChampion} from './style';

function renderChampion(champion){
	return <Champion><QtdChampion>{champion.qtd}</QtdChampion><img src={`http://ddragon.leagueoflegends.com/cdn/10.15.1/img/champion/${champion.nome}.png`}/></Champion>;
};

const Deck = ({status, champions}) => {
	return (
		<DeckDiv>
			{status != undefined ?
				<Champions className={status} inline={false}>
					{champions.map(renderChampion)}
				</Champions>
				:
				<Champions inline={false}>
					{champions.map(renderChampion)}
				</Champions>
			}
		</DeckDiv>
	)
};

export default Deck;
