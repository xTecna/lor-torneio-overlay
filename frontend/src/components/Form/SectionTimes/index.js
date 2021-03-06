import React, { useState } from 'react';

import {useSaveState} from '../../../context/SaveState';

import SectionTitle from '../SectionTitle';
import {Section, SectionContent, PesquisarImportar} from '../style';
import BarraPesquisar from '../BarraPesquisar';
import ImportacaoTimes from './ImportacaoTimes';
import JanelaErro from '../JanelaErro';
import TabelaTimes from './TabelaTimes';
import FormularioTime from './FormularioTime';

const SectionTimes = () => {

	const { saveState } = useSaveState();
	const { times } = saveState;

	const [ mostrar, setMostrar ] = useState(true);
	const [ timeQuery, setTimeQuery ] = useState('');
	const [ mostrarEditar, setMostrarEditar ] = useState(false);
	const [ timeAntigo, setTimeAntigo ] = useState({nome: '', url_logo: ''});

	const [ errosImportacao, setErrosImportacao ] = useState([]);

	function buscaTime(nome){
		return times.find((time) => time.nome === nome);
	}

	function apresentaFormulario(nome){
		const time = buscaTime(nome);

		if (time){
			setTimeAntigo(time);
			setMostrarEditar(true);
		}
	}

	return (
		<Section>
			<SectionTitle mostrar={mostrar} toggleMostrar={setMostrar}>
				Times
			</SectionTitle>
			{mostrar &&
				<SectionContent>
					<PesquisarImportar>
						<BarraPesquisar name={'time'} query={timeQuery} funcaoMuda={setTimeQuery}/>
						<ImportacaoTimes funcaoErro={setErrosImportacao}/>
					</PesquisarImportar>
					{errosImportacao.length > 0 && <JanelaErro erros={errosImportacao}
															   setErros={setErrosImportacao}/>}
					<TabelaTimes timeQuery={timeQuery} apresentaFormulario={apresentaFormulario}/>
					{mostrarEditar &&
						<FormularioTime titulo={`Editar Time ${timeAntigo.nome}`}
							mensagemClica='Editar time' mostrar={mostrarEditar} setMostrar={setMostrarEditar}
							timeAntigo={timeAntigo}/>
					}
					<FormularioTime titulo='Novo Time' mensagemClica='Cadastrar novo time' mostrar={undefined}
							setMostrar={undefined} timeAntigo={undefined}/>
				</SectionContent>
			}
		</Section>
	);
};

export default SectionTimes;