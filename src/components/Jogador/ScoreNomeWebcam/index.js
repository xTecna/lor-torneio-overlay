import React from 'react';

import {ScoreNomeWebcam as ScoreNomeWebcamDiv, ScoreNome, Score, Nome, Webcam} from './style';

const ScoreNomeWebcam = ({score, nome, url_imagem}) => {
	return (
		<ScoreNomeWebcamDiv>
			<ScoreNome>
				<Score>{score}</Score>
				<Nome nome={nome.length <= 10 ? "4vh" : (nome.length <= 20 ? "3vh" : "2vh")}>{nome}</Nome>
			</ScoreNome>
			<Webcam>{url_imagem}</Webcam>
		</ScoreNomeWebcamDiv>
	);
};

export default ScoreNomeWebcam;
