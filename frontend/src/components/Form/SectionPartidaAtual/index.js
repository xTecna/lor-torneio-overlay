import React, {useState} from 'react';

import {useSaveState} from '../../../context/SaveState';

import {Section, SectionContent} from '../style';
import SectionTitle from '../SectionTitle';
import ControleCronometro from './ControleCronometro';
import JogadoresAtuais from './JogadoresAtuais';

const SectionPartidaAtual = () => {

	const [ mostrar, setMostrar ] = useState(true);

	const { saveState } = useSaveState();
	const { cronometro } = saveState;

	return (
		<Section>
			<SectionTitle mostrar={mostrar} toggleMostrar={setMostrar}>
				Partida atual
			</SectionTitle>
			{mostrar &&
				<SectionContent className="by-row">
					{cronometro && <ControleCronometro/>}
					<JogadoresAtuais/>
				</SectionContent>
			}
		</Section>
	);
}

export default SectionPartidaAtual;