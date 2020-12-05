import React, {useState, useEffect} from 'react';
import {ThemeProvider} from 'styled-components';
import axios from 'axios';

import {useSaveState} from '../../context/SaveState';
import {useTime} from '../../context/Time';

import Overlay from '../../components/Overlay';
import Form from '../../components/Form';

const theme = {
	webcamSize: 20
};

const Index = () => {
	const [ carregado, setCarregado ] = useState(false);

	const [ idServidor, setIdServidor ] = useState('');
	const { saveState, setSaveState } = useSaveState();
	const { time, setTime } = useTime();
	
	function serializaDados(){
		return {
			webcam: saveState.webcam,
			cronometro: saveState.cronometro,
			nomeTorneio: saveState.nomeTorneio,
			faseTorneio: saveState.faseTorneio,
			tempoLimiteTorneio: saveState.tempoLimiteTorneio,
			regra: saveState.regra,
			rounds: saveState.rounds,
			jogador1: saveState.jogador1,
			jogador2: saveState.jogador2,
			atuais1: saveState.atuais[0],
			bans1: saveState.bans[0],
			vitorias1: saveState.vitorias[0],
			atuais2: saveState.atuais[1],
			bans2: saveState.bans[1],
			vitorias2: saveState.vitorias[1],
			partidas: saveState.partidas,
			jogadores: saveState.jogadores,
			times: saveState.times,
			tempo: time.tempo
		};
	}

	async function salvaDadosNoBanco(){
		try
		{
			if (localStorage.getItem('idServidor')){
				await axios({
					method: 'put',
					url: `https://lor-torneio-overlay.herokuapp.com/${idServidor}`,
					headers: {
						"Content-Type": "application/json"
					},
					data: serializaDados()
				});
			}
		}
		catch(err)
		{
			throw err;
		}
	}

	function salvaDadosLocais(){
		try
		{
			localStorage.setItem('idServidor', idServidor);
			localStorage.setItem('state', JSON.stringify(saveState));
		}
		catch (err)
		{
			console.log(err);
		}
	}

	function setDados(dados){
		setIdServidor(dados._id);
		setSaveState({
			webcam: dados.webcam || false,
			cronometro: dados.cronometro || true,
			nomeTorneio: dados.nomeTorneio || 'Torneio',
			faseTorneio: dados.faseTorneio || 'Oitavas-de-final',
			tempoLimiteTorneio: dados.tempoLimiteTorneio || 120,
			regra: dados.regra || '',
			rounds: dados.rounds || 1,
			jogador1: dados.jogador1 || {
				nome: 'WNX Mafraju',
				time: {nome: '', url_logo: ''},
				decks: [{code:		'CECAMAIABEFRMHJGE4AQEBQWAIBAACIKAEBQABQEAEBAABYBAMAA4AQBAAKRUAICAY7AA',
						regions:	['bilgewater', 'demacia'],
						champions:	[{nome: 'Lucian', qtd: 3}, {nome: 'MissFortune', qtd: 3}]},
						{code:		'CEBAIAIBBMTCSMADAEBQIHZBAUCQCAIBAMLB4KQBAMAQEAIDAMCACAIDGUAQEAICAEAQCAZT',
						regions:	['freljord', 'noxus'],
						champions:	[{nome: 'Ashe', qtd: 3}, {nome: 'Sejuani', qtd: 3}]},
						{code:		'CEBQKAYBAICQMCQWAQAQKAIZFAYQIAIBBQQSOMQAAEAQCBJB',
						regions:	['freljord', 'shadowisles'],
						champions:	[{nome: 'Trundle', qtd: 3}, {nome: 'Tryndamere', qtd: 3}]}]
				},
			jogador2: dados.jogador2 || {
				nome: 'WNX Tecna',
				time: {nome: 'WNX', url_logo: 'https://media.discordapp.net/attachments/703593969820631050/739497322580541540/WNX.png'},
				decks: [{code:		'CEBAIAYGAQDQQDYHAMER2IZNGM2DOPACAEBQMCIBAMESSAQBAIDAKAQDBEKFK',
						regions:	['bilgewater', 'targon'],
						champions:	[{nome: 'Soraka', qtd: 3}, {nome: 'TahmKench', qtd: 3}]},
					{code:		'CEBQCAYECIDACBABBQOCOKBNAUAQGBYJCQTTOAIBAECA2AQBAEBSGAIDAQAQ',
					regions:	['noxus', 'piltoverzaun'],
					champions:	[{nome: 'Draven', qtd: 3}, {nome: 'Jinx', qtd: 3}]},
					{code:		'CICACAYCCQBACAQJGEBQEAQDAYEQKAYJDMRTGVS4AIAQEAQIAIBQSKKVAEAQEAQF',
					regions:	['ionia', 'targon'],
					champions:	[{nome: 'Zed', qtd: 3}, {nome: 'LeeSin', qtd: 3}]}]
				},
			bans: [dados.bans1 || [true, false, false], dados.bans2 || [false, false, true]],
			vitorias: [dados.vitorias1 || [false, true, false], dados.vitorias2 || [false, false, false]],
			atuais: [dados.atuais1 || [false, false, true], dados.atuais2 || [false, true, true]],
			partidas: dados.partidas || [],
			jogadores: dados.jogadores || [],
			times: dados.times || []
		});
		setTime({...time, tempo: dados.tempo});
	}

	async function criaIdServidor(){
		try
		{
			const response = await axios({
				method: 'post',
				url: 'https://lor-torneio-overlay.herokuapp.com/',
				headers: {
					"Content-Type": "application/json"
				},
				data: serializaDados()
			});
			
			if (response.status === 200){
				setDados(response.data);
				return true;
			}else{
				return false;
			}
		}
		catch (err)
		{
			console.log(err);
			return false;
		}
	}

	async function carregaDadosDoBanco(){
		try{
			if (localStorage.getItem('idServidor')){
				const idQuery = localStorage.getItem('idServidor');

				const response = await axios({
					method: 'get',
					url: `https://lor-torneio-overlay.herokuapp.com/${idQuery}`
				});

				if (response.status === 200){
					setDados(response.data, time, setIdServidor, setSaveState, setTime);
					return true;
				}else{
					return false;
				}
			}else{
				return await criaIdServidor(saveState, time, setIdServidor, setSaveState, setTime);
			}
		}
		catch(err)
		{
			console.log(err);
			return false;
		}
	}

	function carregaDadosLocais(){
		try
		{
			if (localStorage.getItem('idServidor')){
				setIdServidor(localStorage.getItem('idServidor'));
			}

			if (localStorage.getItem('state')){
				setSaveState(JSON.parse(localStorage.getItem('state')));
			}
		}
		catch (err)
		{
			console.log(err);
		}
	}

	useEffect(() => {
		let interval = null;
		if (time.temporizador){
			interval = setInterval(() => {
				setTime({...time, tempo: time.tempo + 1});
			}, 1000);
		} else if (!time.temporizador && time.tempo !== 0){
			clearInterval(interval);
		}
		return () => clearInterval(interval);
	}, [time, setTime]);

	useEffect(() => {
		const carregaDados = async () => {
			if (!(await carregaDadosDoBanco())){
				carregaDadosLocais();
			}
			setCarregado(true);
		}
		carregaDados();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		const salvaDados = async () => {
			try
			{
				await salvaDadosNoBanco();
			}
			catch (err)
			{
				console.log(err);
			}
			finally
			{
				salvaDadosLocais();
			}
		}
		if (carregado)	salvaDados();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [carregado, idServidor, saveState, time]);

	return (
		<div id="content">
			<ThemeProvider theme={theme}>
				<Overlay className="overlay"/>
				<Form className="form" idServidor={idServidor} setIdServidor={setIdServidor}
									   setDados={setDados}/>
			</ThemeProvider>
		</div>
	)
}

export default Index;
