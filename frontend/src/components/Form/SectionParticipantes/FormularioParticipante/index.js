import React, {useState, useEffect} from 'react';
import {DeckEncoder} from 'runeterra';

import {useSaveState} from '../../../../context/SaveState';

import JanelaErro from '../../JanelaErro';
import {Barra, Campo, Botoes, Botao} from './style';

import factions from '../../../../assets/factions.json';
import champions from '../../../../assets/champions.json';

function renderTime(time, index){
	return <option key={index} value={time.nome}>{time.nome}</option>;
}

const FormularioParticipante = ({titulo, mensagemClica, regraFuncao, mostrar, setMostrar, jogadorAntigo}) => {

	const { saveState, setSaveState } = useSaveState();
	const { regra, jogadores, times } = saveState;

	const [ jogador, setJogador ] = useState({nome: '',
		time: {nome: '', url_logo: ''},
		decks: [{code: '', regions: [], champions: []},
				{code: '', regions: [], champions: []},
				{code: '', regions: [], champions: []}]});
	const [ erros, setErros ] = useState([]);

	useEffect(() => {
		function carregaJogador(){
			if (mostrar){
				setJogador(jogadorAntigo);
			}
		}
		carregaJogador();
	}, [mostrar, jogadorAntigo]);

	function buscaTime(nome){
		return times.find((time) => time.nome === nome);
	}

	function buscaJogador(nome){
		return jogadores.find((jogador) => jogador.nome === nome);
	}

	function mudaTime(nome){
		const time = buscaTime(nome);
		if (time)	setJogador({...jogador, time});
		else		setJogador({...jogador, time: {nome: '', url_logo: ''}});
	}

	function mudaCodigoDeck(deck, index){
		const novo = [...jogador.decks];
		novo[index].code = deck;
		setJogador({...jogador, decks: novo});
	}

	function pegaRegioes(cards){
    let cardsPerRegion = {};
		cards.forEach((card) => {
			const region = card.faction.shortCode;
      if (!cardsPerRegion.hasOwnProperty(region)){
        cardsPerRegion[region] = 0
      }
      cardsPerRegion[region] = cardsPerRegion[region] += 1
		});

    let allRegions = Object.keys(cardsPerRegion).map((region) => [region, cardsPerRegion[region]]);
		let deckRegions = allRegions
      .sort((a,b) => (b[1] - a[1]))
      .slice(0,2)
      .map((region) => factions[region[0]]);
 
    console.log(factions)

		return deckRegions;
	}

	function pegaCampeoes(cards){
		let campeoes = [];
		cards.forEach((card) => {
			if (champions[card.code] !== undefined){
				campeoes.push({
					nome: champions[card.code],
					qtd: card.count
				});
			}
		});
		campeoes.sort();
		return campeoes;
	}
	
	function decodeDecks(decks){
		return decks.map(({code}) => {
			if (code === ''){
				return undefined;
			}

			let cards = [];

			try{
				cards = DeckEncoder.decode(code);
			}catch (e){
        console.log(e)
				return undefined;
			}

			return {code: code, cards: cards, regions: pegaRegioes(cards), champions: pegaCampeoes(cards)};
		});
	}

	function decksValidos(decks){
		return decks.filter((deck) => deck === undefined).length === 0;
	}

	function segueRegra(decks){
		return !regra || regraFuncao[regra](decks);
	}

	function geraLinkDetalhes(){
		let url = `https://xtecna.github.io/lor-deck-checker/index.html?` +
				  `regra=${regra.toLowerCase()}&` +
				  `singleton=false`;
		jogador.decks.forEach((deck, index) => url += `&deck${index + 1}=${deck.code}`);
		return url;
	}

	function atualizaNovoJogador(novo_jogador, jogador){
		return (jogador.nome === jogadorAntigo.nome) ? novo_jogador : jogador;
	}

	function saveOrUpdateJogador(jogador){
		const novoErros = [];

		if (jogador.nome && (jogador.time.nome === '' || buscaTime(jogador.time.nome))){
			if (!mostrar && buscaJogador(jogador.nome)){
				novoErros.push({mensagem: 'Já existe um jogador com esse nome.'});
			}

			const novosDecks = decodeDecks(jogador.decks);

			if (!decksValidos(novosDecks)){
				novoErros.push({mensagem: 'Algum código de deck passado é inválido.'});
				setErros(novoErros);
				return;
			}

			if (!segueRegra(novosDecks)){
				novoErros.push({
					mensagem: 'Os decks passados não seguem as regras estabelecidas.',
					detalhes: geraLinkDetalhes()
				});
			}

			if (novoErros.length > 0){
				setErros(novoErros);
				return;
			}

			novosDecks.forEach((deck, index) => {
				const novo = [...jogador.decks];
				novo[index].code = deck.code;
				novo[index].regions = deck.regions;
				novo[index].champions = deck.champions;
				setJogador({...jogador, decks: novo});
			});
			
			if (mostrar){
				setSaveState({...saveState,
					jogador1: atualizaNovoJogador(jogador, saveState.jogador1),
					jogador2: atualizaNovoJogador(jogador, saveState.jogador2),
					partidas: saveState.partidas.map((partida) => {
						return {...partida,
							jogador1: atualizaNovoJogador(jogador, partida.jogador1),
							jogador2: atualizaNovoJogador(jogador, partida.jogador2)
						};
					}),
					jogadores: saveState.jogadores.map((j) => atualizaNovoJogador(jogador, j))
				});
			}else{
				setSaveState({...saveState, jogadores: [...jogadores, jogador]});
			}

			setJogador({nome: '',
				time: {nome: '', url_logo: ''},
				decks: [{code: '', regions: [], champions: []},
						{code: '', regions: [], champions: []},
						{code: '', regions: [], champions: []}]});
			if (mostrar)	setMostrar(false);
		}else{
			novoErros.push({mensagem: 'Nome ou time inválido.'});
		}
		
		setErros(novoErros);
	}
	
	return (
		<>
			<h3>{titulo}</h3>
			<Campo>
				<label htmlFor="time_jogador">Time:</label>
				<select name="time_jogador" value={jogador.time.nome}
						onChange={(e) => mudaTime(e.target.value)}>
					<option value="">-</option>
					{times.map(renderTime)}
				</select>
			</Campo>
			<Campo>
				<label htmlFor="nome_jogador">Nome:</label>
				<Barra type="text" name="nome_jogador" value={jogador.nome}
					   onChange={(e) => setJogador({...jogador, nome: e.target.value})}></Barra>
			</Campo>
			{jogador.decks.map(({code}, index) => {
				return <Campo key={index}>
					<label htmlFor={`deck${index+1}`}>Deck {index+1}:</label>
					<Barra type="text" name={`deck${index+1}`} value={code}
						   onChange={(e) => mudaCodigoDeck(e.target.value, index)}></Barra>
				</Campo>
			})}
			{erros.length > 0 && <JanelaErro erros={erros} setErros={setErros}/>}
			<Botoes>
				<Botao onClick={() => saveOrUpdateJogador(jogador)}>{mensagemClica}</Botao>
				{mostrar && <Botao onClick={() => setMostrar(false)}>Cancelar edição</Botao>}
			</Botoes>
		</>
	);
};

export default FormularioParticipante;
