import React from 'react';

import {useSaveState} from '../../../context/SaveState';

import Cronometro from './Cronometro';
import {Informe as InformeDiv, Nome, Fase} from './style';

const Informe = () => {
	const {saveState} = useSaveState();
	const {nomeTorneio: nome, faseTorneio: fase} = saveState;

	return (
		<InformeDiv className="informe">
			<Nome className="nome">{nome}</Nome>
			<Fase className="fase">{fase}</Fase>
			<Cronometro/>
		</InformeDiv>
	);
}

export default Informe;
