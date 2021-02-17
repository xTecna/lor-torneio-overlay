import React from 'react';
import {DeckEncoder} from 'runeterra';
import CSVReader from 'react-csv-reader';
import {GrDocumentCsv} from 'react-icons/gr';

import {useSaveState} from '../../../../context/SaveState';

import {Importar} from './style';

import factions from '../../../../assets/factions.json';
import champions from '../../../../assets/champions.json';

const ImportacaoParticipantes = ({regraFuncao, funcaoErro}) => {

	const { saveState, setSaveState } = useSaveState();
	const { regra, times } = saveState;

	function validaNome(nome){
		return nome;
	}

	function buscaTime(nome){
		return times.find((time) => time.nome === nome);
	}

	function validaTime(nome){
		return !nome || buscaTime(nome);
	}

	function segueRegra(decks){
		return !regra || regraFuncao[regra](decks);
	}

	function validaDeck(codigo){
		if (!codigo) return false;

		try{
			DeckEncoder.decode(codigo);
			return true;
		}catch{
			return false;
		}
	}

	function validaDecks(decks){
		decks = decks.map((codigo) => converteDeck(codigo));
		return segueRegra(decks);
	}

	function validaJogador(jogador){
		const [nome, time, deck1, deck2, deck3] = jogador;
		return validaNome(nome) && validaTime(time) && validaDeck(deck1) && validaDeck(deck2) &&
			   validaDeck(deck3) && validaDecks([deck1, deck2, deck3]);
	}

	function pegaRegioes(cards){
		let regions = [];
		cards.forEach((card) => {
			const region = card.faction.shortCode;
			if (!regions.includes(factions[region])){
				regions.push(factions[region]);
			}
		});
		regions.sort();
		return regions;
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

	function converteNome(nome){
		return nome.split('#')[0];
	}

	function converteDeck(codigo){
		try{
			const cards = DeckEncoder.decode(codigo);
			return {code: codigo, cards: cards, regions: pegaRegioes(cards), champions: pegaCampeoes(cards)};
		}catch{
			return undefined;
		}
	}

	function converteJogador(jogador){
		const [nome, time, deck1, deck2, deck3] = jogador;
		const decks = [
			converteDeck(deck1),
			converteDeck(deck2),
			converteDeck(deck3)
		];
		return {
			nome: converteNome(nome),
			time: time ? buscaTime(time) : {nome: '', url_logo: ''},
			decks: decks.map((deck) => { return {
				code: deck.code,
				regions: deck.regions,
				champions: deck.champions
			}})
		};
	}

	function geraLinkDetalhes(deck1, deck2, deck3){
		return `https://xtecna.github.io/lor-deck-checker/index.html?` +
				`regra=${regra.toLowerCase()}&singleton=false` +
				`&deck1=${deck1}&deck2=${deck2}&deck3=${deck3}`;
	}

	function importarJogadores(data){
		const erros = [];
		let jogadoresValidos = data.filter((line, index) => {
			if (validaJogador(line))	return true;

			const [nome, time, deck1, deck2, deck3] = line;

			let detalhes = false;

			let erro = `Jogador ${index + 1} `;
			if (!validaNome(nome)){
				erro += 'tem nome inválido.';
			}else if (!validaTime(time)){
				erro += 'está num time que não existe.';
			}else if (!validaDeck(deck1)){
				erro += 'tem deck 1 inválido.';
			}else if (!validaDeck(deck2)){
				erro += 'tem deck 2 inválido.';
			}else if (!validaDeck(deck3)){
				erro += 'tem deck 3 inválido.';
			}else if (!validaDeck([deck1, deck2, deck3])){
				erro += 'tem decks que não seguem a regra estabelecida.';
				detalhes = true;
			}else{
				erro += 'não possui todas as informações em sua linha (faltando nome, time ou um dos decks).';
			}

			if (detalhes)	erros.push({mensagem: erro, detalhes: geraLinkDetalhes(deck1, deck2, deck3)});
			else			erros.push({mensagem: erro});
			
			return false;
		});
		jogadoresValidos = jogadoresValidos.map((jogador) => converteJogador(jogador));
		setSaveState({...saveState, jogadores: jogadoresValidos});
		funcaoErro(erros);
		document.getElementsByClassName('csv-input')[0].value = '';
	}

	return (
		<Importar>
			<label htmlFor="csv-input-jogador"><GrDocumentCsv/>Importar jogadores:</label>
			<CSVReader parserOptions={{ header: false }}
					   onFileLoaded={(data) => importarJogadores(data)}/>
		</Importar>
	);
}

export default ImportacaoParticipantes;