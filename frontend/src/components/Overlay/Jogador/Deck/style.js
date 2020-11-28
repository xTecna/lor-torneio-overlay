import styled from 'styled-components';

export const Decks = styled.div`
	width: ${props => props.theme.webcamSize*(2/3)}vh;
	height: ${props => props.theme.webcamSize*0.4}vh;

	display: flex;
	flex-direction: column;
`;

export const Deck = styled.div`
	height: ${props => props.theme.webcamSize*0.4}vh;
	
	align-items: center;
	text-align: center;
	flex-wrap: wrap;
	border: 0.2vh solid #6A5D3D;
	background-color: #4d312e;
	color: #ffffff;
	text-shadow: 0 0 5px #000000;
	
	display: flex;
	flex-direction: row;
	justify-content: space-evenly;

	&.ban {
		background-image: linear-gradient(#3d3d3d, #292929);
		border: 0.2vh solid #545454;
	}

	&.ban img {
		filter: grayscale(100%);
	}

	&.victory {
		border-color: #00ff00;
	}

	&.victory img {
		filter: brightness(50%);
	}
`;

export const Region = styled.div`
	width: ${props => props.theme.webcamSize*0.2}vh;
	height: ${props => props.theme.webcamSize*0.2}vh;

	img{
		width: 100%;
		height: 100%;
	}
`;

export const Champion = styled.div`
	width: ${props => props.theme.webcamSize*0.175}vh;
	height: ${props => props.theme.webcamSize*0.175}vh;
	border-radius: 20vh;
	background-image: url(${props => props.img});
	background-size: cover;
	font-size: 2vh;

	display: flex;
	flex-direction: row;
	justify-content: flex-end;
	align-items: flex-end;

	&.ban {
		background-image: linear-gradient(black, black), url(${props => props.img});
		background-blend-mode: saturation;
	}
`;
