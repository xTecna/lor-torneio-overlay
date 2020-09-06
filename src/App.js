import React, {useState, useMemo} from 'react';
import {ThemeProvider} from 'styled-components';
import {DeckEncoder} from 'runeterra';
import DataTable from 'react-data-table-component';
import { FaTrash } from 'react-icons/fa';

import Overlay from './components/Overlay';
import {Decks, Visualizacao, Deck, Regions, Region, Champions, QtdChampion, Champion} from './style'; 
import {Form, Section, SectionTitle, SectionContent, Subsection, SubsectionTitle, SubsectionContent, MensagemErro} from './components/Form/style';
import factions from './factions.json';
import champions from './champions.json';
import players from './players.json';

const theme = {
	webcamSize: 20
};

const semTime = { 'nome': '-', 'url_logo': '' };

const App = () => {
	const [ mostrarWebcam, setExibeWebcam ] = useState(false);
	const [ mostrarDadosTorneio, setExibeDadosTorneio ] = useState(true);
	const [ mostrarPartidaAtual, setExibePartidaAtual ] = useState(true);
	const [ mostrarParticipantes, setExibeParticipantes ] = useState(true);
	const [ mostrarTimes, setExibeTimes ] = useState(true);

	const [ nomeTorneio, setNomeTorneio ] = useState('Torneio Meme da Mah');
	const [ faseTorneio, setFaseTorneio ] = useState('Oitavas-de-final');
	const [ jogador1, setJogador1 ] = useState(players[0]);
	const [ jogador2, setJogador2 ] = useState(players[1]);
	const [ bans, setBans ] = useState([[false, false, false], [false, false, false]]);
	const [ vitorias, setVitorias ] = useState([[false, false, false], [false, false, false]]);
	const [ atuais, setAtuais ] = useState([[true, false, false], [true, false, false]]);
	const [ jogadores, setJogadores ] = useState([]);
	const [ timeNovoJogador, setTimeNovoJogador ] = useState(semTime);
	const [ nomeNovoJogador, setNomeNovoJogador ] = useState('');
	const [ codigoDeck1, setCodigoDeck1 ] = useState('');
	const [ codigoDeck2, setCodigoDeck2 ] = useState('');
	const [ codigoDeck3, setCodigoDeck3 ] = useState('');
	const [ mensagemErroJogador, setMensagemErroJogador ] = useState('');
	const [ times, setTimes ] = useState([semTime]);
	const [ nomeNovoTime, setNomeNovoTime ] = useState('');
	const [ urlLogoNovoTime, setUrlLogoNovoTime ] = useState('');
	const [ mensagemErroTime, setMensagemErroTime ] = useState('');

	function toggleWebcam(){
		setExibeWebcam((atual) => {
			return !atual;
		});
	}

	const [ jogadorQuery, setJogadorQuery ] = useState('');
	const jogadoresVisiveis = useMemo(() => jogadores.filter((value) => value.nome.toLowerCase().includes(jogadorQuery.toLowerCase())), [jogadores, jogadorQuery]);
	function deletarParticipante(nome){
		let novo = jogadores.filter((value) => value.nome !== nome);
		setJogadores(novo);
	}
	const colunasParticipantes = [
		{
			name: 'Excluir',
			selector: 'excluir',
			sortable: false,
			cell: (row) => <button className="botao-excluir" onClick={() => deletarParticipante(row.nome)}><FaTrash/></button>,
			center: true
		},
		{
			name: 'Time',
			selector: 'time',
			sortable: true,
			cell: row => <><img className='logo' src={row.time.url_logo}></img>{row.time.nome}</>,
			right: true
		},
		{
			name: 'Nome',
			selector: 'nome',
			sortable: true
		},
		{
			name: 'Deck 1',
			selector: 'deck1',
			sortable: false,
			cell: row => renderDeck(row.decks[0])
		},
		{
			name: 'Deck 2',
			selector: 'deck2',
			sortable: false,
			cell: row => renderDeck(row.decks[1])
		},
		{
			name: 'Deck 3',
			selector: 'deck3',
			sortable: false,
			cell: row => renderDeck(row.decks[2])
		}
	];

	function mudaJogadorQuery(event){
		setJogadorQuery(event.target.value);
	}

	const [ timeQuery, setTimeQuery ] = useState('');
	const timesVisiveis = useMemo(() => times.filter((value) => value.nome !== '-' && value.nome.toLowerCase().includes(timeQuery.toLowerCase())), [times, timeQuery]);
	function deletarTime(nome){
		let novo = times.filter(value => value.nome !== nome);
		setTimes(novo);
		novo = jogadores.map(value => {
			if (value.time.nome == nome){
				value.time = semTime;
			}
			return value;
		});
		setJogadores(novo);
	}
	const colunasTimes = [
		{
			name: 'Excluir',
			selector: 'excluir',
			sortable: false,
			cell: (row) => <button className="botao-excluir" onClick={() => deletarTime(row.nome)}><FaTrash/></button>,
			center: true
		},
		{
			name: 'Nome',
			selector: 'nome',
			sortable: true,
			right: true
		},
		{
			name: 'Logo',
			selector: 'url_logo',
			sortable: false,
			cell: row => <img className='logo' src={row.url_logo}></img>
		}
	];

	function mudaTimeQuery(event){
		setTimeQuery(event.target.value);
	}

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

	function toggleTimes(event){
		setExibeTimes((atual) => {
			return !atual;
		});
	}

	function toggleAtual(jogador, deck){
		if (!atuais[jogador][deck]){
			let novo = [...atuais];
			for(let i = 0; i < 3; ++i){
				novo[jogador][i] = false;
			}
			novo[jogador][deck] = true;
			setAtuais(novo);
		}
	}

	function toggleBan(jogador, deck){
		let novo = [...bans];
		novo[jogador][deck] = !novo[jogador][deck];
		setBans(novo);
	}

	function toggleVitoria(jogador, deck){
		let novo = [...vitorias];
		novo[jogador][deck] = !novo[jogador][deck];
		setVitorias(novo);
	}

	function mudaTimeNovoJogador(event){
		let time = times.find((value) => value.nome === event.target.value);
		if (time !== undefined){
			setTimeNovoJogador(time);
		}
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
		if (nomeNovoJogador && codigoDeck1 && codigoDeck2 && codigoDeck3){
			let decks = [];

			const codigosDeck = [
				codigoDeck1, codigoDeck2, codigoDeck3
			];

			for(let i = 0; i < 3; ++i){
				let cards = [];
				try
				{
					cards = DeckEncoder.decode(codigosDeck[i]);
				}
				catch
				{
					setMensagemErroJogador("Algum deck é inválido.");
					return;
				}
				
				decks.push({
					'regions': pegaRegioes(cards),
					'champions': pegaCampeoes(cards)
				});
			}

			setJogadores((atual) => {
				return [...atual, {
					'nome':		nomeNovoJogador,
					'time':		timeNovoJogador,
					'decks':	decks
				}];
			});

			setTimeNovoJogador(semTime);
			setNomeNovoJogador('');
			setCodigoDeck1('');
			setCodigoDeck2('');
			setCodigoDeck3('');
			setMensagemErroJogador('');
		}else{
			setMensagemErroJogador("Algum dado está vazio.");
		}
	}

	function mudaNomeNovoTime(event){
		setNomeNovoTime(event.target.value);
	}

	function mudaUrlLogoNovoTime(event){
		setUrlLogoNovoTime(event.target.value);
	}

	function cadastrarNovoTime(){
		if (nomeNovoTime && urlLogoNovoTime){
			setTimes((atual) => {
				return [...atual, {
					'nome':		nomeNovoTime,
					'url_logo':	urlLogoNovoTime
				}];
			});

			setNomeNovoTime('');
			setUrlLogoNovoTime('');
			setMensagemErroTime('');
		}else{
			setMensagemErroTime("Algum dado está vazio.");
		}
	}

	function renderTime(time){
		return <option value={time.nome}>{time.nome}</option>
	}

	function renderRegion(region){
		return <Region><img src={`http://dd.b.pvp.net/latest/core/en_us/img/regions/icon-${region}.png`}/></Region>;
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

	return (
		<div id="content">
			<ThemeProvider theme={theme}>
				<Overlay className="overlay" webcam={mostrarWebcam} nomeTorneio={nomeTorneio} faseTorneio={faseTorneio} jogador1={jogador1} jogador2={jogador2} atuais={atuais} bans={bans} vitorias={vitorias}/>
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
								<input type="checkbox" id="webcam" onChange={() => toggleWebcam()}/><label for="webcam">Exibir webcam dos jogadores?</label>
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
										<p>Time: {jogador1.time.nome}</p>
										<Decks>
											<div>Decks</div>
											<Visualizacao>{renderDeck(jogador1.decks[0])}<button onClick={() => toggleAtual(0, 0)}>{atuais[0][0] ? "Não Jogando" : "Jogando"}</button><button onClick={() => toggleBan(0, 0)}>{bans[0][0] ? "Desbanir" : "Banir"}</button><button onClick={() => toggleVitoria(0, 0)}>{vitorias[0][0] ? "Não Ganhou" : "Ganhou"}</button></Visualizacao>
											<Visualizacao>{renderDeck(jogador1.decks[1])}<button onClick={() => toggleAtual(0, 1)}>{atuais[0][1] ? "Não Jogando" : "Jogando"}</button><button onClick={() => toggleBan(0, 1)}>{bans[0][1] ? "Desbanir" : "Banir"}</button><button onClick={() => toggleVitoria(0, 1)}>{vitorias[0][1] ? "Não Ganhou" : "Ganhou"}</button></Visualizacao>
											<Visualizacao>{renderDeck(jogador1.decks[2])}<button onClick={() => toggleAtual(0, 2)}>{atuais[0][2] ? "Não Jogando" : "Jogando"}</button><button onClick={() => toggleBan(0, 2)}>{bans[0][2] ? "Desbanir" : "Banir"}</button><button onClick={() => toggleVitoria(0, 2)}>{vitorias[0][2] ? "Não Ganhou" : "Ganhou"}</button></Visualizacao>
										</Decks>
									</SubsectionContent>
								</Subsection>
								<Subsection>
									<SubsectionTitle>
										<h5>Jogador 2</h5>
									</SubsectionTitle>
									<SubsectionContent>
										<p>Nome: {jogador2.nome}</p>
										<p>Time: {jogador2.time.nome}</p>
										<Decks>
											<div>Decks</div>
											<Visualizacao>{renderDeck(jogador2.decks[0])}<button onClick={() => toggleAtual(1, 0)}>{atuais[1][0] ? "Não Jogando" : "Jogando"}</button><button onClick={() => toggleBan(1, 0)}>{bans[1][0] ? "Desbanir" : "Banir"}</button><button onClick={() => toggleVitoria(1, 0)}>{vitorias[1][0] ? "Não Ganhou" : "Ganhou"}</button></Visualizacao>
											<Visualizacao>{renderDeck(jogador2.decks[1])}<button onClick={() => toggleAtual(1, 1)}>{atuais[1][1] ? "Não Jogando" : "Jogando"}</button><button onClick={() => toggleBan(1, 1)}>{bans[1][1] ? "Desbanir" : "Banir"}</button><button onClick={() => toggleVitoria(1, 1)}>{vitorias[1][1] ? "Não Ganhou" : "Ganhou"}</button></Visualizacao>
											<Visualizacao>{renderDeck(jogador2.decks[2])}<button onClick={() => toggleAtual(1, 2)}>{atuais[1][2] ? "Não Jogando" : "Jogando"}</button><button onClick={() => toggleBan(1, 2)}>{bans[1][2] ? "Desbanir" : "Banir"}</button><button onClick={() => toggleVitoria(1, 2)}>{vitorias[1][2] ? "Não Ganhou" : "Ganhou"}</button></Visualizacao>
										</Decks>
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
								<label for="pesquisar_jogador">Pesquisar:</label>
								<input type="text" name="pesquisar_jogador" value={jogadorQuery} onChange={mudaJogadorQuery}></input>
								<DataTable
									noHeader 
									pagination
									paginationPerPage={12}
									paginationRowsPerPageOptions={[12, 24, 36]}
									defaultSortField='nome'
									columns={colunasParticipantes}
									data={jogadoresVisiveis}
									noDataComponent='Não há participantes neste torneio.'
								/>
								<h3>Novo Participante</h3>
								<label for="time_jogador">Time:</label>
								<select name="time_jogador" value={timeNovoJogador.nome} onChange={mudaTimeNovoJogador}>
									{times.map(renderTime)}
								</select>
								<label for="nome_jogador">Nome:</label>
								<input type="text" name="nome_jogador" value={nomeNovoJogador} onChange={mudaNomeNovoJogador}></input>
								<label for="deck1">Deck 1:</label>
								<input type="text" name="deck1" value={codigoDeck1} onChange={mudaCodigoDeck1}></input>
								<label for="deck2">Deck 2:</label>
								<input type="text" name="deck2" value={codigoDeck2} onChange={mudaCodigoDeck2}></input>
								<label for="deck3">Deck 3:</label>
								<input type="text" name="deck3" value={codigoDeck3} onChange={mudaCodigoDeck3}></input>
								<MensagemErro>{mensagemErroJogador}</MensagemErro>
								<button onClick={cadastrarNovoJogador}>Cadastrar novo jogador</button>
							</SectionContent>
						 : null }
					</Section>
					<Section>
						<SectionTitle>
							<h3>Times</h3>
							<button onClick={toggleTimes}>{ mostrarTimes ? '-' : '+'}</button>
						</SectionTitle>
						{ mostrarTimes ?
							<SectionContent>
								<label for="pesquisar_time">Pesquisar:</label>
								<input type="text" name="pesquisar_time" value={timeQuery} onChange={mudaTimeQuery}></input>
								<DataTable
									noHeader 
									pagination
									paginationPerPage={20}
									defaultSortField='nome'
									columns={colunasTimes}
									data={timesVisiveis}
									noDataComponent='Não há times neste torneio.'
								/>
								<h3>Novo Time</h3>
								<label for="nome_time">Nome:</label>
								<input type="text" name="nome_time" value={nomeNovoTime} onChange={mudaNomeNovoTime}></input>
								<label for="url_logo">URL do logo:</label>
								<input type="text" name="url_logo" value={urlLogoNovoTime} onChange={mudaUrlLogoNovoTime}></input>
								<MensagemErro>{mensagemErroTime}</MensagemErro>
								<button onClick={cadastrarNovoTime}>Cadastrar novo time</button>
							</SectionContent>
						 : null }
					</Section>
				</Form>
			</ThemeProvider>
		</div>
	)
}

export default App;
