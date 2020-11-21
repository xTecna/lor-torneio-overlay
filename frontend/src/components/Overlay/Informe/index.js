import React from 'react';

import {useSaveState} from '../../../context/SaveState';

import Cronometro from './Cronometro';
import {Informe as InformeDiv, Nome, Fase} from './style';

const Informe = () => {
	const {saveState} = useSaveState();
	const {nomeTorneio: nome, faseTorneio: fase} = saveState;

	return (
		<InformeDiv>
			<Nome>{nome}</Nome>
			<Fase>{fase}</Fase>
			<Cronometro/>
		</InformeDiv>
	);
}

export default Informe;
