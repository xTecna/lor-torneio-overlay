import React, {useState, useEffect} from 'react';

import {useSaveState} from '../../../../context/SaveState';

import JanelaErro from '../../JanelaErro';
import {Barra, Campo, Botoes, Botao} from './style';

const FormularioTime = ({titulo, mensagemClica, mostrar, setMostrar, timeAntigo}) => {

	const { saveState, setSaveState } = useSaveState();
	const { times } = saveState;

	const [ time, setTime ] = useState({nome: '', url_logo: ''});
	const [ erros, setErros ] = useState([]);

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

	function atualizaTimeJogador(time, jogador){
		return (jogador.time.nome === timeAntigo.nome) ? {...jogador, time: time} : jogador;
	}

	function saveOrUpdateTime(time){
		const novoErros = [];

		if (time.nome){
			if (mostrar){
				setSaveState({...saveState,
					jogador1: atualizaTimeJogador(time, saveState.jogador1),
					jogador2: atualizaTimeJogador(time, saveState.jogador2),
					partidas: saveState.partidas.map((partida) => {
						return {...partida,
							jogador1: atualizaTimeJogador(time, partida.jogador1),
							jogador2: atualizaTimeJogador(time, partida.jogador2)
						};
					}),
					jogadores: saveState.jogadores.map((jogador) => atualizaTimeJogador(time, jogador)),
					times: saveState.times.map((t) => (t.nome === timeAntigo.nome) ? time : t)
				});
			}else{
				if (buscaTime(time.nome)){
					novoErros.push({mensagem: 'Já existe um time com esse nome.'});
					setErros(novoErros);
					return;
				}

				setSaveState({...saveState, times: [...times, time]});
			}
			setTime({nome: '', url_logo: ''});
			if (mostrar)	setMostrar(false);
		}else{
			novoErros.push({mensagem: 'Nome inválido.'});
		}

		setErros(novoErros);
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
			{erros.length > 0 && <JanelaErro erros={erros} setErros={setErros}/>}
			<Botoes>
				<Botao onClick={() => saveOrUpdateTime(time)}>{mensagemClica}</Botao>
				{mostrar && <Botao onClick={() => setMostrar(false)}>Cancelar edição</Botao>}
			</Botoes>
		</>
	);
};

export default FormularioTime;