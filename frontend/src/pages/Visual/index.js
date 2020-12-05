import React, { useEffect, useState } from 'react';
import {ThemeProvider} from 'styled-components';
import axios from 'axios';

import {useSaveState} from '../../context/SaveState';
import {useTime} from '../../context/Time';

import Overlay from '../../components/Overlay';

const theme = {
	webcamSize: 20
};

const Visual = (props) => {
	const [ idServidor, setIdServidor ] = useState('');
	const { setSaveState } = useSaveState();
	const { time, setTime } = useTime();
	
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

	async function carregaDadosDoBanco(id){
		try{
			const response = await axios({
				method: 'get',
				url: `https://lor-torneio-overlay.herokuapp.com/${id}`
			});

			if (response.status === 200){
				setDados(response.data);
				return true;
			}else{
				return false;
			}
		}
		catch(err)
		{
			console.log(err);
			return false;
		}
	}

	useEffect(() => {
		const carregaDados = async () => {
			carregaDadosDoBanco(props.match.params.id);
		};
		setInterval(() => {
			carregaDados();
		}, 1000);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div id="content">
			<ThemeProvider theme={theme}>
				{ idServidor && <Overlay className="overlay"/>}
			</ThemeProvider>
		</div>
	)
}

export default Visual;