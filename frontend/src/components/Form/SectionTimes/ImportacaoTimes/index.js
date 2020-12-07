import React from 'react';
import CSVReader from 'react-csv-reader';
import {GrDocumentCsv} from 'react-icons/gr';

import {useSaveState} from '../../../../context/SaveState';

import {Importar} from './style';

const ImportacaoTimes = ({funcaoErro}) => {

	const { saveState, setSaveState } = useSaveState();
	const { times } = saveState;

	function buscaTime(nome){
		return times.find((time) => time.nome === nome);
	}

	function validaNome(nome){
		return nome && !buscaTime(nome);
	}

	function validaTime(time){
		const [nome] = time;
		return validaNome(nome);
	}

	function converteTime(time){
		const [nome, url_logo] = time;
		return {
			nome: nome,
			url_logo: url_logo
		};
	}

	function importarTimes(data){
		const erros = [];
		let timesValidos = data.filter((line, index) => {
			if (validaTime(line))	return true;
			erros.push({mensagem: `Time ${index + 1} tem nome inválido.`});
			return false;
		});
		timesValidos = timesValidos.map((time) => converteTime(time));
		setSaveState({...saveState, times: timesValidos});
		funcaoErro(erros);
		document.querySelector('#csv-input-time').value = '';
	}

	return (
		<Importar>
			<label htmlFor="csv-input-time"><GrDocumentCsv/>Importar times:</label>
			<CSVReader id="csv-input-time" parserOptions={{ header: false }}
					onFileLoaded={(data) => importarTimes(data)}/>
		</Importar>
	);
}

export default ImportacaoTimes;