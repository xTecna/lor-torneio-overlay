import React from 'react';

import {RegionsChampions as RegionsChampionsDiv, Regions, Region, Champions, Champion} from './style';

function renderRegion(region){
	return <Region><img src={`http://dd.b.pvp.net/latest/core/en_us/img/regions/icon-${region}.png`}/></Region>;
};

function renderChampion(champion){
	return <Champion img={`http://ddragon.leagueoflegends.com/cdn/10.15.1/img/champion/${champion.nome}.png`}>{champion.qtd}</Champion>;
};

const RegionsChampions = ({inline, time, regions, champions}) => {
	return (
		<RegionsChampionsDiv inline={inline} time={time}>
			<Regions inline={inline}>
				{regions.map(renderRegion)}
			</Regions>
			<Champions inline={inline} time={time}>
				{champions.map(renderChampion)}
			</Champions>
		</RegionsChampionsDiv>
	);
};

export default RegionsChampions;