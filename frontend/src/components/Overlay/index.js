import React from 'react';

import {useSaveState} from '../../context/SaveState';

import {Overlay as OverlayDiv} from './style';
import Jogador from './Jogador';
import Informe from './Informe';

const Overlay = () => {
	const { saveState } = useSaveState();
	const { jogador1, jogador2, atuais, bans, vitorias } = saveState;
	
	return (
		<OverlayDiv>
			<Jogador key={0} jogador={jogador1} atuais={atuais[0]} bans={bans[0]} vitorias={vitorias[0]}/>
			<Informe/>
			<Jogador key={1} jogador={jogador2} atuais={atuais[1]} bans={bans[1]} vitorias={vitorias[1]}/>
		</OverlayDiv>
	)
}

export default Overlay;
