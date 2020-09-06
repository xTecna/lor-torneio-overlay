import React from 'react';

import {ScoreNomeWebcam as ScoreNomeWebcamDiv, ScoreNome, Score, Nome, Webcam} from './style';

const ScoreNomeWebcam = ({webcam, score, nome, url_imagem}) => {
	return (
		<ScoreNomeWebcamDiv>
			<ScoreNome>
				<Score>{score}</Score>
				<Nome nome={nome.length <= 10 ? "4vh" : (nome.length <= 20 ? "3vh" : "2vh")}>{nome}</Nome>
			</ScoreNome>
			{ webcam ? <Webcam>{url_imagem}</Webcam> : null }
		</ScoreNomeWebcamDiv>
	);
};

export default ScoreNomeWebcam;
