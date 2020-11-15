import styled from 'styled-components';

export const DeckJogador = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;

	button
	{
		width: 10%;
		margin: 1%;
	}
`;

export const Deck = styled.label`
	width: 80%;
	
	display: flex;
	flex-direction: row;
	align-items: center;
`;

export const Regions = styled.div`
	width: 20%;
	
	display: flex;
	flex-direction: row;
	justify-content: space-evenly;
	align-items: center;
`;

export const Region = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;

	img{
		width: 100%;
		height: 100%;
	}
`;

export const Champions = styled.div`
	width: 60%;

	display: flex;
	flex-direction: row;
	justify-content: space-evenly;
	align-items: center;
	text-align: center;
	flex-wrap: wrap;

	color: #ffffff;
	text-shadow: 1px 1px #000000;
	font-size: 1.5vw;

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

export const Champion = styled.div`
	width: ${props => props.theme.webcamSize*0.15}vw;
	height: ${props => props.theme.webcamSize*0.15}vw;
	border-radius: 20vh;
	background-image: url(${props => props.img});
	background-size: cover;

	display: flex;
	flex-direction: row;
	justify-content: flex-end;
	align-items: flex-end;
`;
