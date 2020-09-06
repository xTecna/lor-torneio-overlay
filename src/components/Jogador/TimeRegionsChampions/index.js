import React from 'react';

import {TimeRegionsChampions as TimeRegionsChampionsDiv, Time, RegionsChampions, Regions, Region, Champions, QtdChampion, Champion} from './style';

function renderRegion(region){
	return <Region><img src={`http://dd.b.pvp.net/latest/core/en_us/img/regions/icon-${region}.png`}/></Region>;
};

function renderChampion(champion){
	return <Champion><QtdChampion>{champion.qtd}</QtdChampion><img src={`http://ddragon.leagueoflegends.com/cdn/10.15.1/img/champion/${champion.nome}.png`}/></Champion>;
};

const TimeRegionsChampions = ({url_logo, regions, champions}) => {
	return (
		<TimeRegionsChampionsDiv>
			<Time>
				<img src={url_logo}/>
			</Time>
			<RegionsChampions>
				<Regions>
					{regions.map(renderRegion)}
				</Regions>
				<Champions>
					{champions.map(renderChampion)}
				</Champions>
			</RegionsChampions>
		</TimeRegionsChampionsDiv>
	);
};

export default TimeRegionsChampions;