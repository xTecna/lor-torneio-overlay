import styled from 'styled-components';

export const JogadorDecks = styled.div`
	display: flex;
	flex-direction: column;
`;

export const Jogador = styled.div`
	display: flex;
	flex-direction: row;
`;

export const Coluna = styled.div`
	display: flex;
	flex-direction: column;
`;

export const Decks = styled.div`
	display: flex;
	flex-direction: row;
	width: ${props => props.theme.webcamSize*2}vh;
	height: ${props => props.theme.webcamSize*0.35}vh;
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
	text-align: center;
	background-image: linear-gradient(#4d312e, #402d2c);
	font-size: 5vh;

	img{
		padding: 5%;
		width: 100%;
		height: 100%;
		object-fit: contain;
	}
`;