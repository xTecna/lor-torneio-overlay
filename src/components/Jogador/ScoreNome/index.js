import React from 'react';

import {ScoreNome as ScoreNomeDiv, Score, Nome} from './style';

const ScoreNome = ({score, nome}) => {
	return (
		<ScoreNomeDiv>
			<Score>{score}</Score>
			<Nome nome={nome.length <= 10 ? "4vh" : (nome.length <= 20 ? "3vh" : "2vh")}>{nome}</Nome>
		</ScoreNomeDiv>
	);
};

export default ScoreNome;
