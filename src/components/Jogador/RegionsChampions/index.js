import React from 'react';

import {RegionsChampions as RegionsChampionsDiv, Regions, Region, Champions, QtdChampion, Champion} from './style';

function renderRegion(region){
	return <Region><img src={`http://dd.b.pvp.net/latest/core/en_us/img/regions/icon-${region}.png`}/></Region>;
};

function renderChampion(champion){
	return <Champion><QtdChampion>{champion.qtd}</QtdChampion><img src={`http://ddragon.leagueoflegends.com/cdn/10.15.1/img/champion/${champion.nome}.png`}/></Champion>;
};

const RegionsChampions = ({inline, regions, champions}) => {
	return (
		<RegionsChampionsDiv inline={inline}>
			<Regions inline={inline}>
				{regions.map(renderRegion)}
			</Regions>
			<Champions inline={inline}>
				{champions.map(renderChampion)}
			</Champions>
		</RegionsChampionsDiv>
	);
};

export default RegionsChampions;