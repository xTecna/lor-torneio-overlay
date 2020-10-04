import React from 'react';
import { format } from 'date-fns';

import { Tempo } from './style';

function converte(tempo){
	let d = new Date();
	d.setHours(0, 0, tempo, 0);
	return format(d, 'HH:mm:ss');
}

const tempoOk = 0;
const tempoProximoLimite = 1;
const tempoPassouLimite = 2;

const Cronometro = ({cronometro, tempo, tempoLimite}) => {
	if (cronometro){
		return <Tempo limite={(tempo > tempoLimite) ? tempoPassouLimite : ((tempoLimite - tempo < 300) ? tempoProximoLimite : tempoOk)}>{converte(tempo)}</Tempo>;
	}else{
		return null;
	}
};

export default Cronometro;
