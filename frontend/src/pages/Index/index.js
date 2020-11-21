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

function serializaDados(saveState, tempo){
	return {
		webcam: saveState.webcam,
		cronometro: saveState.cronometro,
		nomeTorneio: saveState.nomeTorneio,
		faseTorneio: saveState.faseTorneio,
		tempoLimiteTorneio: saveState.tempoLimiteTorneio,
		jogador1: saveState.jogador1,
		jogador2: saveState.jogador2,
		atuais1: saveState.atuais[0],
		bans1: saveState.bans[0],
		vitorias1: saveState.vitorias[0],
		atuais2: saveState.atuais[1],
		bans2: saveState.bans[1],
		vitorias2: saveState.vitorias[1],
		tempo: tempo
	};
}

function setDados(dados, time, setIdServidor, setSaveState, setTime){
	setIdServidor(dados._id);
	setSaveState({
		webcam: dados.webcam,
		cronometro: dados.cronometro,
		nomeTorneio: dados.nomeTorneio,
		faseTorneio: dados.faseTorneio,
		tempoLimiteTorneio: dados.tempoLimiteTorneio,
		jogador1: dados.jogador1,
		jogador2: dados.jogador2,
		bans: [dados.bans1, dados.bans2],
		vitorias: [dados.vitorias1, dados.vitorias2],
		atuais: [dados.atuais1, dados.atuais2],
		jogadores: dados.jogadores,
		times: dados.times
	});
	setTime({...time, tempo: dados.tempo});
}

async function criaIdServidor(saveState, time, setIdServidor, setSaveState, setTime){
	try
	{
		const response = await axios({
			method: 'post',
			url: 'http://localhost:3030/',
			headers: {
				"Content-Type": "application/json"
			},
			data: serializaDados(saveState, time.tempo)
		});
		
		if (response.status === 200){
			setDados(response.data, time, setIdServidor, setSaveState, setTime);
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

async function carregaDadosDoBanco(saveState, time, setIdServidor, setSaveState, setTime){
	try{
		if (localStorage.getItem('idServidor')){
			const idQuery = localStorage.getItem('idServidor');

			const response = await axios({
				method: 'get',
				url: `http://localhost:3030/${idQuery}`
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

function carregaDadosLocais(setIdServidor, setSaveState){
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

async function salvaDadosNoBanco(idServidor, saveState, time){
	try
	{
		if (localStorage.getItem('idServidor')){
			await axios({
				method: 'put',
				url: `http://localhost:3030/${idServidor}`,
				headers: {
					"Content-Type": "application/json"
				},
				data: serializaDados(saveState, time.tempo)
			});
		}
	}
	catch(err)
	{
		throw err;
	}
}

function salvaDadosLocais(idServidor, saveState){
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

const Index = () => {
	const [ carregado, setCarregado ] = useState(false);

	const [ idServidor, setIdServidor ] = useState('');
	const { saveState, setSaveState } = useSaveState();
	const { time, setTime } = useTime();

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
			if (!(await carregaDadosDoBanco(saveState, time, setIdServidor, setSaveState, setTime))){
				carregaDadosLocais(setIdServidor, setSaveState);
			}
			setCarregado(true);
		}
		carregaDados();
	}, []);

	useEffect(() => {
		const salvaDados = async () => {
			try
			{
				await salvaDadosNoBanco(idServidor, saveState, time);
			}
			catch (err)
			{
				console.log(err);
			}
			finally
			{
				salvaDadosLocais(idServidor, saveState);
			}
		}
		if (carregado)	salvaDados();
	}, [carregado, idServidor, saveState, time]);

	return (
		<div id="content">
			<ThemeProvider theme={theme}>
				<Overlay className="overlay"/>
				<Form className="form" idServidor={idServidor}/>
			</ThemeProvider>
		</div>
	)
}

export default Index;
