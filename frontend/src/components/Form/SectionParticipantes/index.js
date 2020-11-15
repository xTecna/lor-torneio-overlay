import React, { useState } from 'react';

import {useSaveState} from '../../../context/SaveState';

import SectionTitle from '../SectionTitle';
import {Section, SectionContent} from '../style';
import BarraPesquisar from '../BarraPesquisar';
import TabelaParticipantes from './TabelaParticipantes';
import FormularioParticipante from './FormularioParticipante';

const SectionParticipantes = () => {

	const { saveState } = useSaveState();
	const { jogadores } = saveState;

	const [ mostrar, setMostrar ] = useState(true);
	const [ jogadorQuery, setJogadorQuery ] = useState('');
	const [ mostrarEditar, setMostrarEditar ] = useState(false);
	const [ jogadorAntigo, setJogadorAntigo ] = useState({nome: '',
		time: {nome: '', url_logo: ''},
		decks: [{code: '', regions: [], champions: []},
				{code: '', regions: [], champions: []},
				{code: '', regions: [], champions: []}]});

	function buscaJogador(nome){
		return jogadores.filter((jogador) => jogador.nome === nome)[0];
	}

	function apresentaFormulario(nome){
		const jogador = buscaJogador(nome);

		if (jogador){
			setJogadorAntigo(jogador);
			setMostrarEditar(true);
		}
	}

	return (
		<Section>
			<SectionTitle mostrar={mostrar} toggleMostrar={setMostrar}>
				Participantes
			</SectionTitle>
			{mostrar &&
				<SectionContent>
					<BarraPesquisar name={'jogador'} query={jogadorQuery} funcaoMuda={setJogadorQuery}/>
					<TabelaParticipantes jogadorQuery={jogadorQuery} apresentaFormulario={apresentaFormulario}/>
					{mostrarEditar &&
						<FormularioParticipante titulo={`Editar Participante ${jogadorAntigo.nome}`}
							mensagemClica='Editar jogador' mostrar={mostrarEditar} setMostrar={setMostrarEditar}
							jogadorAntigo={jogadorAntigo}/>
					}
					<FormularioParticipante titulo='Novo Participante'
							mensagemClica='Cadastrar novo jogador' mostrar={undefined} setMostrar={undefined}
							jogadorAntigo={undefined}/>
				</SectionContent>
			}
		</Section>
	);
};

export default SectionParticipantes;