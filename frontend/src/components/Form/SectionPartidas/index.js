import React, { useState } from 'react';

import {useSaveState} from '../../../context/SaveState';

import SectionTitle from '../SectionTitle';
import {Pesquisas} from './style';
import {Section, SectionContent} from '../style';
import BarraPesquisar from '../BarraPesquisar';
import TabelaPartidas from './TabelaPartidas';
import FormularioPartida from './FormularioPartida';

const SectionPartidas = () => {

	const { saveState } = useSaveState();
	const { partidas } = saveState;

	const [ mostrar, setMostrar ] = useState(true);
	const [ partidaQuery, setPartidaQuery ] = useState('');
	const [ mostrarEditar, setMostrarEditar ] = useState(false);
	const [ partidaAntiga, setPartidaAntiga ] = useState({round: 1, jogador1: '', jogador2: ''});

	function apresentaFormulario(index){
		const partida = partidas[index];

		if (partida){
			setPartidaAntiga({...partida, jogador1: partida.jogador1.nome, jogador2: partida.jogador2.nome});
			setMostrarEditar(true);
		}
	}

	return (
		<Section>
			<SectionTitle mostrar={mostrar} toggleMostrar={setMostrar}>
				Partidas
			</SectionTitle>
			{mostrar &&
				<SectionContent>
					<Pesquisas>
						<BarraPesquisar name={'partida'} query={partidaQuery} funcaoMuda={setPartidaQuery}/>
					</Pesquisas>
					<TabelaPartidas partidaQuery={partidaQuery} apresentaFormulario={apresentaFormulario}/>
					{mostrarEditar &&
						<FormularioPartida titulo={`Editar Partida`}
							mensagemClica='Editar partida' mostrar={mostrarEditar} setMostrar={setMostrarEditar}
							partidaAntiga={partidaAntiga}/>
					}
					<FormularioPartida titulo='Nova Partida'
							mensagemClica='Cadastrar nova partida' mostrar={undefined} setMostrar={undefined}
							partidaAntiga={undefined}/>
				</SectionContent>
			}
		</Section>
	);
};

export default SectionPartidas;