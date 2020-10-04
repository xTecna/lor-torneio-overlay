import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {ThemeProvider} from 'styled-components';

import Overlay from '../../components/Overlay';
import players from '../../assets/players.json';

const theme = {
	webcamSize: 20
};

const Visual = (props) => {
	const [ idServidor, setIdServidor ] = useState('');

	const [ mostrarWebcam, setExibeWebcam ] = useState(false);
	const [ mostrarCronometro, setExibeCronometro ] = useState(false);

	const [ tempo, setTempo ] = useState(0);

	const [ nomeTorneio, setNomeTorneio ] = useState('');
	const [ faseTorneio, setFaseTorneio ] = useState('');
	const [ tempoLimiteTorneio, setTempoLimiteTorneio ] = useState(60);
	const [ jogador1, setJogador1 ] = useState(players[0]);
	const [ jogador2, setJogador2 ] = useState(players[1]);

	const [ bans, setBans ] = useState([[false, false, false], [false, false, false]]);
	const [ vitorias, setVitorias ] = useState([[false, false, false], [false, false, false]]);
	const [ atuais, setAtuais ] = useState([[true, false, false], [true, false, false]]);

	function setDados(data){
		setIdServidor(data._id);
		setExibeWebcam(data.webcam);
		setExibeCronometro(data.cronometro);
		setNomeTorneio(data.nomeTorneio);
		setFaseTorneio(data.faseTorneio);
		setTempo(data.tempo);
		setTempoLimiteTorneio(data.tempoLimiteTorneio);
		setJogador1(data.jogador1);
		setJogador2(data.jogador2);
		setAtuais([data.atuais1, data.atuais2]);
		setBans([data.bans1, data.bans2]);
		setVitorias([data.vitorias1, data.vitorias2]);
	}

	function carregaDados(id){
		axios({
			method: 'get',
			url: `http://localhost:3030/${id}`
		}).then(response =>{
			setDados(response.data);
		}).catch(error => console.log(error));
	}
	
	useEffect(() => {
		let interval = null;
		carregaDados(props.match.params.id);
		interval = setInterval(() => {
			carregaDados(props.match.params.id);
		}, 1000);
	}, []);

	return (
		<div id="content">
			<ThemeProvider theme={theme}>
				{ idServidor &&
					<Overlay className="overlay"
							 webcam={mostrarWebcam} cronometro={mostrarCronometro}
							 nomeTorneio={nomeTorneio} faseTorneio={faseTorneio} tempo={tempo} tempoLimiteTorneio={tempoLimiteTorneio}
							 jogador1={jogador1} jogador2={jogador2}
							 atuais={atuais} bans={bans} vitorias={vitorias}/>
				}
			</ThemeProvider>
		</div>
	)
}

export default Visual;