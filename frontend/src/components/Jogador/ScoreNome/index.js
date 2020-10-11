import React from 'react';

import {ScoreNome as ScoreNomeDiv, Score, Nome} from './style';

const ScoreNome = ({toggleForm, time, score, nome}) => {
	return (
		<ScoreNomeDiv>
			<Score onClick={toggleForm}>{score}</Score>
			<Nome nome={nome.length <= 10 ? "4vh" : (nome.length <= 20 ? "3vh" : "2vh")} time={time}>{nome}</Nome>
		</ScoreNomeDiv>
	);
};

export default ScoreNome;
