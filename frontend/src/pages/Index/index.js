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
	}, [time]);

	function serializaDados(){
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
			tempo: time.tempo
		};
	}

	function setDados(dados){
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

	async function criaIdServidor(){
		try
		{
			const response = await axios({
				method: 'post',
				url: 'http://localhost:3030/',
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

	async function carregaDadosDoBanco(id){
		try{
			if (localStorage.getItem('idServidor')){
				const idQuery = id ? id : localStorage.getItem('idServidor');

				const response = await axios({
					method: 'get',
					url: `http://localhost:3030/${idQuery}`
				});

				if (response.status === 200){
					setDados(response.data);
					return true;
				}else{
					return false;
				}
			}else{
				return await criaIdServidor();
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
		const carregaDados = async () => {
			if (!(await carregaDadosDoBanco())){
				carregaDadosLocais();
			}
			setCarregado(true);
		}
		carregaDados();
	}, []);

	async function salvaDadosNoBanco(){
		try
		{
			if (localStorage.getItem('idServidor')){
				await axios({
					method: 'put',
					url: `http://localhost:3030/${idServidor}`,
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
	}, [idServidor, saveState, time]);

	return (
		<div id="content">
			<ThemeProvider theme={theme}>
				<Overlay className="overlay" state={saveState} tempo={time.tempo}/>
				<Form className="form" idServidor={idServidor} mudaIdServidor={carregaDadosDoBanco}/>
			</ThemeProvider>
		</div>
	)
}

export default Index;
