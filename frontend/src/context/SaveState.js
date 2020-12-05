import React, {createContext, useState, useContext} from 'react';

const SaveStateContext = createContext();

export default function SaveStateProvider({children}){
	const [saveState, setSaveState] = useState({
		webcam: false,
		cronometro: true,
		nomeTorneio: 'Torneio',
		faseTorneio: 'Oitavas-de-final',
		tempoLimiteTorneio: 120,
		regra: '',
		rounds: 1,
		jogador1: {
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
		jogador2: {
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
		bans: [[true, false, false], [false, false, true]],
		vitorias: [[false, true, false], [false, false, false]],
		atuais: [[false, false, true], [false, true, false]],
		partidas: [],
		jogadores: [],
		times: []
	});

	return (
		<SaveStateContext.Provider value={{saveState, setSaveState}}>
			{children}
		</SaveStateContext.Provider>
	);
}

export function useSaveState(){
	const context = useContext(SaveStateContext);
	const { saveState, setSaveState } = context;

	return { saveState, setSaveState };
};