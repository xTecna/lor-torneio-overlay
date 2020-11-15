import React from 'react';
import { IoMdSwap } from 'react-icons/io';

import {useSaveState} from '../../../../context/SaveState';

import {JogadoresAtuais as JogadoresAtuaisDiv, Button} from './style';
import Jogador from './Jogador';

const JogadoresAtuais = () => {

	const { saveState, setSaveState } = useSaveState();
	const { jogador1, jogador2, atuais, bans, vitorias } = saveState;

	return (
		<JogadoresAtuaisDiv>
			<Jogador key={0} jogador={jogador1} jogadorIndex={0}/>
			<Button onClick={() => setSaveState({...saveState,
												jogador1: jogador2,
												jogador2: jogador1,
												atuais: [atuais[1], atuais[0]],
												bans: [bans[1], bans[0]],
												vitorias: [vitorias[1], vitorias[0]]
											})}>
				<IoMdSwap/>
			</Button>
			<Jogador key={1} jogador={jogador2} jogadorIndex={1}/>
		</JogadoresAtuaisDiv>
	);
};

export default JogadoresAtuais;