import React from 'react';

import {Deck as DeckDiv, Champions, Champion} from './style';

function renderChampion(champion){
	return <Champion img={`http://ddragon.leagueoflegends.com/cdn/10.15.1/img/champion/${champion.nome}.png`}>{champion.qtd}</Champion>;
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
