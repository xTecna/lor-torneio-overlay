import React, {useState} from 'react';

import {useSaveState} from '../../../context/SaveState';

import {Section, SectionContent} from '../style';
import SectionTitle from '../SectionTitle';

const SectionPreferencias = () => {

	const [ mostrar, setMostrar ] = useState(true);

	const { saveState, setSaveState } = useSaveState();
	const { webcam, cronometro } = saveState;

	return (
		<Section>
			<SectionTitle mostrar={mostrar} toggleMostrar={setMostrar}>
				Preferências
			</SectionTitle>
			{mostrar &&
				<SectionContent className="form-inline">
					<input type="checkbox" id="webcam" checked={webcam}
						   onChange={() => setSaveState({...saveState, webcam: !webcam})}/>
					<label htmlFor="webcam">Exibir webcam dos jogadores?</label>
					<input type="checkbox" id="cronometro"
						   checked={cronometro}
						   onChange={() => setSaveState({...saveState, cronometro: !cronometro})}/>
					<label htmlFor="cronometro">Exibir cronômetro?</label>
				</SectionContent>
			}
		</Section>
	)
}

export default SectionPreferencias;