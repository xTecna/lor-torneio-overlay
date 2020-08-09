import React, {useState} from 'react';

import {Overlay as OverlayDiv} from './style';
import Jogador from '../Jogador';
import Informe from '../Informe';

const Overlay = () => {
	const [nomeJogador1, setNomeJogador1] = useState("Jogador 1");
	const [nomeJogador2, setNomeJogador2] = useState("Jogador 2");
	const [nomeTorneio, setNomeTorneio] = useState("Torneio");
	const [faseTorneio, setFaseTorneio] = useState("Oitavas-de-final");

	return (
		<OverlayDiv>
			<Jogador nome="Sérket" bans={[true, false, false]}/>
			<Informe nome={nomeTorneio} fase={faseTorneio}/>
			<Jogador nome="seja_um_pouco_mais_feliz" bans={[false, false, true]}/>
		</OverlayDiv>
	)
}

export default Overlay;
