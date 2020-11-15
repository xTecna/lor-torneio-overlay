import React from 'react';

import Cronometro from './Cronometro';
import {Informe as InformeDiv, Nome, Fase} from './style';

const Informe = ({cronometro, nome, fase, tempo, tempoLimite}) => {
	return (
		<InformeDiv>
			<Nome>{nome}</Nome>
			<Fase>{fase}</Fase>
			<Cronometro cronometro={cronometro} tempo={tempo} tempoLimite={tempoLimite}/>
		</InformeDiv>
	);
}

export default Informe;
