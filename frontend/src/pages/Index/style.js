import styled from 'styled-components';

export const Decks = styled.div`
	display: flex;
	flex-direction: column;
`;

export const Visualizacao = styled.div`
	display: flex;
	flex-direction: row;

	button
	{
		width: 10%;
		margin: 1%;
	}
`;

export const Deck = styled.div`
	width: 80%;
	height: ${props => props.theme.webcamSize*0.35}vh;
	display: flex;
	flex-direction: row;
	align-items: center;
`;

export const Regions = styled.div`
	width: 20%;
	height: ${props => props.theme.webcamSize*0.2}vh;
	display: flex;
	flex-direction: row;
	justify-content: space-evenly;
	align-items: center;
`;

export const Region = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	border: #6A5D3D solid 0.4vh;
	background: #626662;
	background: radial-gradient(circle, #626662 0%, #2a3233 35%, #161313 100%);
	border-radius: ${props => props.theme.webcamSize*0.2}vh;

	img{
		width: 100%;
		height: 100%;
	}
`;

export const Champions = styled.div`
	width: 60%;
	height: ${props => props.theme.webcamSize*0.2}vh;
	display: flex;
	flex-direction: row;
	justify-content: space-evenly;
	align-items: center;
	text-align: center;
	flex-wrap: wrap;
	color: #000000;

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

export const QtdChampion = styled.h3`
	font-size: 2vh;
`;

export const Champion = styled.div`
	width: ${props => props.theme.webcamSize*(0.15)}vh;
	height: ${props => props.theme.webcamSize*0.2}vh;
	display: flex;
	flex-direction: row;
	
	img{
		border: 0.1vh solid #000000;
		margin: 5%;
		width: auto;
		height: 90%;
		object-fit: contain;
	}
`;

