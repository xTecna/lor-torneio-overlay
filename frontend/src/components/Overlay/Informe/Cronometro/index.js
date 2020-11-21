import React from 'react';
import { format } from 'date-fns';

import {useSaveState} from '../../../../context/SaveState';
import {useTime} from '../../../../context/Time';

import { Tempo } from './style';

function converte(tempo){
	let d = new Date();
	d.setHours(0, 0, tempo, 0);
	return format(d, 'HH:mm:ss');
}

const limite = {
	ok: 0,
	proximo: 1,
	passou: 2
};

const Cronometro = () => {
	const {saveState} = useSaveState();
	const {time} = useTime();
	const {cronometro, tempoLimiteTorneio: tempoLimite} = saveState;
	const {tempo} = time;

	let estadoLimite = limite.ok;

	if (tempo > tempoLimite * 60){
		estadoLimite = limite.passou;
	}else if ((tempoLimite * 60) - tempo < 300){
		estadoLimite = limite.proximo;
	}

	if (cronometro){
		return <Tempo limite={estadoLimite}>{converte(tempo)}</Tempo>;
	}else{
		return null;
	}
};

export default Cronometro;
