import styled from 'styled-components';

export const JogadorDecks = styled.div`
	width: 100%;

	display: flex;
	flex-direction: column;
`;

export const Jogador = styled.div`
	width: 100%;
	
	display: flex;
	flex-direction: row;
`;

export const Coluna = styled.div`
	display: flex;
	flex-direction: column;
`;

export const Decks = styled.div`
	width: ${props => props.theme.webcamSize*2}vh;
	height: ${props => props.theme.webcamSize*0.4}vh;

	display: flex;
	flex-direction: row;
`;

export const Webcam = styled.div`
	width: ${props => props.theme.webcamSize*1.5}vh;
	height: ${props => props.theme.webcamSize}vh;

	background-color: transparent;
	border: #6A5D3D solid 0.5vh;
`;

export const Time = styled.div`
	width: ${props => props.theme.webcamSize*0.5}vh;
	height: ${props => props.theme.webcamSize*0.5}vh;
	background-color: #4d312e;

	text-align: center;
	font-size: 5vh;

	img{
		padding: 5%;
		width: 100%;
		height: 100%;
		object-fit: contain;
	}
`;