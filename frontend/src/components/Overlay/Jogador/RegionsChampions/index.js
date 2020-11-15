import React from 'react';

import {RegionsChampions as RegionsChampionsDiv, Regions, Region, Champions, Champion} from './style';

function renderRegion(region, index){
	return <Region key={index}><img src={`http://dd.b.pvp.net/latest/core/en_us/img/regions/icon-${region}.png`} alt={region}/></Region>;
};

function renderChampion(champion, index, number_champions){
	return <Champion key={index} lotado={number_champions > 4} img={`http://ddragon.leagueoflegends.com/cdn/10.15.1/img/champion/${champion.nome}.png`} alt={champion.nome}>{champion.qtd}</Champion>;
};

const RegionsChampions = ({inline, time, regions, champions}) => {
	const number_champions = champions.length;

	return (
		<RegionsChampionsDiv inline={inline} time={time}>
			<Regions inline={inline} time={time}>
				{regions.map(renderRegion)}
			</Regions>
			<Champions inline={inline} time={time}>
				{champions.map((item, index) => renderChampion(item, index, number_champions))}
			</Champions>
		</RegionsChampionsDiv>
	);
};

export default RegionsChampions;