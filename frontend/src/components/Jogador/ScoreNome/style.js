import styled from 'styled-components';

export const ScoreNome = styled.div`
	height: ${props => props.theme.webcamSize*0.25}vh;
	background-color: #4d312e;
	
	display: flex;
	flex-direction: row;
`;

export const Score = styled.h1`
	width: ${props => props.theme.webcamSize * 0.3}vh;
	display: flex;
	justify-content: center;
	align-items: center;
	color: #FFFFFF;
	background-color: #2f1f1e;
	font-size: 4vh;
`;

export const Nome = styled.p`
	width: ${props => props.theme.webcamSize * (props.time ? 1 : (props.inline ? 1.7 : 1))}vh;

	font-size: ${props => props.nome};
	color: #FFFFFF;
	display: flex;
	justify-content: start;
	align-items: center;
	padding-left: 0.5vh;
`;