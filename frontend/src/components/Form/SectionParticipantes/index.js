import React, { useState } from 'react';
import {DeckEncoder} from 'runeterra';
import CSVReader from 'react-csv-reader';
import {GrDocumentCsv} from 'react-icons/gr';

import {useSaveState} from '../../../context/SaveState';

import SectionTitle from '../SectionTitle';
import {PesquisarImportar, Importar} from './style';
import {Section, SectionContent, MensagemErro} from '../style';
import BarraPesquisar from '../BarraPesquisar';
import TabelaParticipantes from './TabelaParticipantes';
import FormularioParticipante from './FormularioParticipante';

import factions from '../../../assets/factions.json';
import champions from '../../../assets/champions.json';

const SectionParticipantes = () => {

	const [ mensagemErro, setMensagemErro ] = useState();

	const regraFuncao = {
		'Cardlock': checkCardlock,
		'Regionlock': checkRegionlock,
		'Riotlock': checkRiotlock
	};

	const { saveState, setSaveState } = useSaveState();
	const { regra, jogadores, times } = saveState;

	const [ mostrar, setMostrar ] = useState(true);
	const [ jogadorQuery, setJogadorQuery ] = useState('');
	const [ mostrarEditar, setMostrarEditar ] = useState(false);
	const [ jogadorAntigo, setJogadorAntigo ] = useState({nome: '',
		time: {nome: '', url_logo: ''},
		decks: [{code: '', regions: [], champions: []},
				{code: '', regions: [], champions: []},
				{code: '', regions: [], champions: []}]});

	function apresentaFormulario(nome){
		const jogador = buscaJogador(nome);

		if (jogador){
			setJogadorAntigo(jogador);
			setMostrarEditar(true);
		}
	}

	function buscaJogador(nome){
		return jogadores.find((jogador) => jogador.nome === nome);
	}

	function validaNome(nome){
		return nome;
	}

	function buscaTime(nome){
		return times.find((time) => time.nome === nome);
	}

	function validaTime(nome){
		return !nome || buscaTime(nome);
	}

	function checkCardlock(decks){
		const allCardCodes = decks.flatMap((deck) => deck.cards.map((card) => card.code));
		const cards = [...new Set(allCardCodes)];

		return allCardCodes.length === cards.length;
	}
	
	function checkRegionlock(decks){
		const allRegions = decks.flatMap((deck) => deck.regions);
		const regions = [...new Set(allRegions)];
	
		return allRegions.length === regions.length;
	}
	
	function checkRiotlock(decks){
		const allChampions = decks.flatMap((deck) => deck.champions);
		const champions = [...new Set(allChampions)];

		const allRegions = decks.map((deck) => deck.regions.join(''));
		const regions = [...new Set(allRegions)];

		return (allChampions.length === champions) && (allRegions.length === regions);
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
		const {nome, time, deck1, deck2, deck3} = jogador;
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

	function converteDeck(codigo){
		try{
			const cards = DeckEncoder.decode(codigo);
			return {code: codigo, cards: cards, regions: pegaRegioes(cards), champions: pegaCampeoes(cards)};
		}catch{
			return undefined;
		}
	}

	function converteJogador(jogador){
		const decks = [
			converteDeck(jogador.deck1),
			converteDeck(jogador.deck2),
			converteDeck(jogador.deck3)
		];
		return {
			nome: jogador.nome,
			time: jogador.time ? buscaTime(jogador.time) : {nome: '', url_logo: ''},
			decks: decks.map((deck) => { return {
				code: deck.code,
				regions: deck.regions,
				champions: deck.champions
			}})
		};
	}

	function importarJogadores(data){
		let jogadoresValidos = data.map((jogador) => { return {
			nome: jogador['Nome'],
			time: jogador['Time'],
			deck1: jogador['Deck 1'],
			deck2: jogador['Deck 2'],
			deck3: jogador['Deck 3']
		}});
		const numeroJogadores = jogadoresValidos.length;
		jogadoresValidos = jogadoresValidos.filter((jogador) => validaJogador(jogador));
		jogadoresValidos = jogadoresValidos.map((jogador) => converteJogador(jogador));
		const numeroValidos = jogadoresValidos.length;
		setSaveState({...saveState, jogadores: jogadoresValidos});
		if (numeroValidos < numeroJogadores){
			setMensagemErro(`Ocorreu um erro em ${numeroJogadores - numeroValidos} registros.`);
		}else{
			setMensagemErro('');
		}
	}

	return (
		<Section>
			<SectionTitle mostrar={mostrar} toggleMostrar={setMostrar}>
				Participantes
			</SectionTitle>
			{mostrar &&
				<SectionContent>
					<PesquisarImportar>
						<BarraPesquisar name={'jogador'} query={jogadorQuery} funcaoMuda={setJogadorQuery}/>
						<Importar>
							<label htmlFor="import"><GrDocumentCsv/>Importar jogadores:</label>
							<CSVReader id="import" parserOptions={{ header: true }}
									   onFileLoaded={(data) => importarJogadores(data)}/>
						</Importar>
					</PesquisarImportar>
					<MensagemErro>{mensagemErro}</MensagemErro>
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