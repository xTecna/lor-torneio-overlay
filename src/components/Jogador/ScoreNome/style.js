import styled from 'styled-components';

export const ScoreNome = styled.div`
	display: flex;
	flex-direction: row;
	width: ${props => props.theme.webcamSize*1.5}vh;
	height: ${props => props.theme.webcamSize*0.25}vh;
	background-image: linear-gradient(#4d312e, #452f2c);
`;

export const Score = styled.h1`
	width: ${props => props.theme.webcamSize*0.3}vh;
	display: flex;
	justify-content: center;
	align-items: center;
	color: #FFFFFF;
	border: #6A5D3D solid 0.3vh;
	background-image: linear-gradient(#d11313, #6d0000);
	font-size: 4vh;
`;

export const Nome = styled.p`
	width: ${props => props.theme.webcamSize*1.2}vh;
	font-size: ${props => props.nome};
	color: #FFFFFF;
	display: flex;
	justify-content: start;
	align-items: center;
	padding-left: 0.5vh;
`;