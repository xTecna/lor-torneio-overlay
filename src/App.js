import React, {useState} from 'react';
import {ThemeProvider} from 'styled-components';
import {DeckEncoder} from 'runeterra';

import Overlay from './components/Overlay';
import {Deck, Regions, Region, Champions, QtdChampion, Champion} from './style'; 
import {Form, Section, SectionTitle, SectionContent, Subsection, SubsectionTitle, SubsectionContent, MensagemErro} from './components/Form/style';
import factions from './factions.json';
import champions from './champions.json';

const theme = {
	webcamSize: 20
};

const App = () => {
	const [ mostrarDadosTorneio, setExibeDadosTorneio ] = useState(true);
	const [ mostrarPartidaAtual, setExibePartidaAtual ] = useState(true);
	const [ mostrarParticipantes, setExibeParticipantes ] = useState(true);
	const [ nomeTorneio, setNomeTorneio ] = useState('Torneio Meme da Mah');
	const [ faseTorneio, setFaseTorneio ] = useState('Oitavas-de-final');
	const [ jogador1, setJogador1 ] = useState({
		'nome':	'Alice',
		'time': 'WNX',
		'decks': [
			{
				'regions':		['bilgewater', 'shadowisles'],
				'champions':	[{'nome': 'Nautilus', 'qtd': 3}, {'nome': 'Maokai', 'qtd': 3}]
			},
			{
				'regions':		['freljord', 'noxus'],
				'champions':	[{'nome': 'Ashe', 'qtd': 3}, {'nome': 'Sejuani', 'qtd': 3}]
			},
			{
				'regions':		['freljord', 'shadowisles'],
				'champions':	[{'nome': 'Hecarim', 'qtd': 1}, {'nome': 'Elise', 'qtd': 2}, {'nome': 'Kalista', 'qtd': 3}]
			}
		]
	});
	const [ jogador2, setJogador2 ] = useState({
		'nome': 'Mafraju',
		'time': 'WNX',
		'decks': [
			{
				'regions':		['freljord', 'noxus'],
				'champions':	[{'nome': 'Ashe', 'qtd': 3}, {'nome': 'Sejuani', 'qtd': 3}]
			},
			{
				'regions':		['demacia', 'ionia'],
				'champions':	[{'nome': 'Zed', 'qtd': 3}, {'nome': 'Fiora', 'qtd': 3}]
			},
			{
				'regions':		['noxus', 'piltoverzaun'],
				'champions':	[{'nome': 'Draven', 'qtd': 3}, {'nome': 'Jinx', 'qtd': 3}]
			}
		]
	});
	const [ jogadores, setJogadores ] = useState([]);
	const [ timeNovoJogador, setTimeNovoJogador ] = useState('');
	const [ nomeNovoJogador, setNomeNovoJogador ] = useState('');
	const [ codigoDeck1, setCodigoDeck1 ] = useState('');
	const [ codigoDeck2, setCodigoDeck2 ] = useState('');
	const [ codigoDeck3, setCodigoDeck3 ] = useState('');
	const [ mensagemErro, setMensagemErro ] = useState('');

	function mudaNomeTorneio(event){
		setNomeTorneio(event.target.value);
	}

	function mudaFaseTorneio(event){
		setFaseTorneio(event.target.value);
	}

	function toggleDadosTorneio(event){
		setExibeDadosTorneio((atual) => {
			return !atual;
		});
	}

	function togglePartidaAtual(event){
		setExibePartidaAtual((atual) => {
			return !atual;
		});
	}

	function toggleParticipantes(event){
		setExibeParticipantes((atual) => {
			return !atual;
		});
	}

	function removeJogador1(event){
		setJogador1({
			'nome':			'',
			'time':			'',
			'regions':		[],
			'champions':	[]
		});
	}

	function removeJogador2(event){
		setJogador2({
			'nome':			'',
			'time':			'',
			'regions':		[],
			'champions':	[]
		});
	}

	function mudaTimeNovoJogador(event){
		setTimeNovoJogador(event.target.value);
	}

	function mudaNomeNovoJogador(event){
		setNomeNovoJogador(event.target.value);
	}

	function mudaCodigoDeck1(event){
		setCodigoDeck1(event.target.value);
	}

	function mudaCodigoDeck2(event){
		setCodigoDeck2(event.target.value);
	}

	function mudaCodigoDeck3(event){
		setCodigoDeck3(event.target.value);
	}
	
	function pegaRegioes(cards){
		var regions = [];
		cards.map((card) => {
			var region = card.faction.shortCode;
			if (!regions.includes(factions[region])){
				regions.push(factions[region]);
			}
		});
		return regions;
	}

	function pegaCampeoes(cards){
		var campeoes = [];
		cards.map((card) => {
			if (champions[card.code] !== undefined){
				campeoes.push({'nome': champions[card.code], 'qtd': card.count});
			}
		});
		return campeoes;
	}

	function cadastrarNovoJogador(){
		if (timeNovoJogador && nomeNovoJogador && codigoDeck1 && codigoDeck2 && codigoDeck3){
			try{
				let decks = [];

				const codigosDeck = [
					codigoDeck1, codigoDeck2, codigoDeck3
				];

				console.log(codigosDeck);

				for(let i = 0; i < 1; ++i){
					let cards = DeckEncoder.decode(codigosDeck[i]);
					decks.push({
						'regions': pegaRegioes(cards),
						'champions': pegaCampeoes(cards)
					});
				}

				console.log(decks);

				setJogadores((atual) => {
					atual = [...atual, {
						'nome':		nomeNovoJogador,
						'time':		timeNovoJogador,
						'decks':	decks
					}];
				});

				setTimeNovoJogador('');
				setNomeNovoJogador('');
				setCodigoDeck1('');
				setCodigoDeck2('');
				setCodigoDeck3('');
				setMensagemErro('');
			}catch{
				setMensagemErro("Algum deck é inválido.");
			}
		}else{
			setMensagemErro("Algum dado está vazio.");
		}
	}

	function renderRegion(region){
		return <Region><img src={`http://dd.b.pvp.net/1_6_0/core/en_us/img/regions/icon-${region}.png`}/></Region>;
	};

	function renderChampion(champion){
		return <Champion><QtdChampion>{champion.qtd}</QtdChampion><img src={`http://ddragon.leagueoflegends.com/cdn/10.15.1/img/champion/${champion.nome}.png`}/></Champion>;
	};	

	function renderDeck(deck){
		return (
			<Deck>
				<Regions>
					{deck.regions.map(renderRegion)}
				</Regions>
				<Champions>
					{deck.champions.map(renderChampion)}
				</Champions>
			</Deck>
		);
	}

	function renderJogador(jogador){
		return (
			<tr>
				<td>{jogador.time}</td>
				<td>{jogador.nome}</td>
				<td>{renderDeck(jogador.decks[0])}</td>
				<td>{renderDeck(jogador.decks[1])}</td>
				<td>{renderDeck(jogador.decks[2])}</td>
			</tr>
		)
	};
	
	return (
		<div id="content">
			<ThemeProvider theme={theme}>
				<Overlay className="overlay" nomeTorneio={nomeTorneio} faseTorneio={faseTorneio} jogador1={jogador1} jogador2={jogador2}/>
				<Form>
					<Section>
						<SectionTitle>
							<h3>Dados do Torneio</h3>
							<button onClick={toggleDadosTorneio}>{ mostrarDadosTorneio ? '-' : '+'}</button>
						</SectionTitle>
						{ mostrarDadosTorneio ? 
							<SectionContent>
								<label for="nome_torneio">Nome:</label>
								<input type="text" id="nome_torneio" value={nomeTorneio} onChange={mudaNomeTorneio}></input>
								<label for="fase_torneio">Fase:</label>
								<input type="text" id="fase_torneio" value={faseTorneio} onChange={mudaFaseTorneio}></input>
							</SectionContent>
						  : null }
					</Section>
					<Section>
						<SectionTitle>
							<h3>Partida Atual</h3>
							<button onClick={togglePartidaAtual}>{ mostrarPartidaAtual ? '-' : '+'}</button>
						</SectionTitle>
						{ mostrarPartidaAtual ?
							<SectionContent className="by-row">
								<Subsection>
									<SubsectionTitle>
										<h5>Jogador 1</h5>
									</SubsectionTitle>
									<SubsectionContent>
										<p>Nome: {jogador1.nome}</p>
										<p>Time: {jogador1.time}</p>
										<table>
											<tr><th>Decks</th></tr>
											<tr><td>{renderDeck(jogador1.decks[0])}</td></tr>
											<tr><td>{renderDeck(jogador1.decks[1])}</td></tr>
											<tr><td>{renderDeck(jogador1.decks[2])}</td></tr>
										</table>
										<button onClick={removeJogador1}>Remover</button>
									</SubsectionContent>
								</Subsection>
								<Subsection>
									<SubsectionTitle>
										<h5>Jogador 2</h5>
									</SubsectionTitle>
									<SubsectionContent>
										<p>Nome: {jogador2.nome}</p>
										<p>Time: {jogador2.time}</p>
										<table>
											<tr><th>Decks</th></tr>
											<tr><td>{renderDeck(jogador2.decks[0])}</td></tr>
											<tr><td>{renderDeck(jogador2.decks[1])}</td></tr>
											<tr><td>{renderDeck(jogador2.decks[2])}</td></tr>
										</table>
										<button onClick={removeJogador2}>Remover</button>
									</SubsectionContent>
								</Subsection>
							</SectionContent>
						 : null }
					</Section>
					<Section>
						<SectionTitle>
							<h3>Participantes do Torneio</h3>
							<button onClick={toggleParticipantes}>{ mostrarParticipantes ? '-' : '+'}</button>
						</SectionTitle>
						{ mostrarParticipantes ?
							<SectionContent>
								<table>
									<tr>
										<th>Time</th>
										<th>Nome</th>
										<th>Deck 1</th>
										<th>Deck 2</th>
										<th>Deck 3</th>
									</tr>
									{ jogadores !== undefined ? jogadores.map(renderJogador) : null }
								</table>
								<h4>Novo Participante</h4>
								<label for="time_jogador">Time:</label>
								<input type="text" name="time_jogador" value={timeNovoJogador} onChange={mudaTimeNovoJogador}></input>
								<label for="nome_jogador">Nome:</label>
								<input type="text" name="nome_jogador" value={nomeNovoJogador} onChange={mudaNomeNovoJogador}></input>
								<label for="deck1">Deck 1:</label>
								<input type="text" name="deck1" value={codigoDeck1} onChange={mudaCodigoDeck1}></input>
								<label for="deck2">Deck 2:</label>
								<input type="text" name="deck2" value={codigoDeck2} onChange={mudaCodigoDeck2}></input>
								<label for="deck3">Deck 3:</label>
								<input type="text" name="deck3" value={codigoDeck3} onChange={mudaCodigoDeck3}></input>
								<MensagemErro>{mensagemErro}</MensagemErro>
								<button onClick={cadastrarNovoJogador}>Cadastrar novo jogador</button>
							</SectionContent>
						 : null }
					</Section>
				</Form>
			</ThemeProvider>
		</div>
	)
}

export default App;
