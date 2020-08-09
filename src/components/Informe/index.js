import React from 'react';

import {Informe as InformeDiv, Nome, Fase, Tempo} from './style';

const Informe = ({nome, fase}) => {
	return (
		<InformeDiv>
			<Nome>Torneio Meme da Mah</Nome>
			<Fase>Oitavas-de-final</Fase>
			<Tempo>00:00:00</Tempo>
		</InformeDiv>
	);
}

export default Informe;
