import React from 'react';

import {ScoreNome as ScoreNomeDiv, Score, Nome} from './style';

function tamanhoNome(nome){
	if (nome.length <= 8)		return 4;
	else if (nome.length <= 16)	return 3;
	else						return 2;
}

const ScoreNome = ({inline, time, score, nome}) => {	
	return (
		<ScoreNomeDiv className="score-nome">
			<Score className="score">{score}</Score>
			<Nome className="nome" inline={inline} tamanhoNome={tamanhoNome(nome)} time={time}>{nome}</Nome>
		</ScoreNomeDiv>
	);
};

export default ScoreNome;
