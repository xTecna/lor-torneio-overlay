import React, {useState} from 'react';

import {useSaveState} from '../../../context/SaveState';

import {Section, SectionContent} from '../style';
import SectionTitle from '../SectionTitle';

const SectionDadosTorneio = () => {

	const regras = ['Cardlock', 'Regionlock', 'Riotlock'];

	const [ mostrar, setMostrar ] = useState(true);

	const { saveState, setSaveState } = useSaveState();
	const { nomeTorneio, faseTorneio, tempoLimiteTorneio, regra, rounds } = saveState;

	return (
		<Section>
			<SectionTitle mostrar={mostrar} toggleMostrar={setMostrar}>
				Dados do torneio
			</SectionTitle>
			{mostrar &&
				<SectionContent>
					<div>
						<label htmlFor="nome_torneio">Nome:</label>
						<input type="text" id="nome_torneio" value={nomeTorneio}
							   onChange={e => setSaveState({...saveState, nomeTorneio: e.target.value})}></input>
					</div>
					<div>
						<label htmlFor="fase_torneio">Fase:</label>
						<input type="text" id="fase_torneio" value={faseTorneio}
							   onChange={e => setSaveState({...saveState, faseTorneio: e.target.value})}></input>
					</div>
					<div>
						<label htmlFor="tempo_limite_torneio">Tempo limite de cada partida: (em minutos)</label>
						<input type="number" id="tempo_limite_torneio" min="20" max="240" step="20"
							   value={tempoLimiteTorneio}
							   onChange={e => setSaveState({...saveState, tempoLimiteTorneio: e.target.value})}></input>
					</div>
					<div>
						<label htmlFor="regra_torneio">Regra:</label>
						<select id="regra_torneio" value={regra} onChange={e => setSaveState({...saveState, regra: e.target.value})}>
							<option value='' key={0}>-</option>
							{regras.map((regra, index) => <option value={regra} key={index + 1}>{regra}</option>)}
						</select>
					</div>
					<div>
						<label htmlFor="rounds_torneio">Rounds:</label>
						<input type="number" id="rounds_torneio" min="1" step="1" value={rounds}
							   onChange={e => setSaveState({...saveState, rounds: e.target.value})}/>
					</div>
				</SectionContent>
			}
		</Section>
	);
};

export default SectionDadosTorneio;