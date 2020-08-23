import React, {useState} from 'react';

import {Overlay as OverlayDiv} from './style';
import Jogador from '../Jogador';
import Informe from '../Informe';

const Overlay = ({nomeTorneio, faseTorneio, jogador1, jogador2}) => {
	return (
		<OverlayDiv>
			<Jogador score="0" jogador={jogador1} bans={[true, false, false]}/>
			<Informe nome={nomeTorneio} fase={faseTorneio}/>
			<Jogador score="0" jogador={jogador2} bans={[false, false, true]}/>
		</OverlayDiv>
	)
}

export default Overlay;
