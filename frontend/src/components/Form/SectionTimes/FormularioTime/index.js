import React, {useState, useEffect} from 'react';

import {useSaveState} from '../../../../context/SaveState';

import {Barra, Campo, Botoes, Botao} from './style';
import {MensagemErro} from '../../style';

const FormularioTime = ({titulo, mensagemClica, mostrar, setMostrar, timeAntigo}) => {

	const { saveState, setSaveState } = useSaveState();
	const { jogadores, times } = saveState;

	const [ time, setTime ] = useState({nome: '', url_logo: ''});
	const [ mensagemErro, setMensagemErro ] = useState();

	function buscaTime(nome){
		return times.find((time) => time.nome === nome);
	}

	useEffect(() => {
		function carregaTime(){
			if (mostrar){
				setTime(timeAntigo);
			}
		}
		carregaTime();
	}, [mostrar, timeAntigo]);

	function saveOrUpdateTime(time){
		if (time.nome){
			if (mostrar){
				const novoJogadores = jogadores.map((jogador) => {
					if (jogador.time.nome === timeAntigo.nome){
						return {...jogador, time: time};
					}else{
						return jogador;
					}
				});
				const novo = times.map((t) => {
					if (t.nome === timeAntigo.nome){
						return time;
					}else{
						return t;
					}
				});
				setSaveState({...saveState, jogadores: novoJogadores, times: novo});
			}else{
				if (buscaTime(time.nome)){
					setMensagemErro('Já existe um time com esse nome.');
					return;
				}

				setSaveState({...saveState, times: [...times, time]});
			}
			setTime({nome: '', url_logo: ''});
			setMensagemErro('');
			if (mostrar)	setMostrar(false);
		}else{
			setMensagemErro("Nome inválido.");
			return;
		}
	}
	
	return (
		<>
			<h3>{titulo}</h3>
			<Campo>
				<label htmlFor="nome_time">Nome:</label>
				<Barra type="text" name="nome_time" value={time.nome}
					   onChange={(e) => setTime({...time, nome: e.target.value})}></Barra>
			</Campo>
			<Campo>
				<label htmlFor="url_logo_time">URL da logo:</label>
				<Barra type="text" name="url_logo_time" value={time.url_logo}
					   onChange={(e) => setTime({...time, url_logo: e.target.value})}></Barra>
			</Campo>
			<MensagemErro>{mensagemErro}</MensagemErro>
			<Botoes>
				<Botao onClick={() => saveOrUpdateTime(time)}>{mensagemClica}</Botao>
				{mostrar && <Botao onClick={() => setMostrar(false)}>Cancelar edição</Botao>}
			</Botoes>
		</>
	);
};

export default FormularioTime;