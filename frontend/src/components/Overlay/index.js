import React from 'react';

import {Overlay as OverlayDiv} from './style';
import Jogador from './Jogador';
import Informe from './Informe';

const Overlay = ({state, tempo}) => {
	const {webcam, cronometro, nomeTorneio, faseTorneio, tempoLimiteTorneio, jogador1, jogador2, atuais, bans, vitorias} = state;
	
	return (
		<OverlayDiv>
			<Jogador key={0} webcam={webcam} jogador={jogador1} atuais={atuais[0]} bans={bans[0]} vitorias={vitorias[0]}/>
			<Informe cronometro={cronometro} nome={nomeTorneio} fase={faseTorneio} tempo={tempo} tempoLimite={tempoLimiteTorneio*60}/>
			<Jogador key={1} webcam={webcam} jogador={jogador2} atuais={atuais[1]} bans={bans[1]} vitorias={vitorias[1]}/>
		</OverlayDiv>
	)
}

export default Overlay;
