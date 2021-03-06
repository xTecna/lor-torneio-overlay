import React, {useState, useEffect} from 'react';
import Autocomplete from 'react-autocomplete';

import {useSaveState} from '../../../../context/SaveState';

import JanelaErro from '../../JanelaErro';
import {Campo, Botoes, Botao} from './style';

const FormularioPartida = ({titulo, mensagemClica, mostrar, setMostrar, partidaAntiga}) => {

	const { saveState, setSaveState } = useSaveState();
	const { rounds, partidas, jogadores } = saveState;

	const [ partida, setPartida ] = useState({round: 1, jogador1: '', jogador2: ''});
	const [ erros, setErros ] = useState([]);

	useEffect(() => {
		function carregaPartida(){
			if (mostrar){
				setPartida(partidaAntiga);
			}
		}
		carregaPartida();
	}, [mostrar, partidaAntiga]);

	function buscaJogador(nome){
		return jogadores.find((jogador) => jogador.nome === nome);
	}

	function atualizaPartidaAtual(novoJogador1, novoJogador2, jogador1, jogador2, index){
		if (index === 0)	return (jogador1.nome === partidaAntiga.jogador1 && jogador2.nome === partidaAntiga.jogador2) ? novoJogador1 : jogador1;
		else				return (jogador1.nome === partidaAntiga.jogador1 && jogador2.nome === partidaAntiga.jogador2) ? novoJogador2 : jogador2;
	}

	function checaPartida(partida, partidaObject){
		return (partida.round === partidaObject.round && partida.jogador1 === partidaObject.jogador1.nome &&
			partida.jogador2 === partidaObject.jogador2.nome);
	}

	function saveOrUpdatePartida(partida){
		const novoErros = [];

		const jogador1 = buscaJogador(partida.jogador1);
		const jogador2 = buscaJogador(partida.jogador2);

		if (partida.round > 0 && partida.round <= rounds && partida.jogador1 && partida.jogador2 &&
			partida.jogador1 !== partida.jogador2 && jogador1 && jogador2){
			const partida_object = {round: partida.round, jogador1: jogador1, jogador2: jogador2};
			if (mostrar){
				setSaveState({...saveState,
					jogador1: atualizaPartidaAtual(jogador1, jogador2, saveState.jogador1, saveState.jogador2, 0),
					jogador2: atualizaPartidaAtual(jogador1, jogador2, saveState.jogador1, saveState.jogador2, 1),
					partidas: saveState.partidas.map((p) => checaPartida(partidaAntiga, p) ? partida_object : p)
				});
			}else{
				setSaveState({...saveState, partidas: [...partidas, partida_object]
				});
			}

			setPartida({round: 1, jogador1: '', jogador2: ''});
			if (mostrar)	setMostrar(false);
		}else{
			novoErros.push({mensagem: 'Partida inválida.'});
		}

		setErros(novoErros);
	}
	
	return (
		<>
			<h3>{titulo}</h3>
			<Campo>
				<label htmlFor="round_partida">Round:</label>
				<input type="number" id="round_partida" min="1" step="1" max={rounds} value={partida.round}
							   onChange={e => setPartida({...partida, round: +(e.target.value)})}/>
			</Campo>
			<Campo>
				<label htmlFor="jogador1">Jogador 1:</label>
				<Autocomplete id="jogador1" items={jogadores}
					shouldItemRender={(item, value) => item.nome.toLowerCase().includes(value.toLowerCase())}
					getItemValue={(jogador) => jogador.nome}
					renderItem={(jogador, isHighlighted) =>
						<div style={{background: isHighlighted ? 'lightgray' : 'white'}}>{jogador.nome}</div>
					}
					value={partida.jogador1}
					onChange={(e) => setPartida({...partida, jogador1: e.target.value})}
					onSelect={(value) => setPartida({...partida, jogador1: value})}/>
			</Campo>
			<Campo>
			<label htmlFor="jogador2">Jogador 2:</label>
			<Autocomplete id="jogador2" items={jogadores}
				shouldItemRender={(item, value) => item.nome.toLowerCase().includes(value.toLowerCase())}
				getItemValue={(jogador) => jogador.nome}
				renderItem={(jogador, isHighlighted) =>
					<div style={{background: isHighlighted ? 'lightgray' : 'white'}}>{jogador.nome}</div>
				}
				value={partida.jogador2}
				onChange={(e) => setPartida({...partida, jogador2: e.target.value})}
				onSelect={(value) => setPartida({...partida, jogador2: value})}/>
			</Campo>
			{erros.length > 0 && <JanelaErro erros={erros} setErros={setErros}/>}
			<Botoes>
				<Botao onClick={() => saveOrUpdatePartida(partida)}>{mensagemClica}</Botao>
				{mostrar && <Botao onClick={() => setMostrar(false)}>Cancelar edição</Botao>}
			</Botoes>
		</>
	);
};

export default FormularioPartida;