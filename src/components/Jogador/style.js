import styled from 'styled-components';

const webcamSize = 20;

export const JogadorDecks = styled.div`
	display: flex;
	flex-direction: column;
`;

export const Jogador = styled.div`
	width: ${webcamSize*2}vh;
	display: flex;
	flex-direction: column;
`;

export const Superior = styled.div`
	display: flex;
	flex-direction: row;
`;

export const ScoreNomeWebcam = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	width: ${webcamSize*1.5}vh;
	height: ${webcamSize*1.25}vh;
`;

export const ScoreNome = styled.div`
	display: flex;
	flex-direction: row;
	width: ${webcamSize*1.5}vh;
	height: ${webcamSize*0.25}vh;
	background-image: linear-gradient(#4d312e, #452f2c);
`;

export const Score = styled.h1`
	width: ${webcamSize*0.3}vh;
	display: flex;
	justify-content: center;
	align-items: center;
	color: #FFFFFF;
	border: #6A5D3D solid 0.3vh;
	background-image: linear-gradient(#d11313, #6d0000);
	font-size: 4vh;
`;

export const Nome = styled.p`
	width: ${webcamSize*1.2}vh;
	font-size: ${props => props.nome};
	color: #FFFFFF;
	display: flex;
	justify-content: start;
	align-items: center;
	padding-left: 0.5vh;
`;

export const Webcam = styled.div`
	width: ${webcamSize*1.5}vh;
	height: ${webcamSize}vh;
	background-color: transparent;
	border: #6A5D3D solid 0.5vh;
`;

export const TimeRegionChampions = styled.div`
	width: ${webcamSize*0.5}vh;
	height: ${webcamSize*1.25}vh;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`;

export const Time = styled.div`
	width: ${webcamSize*0.5}vh;
	height: ${webcamSize*0.5}vh;
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

export const RegionChampions = styled.div`
	height: ${webcamSize*0.75}vh;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	background-image: linear-gradient(#402d2c, #2b2728);
`;

export const Regions = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-evenly;
	align-items: center;
`;

export const Region = styled.div`
	border-radius: 50%;
	width: ${webcamSize*0.2}vh;
	height: ${webcamSize*0.2}vh;
	border: #6A5D3D solid 0.2vh;
	background: #626662;
	background: radial-gradient(circle, #626662 0%, #2a3233 35%, #161313 100%);
	display: flex;
	align-items: center;
	justify-content: center;

	img{
		width: 90%;
		height: 90%;
	}
`;

export const Champions = styled.div`
	padding: 0.5vh;
	display: flex;
	flex-direction: row;
	justify-content: space-evenly;
	flex-wrap: wrap;
	align-items: center;
`;

export const Champion = styled.div`
	width: ${webcamSize*0.15}vh;
	height: ${webcamSize*0.15}vh;
	background-color: #000000;
	
	img{
		margin: 5%;
		width: 90%;
		height: 90%;
	}
`;

export const Decks = styled.div`
	display: flex;
	flex-direction: row;
	width: ${webcamSize*2}vh;
	height: ${webcamSize*0.35}vh;
`;

export const Deck = styled.div`
	display: flex;
	flex-direction: column;
	width: ${webcamSize*(2/3)}vh;
	height: ${webcamSize*0.35}vh;
`;

export const ChampionDeck = styled.div`
	width: ${webcamSize*(0.15)}vh;
	height: ${webcamSize*(0.15)}vh;
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

export const ChampionsDeck = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-evenly;
	align-items: center;
	text-align: center;
	flex-wrap: wrap;
	border: 0.2vh solid #6A5D3D;
	height: ${webcamSize*0.35}vh;
	background-image: linear-gradient(#4d312e, #2b2728);
	color: #ffffff;

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

	& > ${ChampionDeck}
	{
		flex: ${props => props.inline ? "1" : "0 33%" };
	}
`;

export const QtdChampionDeck = styled.h3`
	font-size: 2vh;
`;