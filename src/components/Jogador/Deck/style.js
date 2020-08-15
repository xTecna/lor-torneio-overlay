import styled from 'styled-components';

export const Deck = styled.div`
	display: flex;
	flex-direction: column;
	width: ${props => props.theme.webcamSize*(2/3)}vh;
	height: ${props => props.theme.webcamSize*0.35}vh;
`;

export const Champion = styled.div`
	width: ${props => props.theme.webcamSize*(0.15)}vh;
	height: ${props => props.theme.webcamSize*(0.15)}vh;
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

export const Champions = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-evenly;
	align-items: center;
	text-align: center;
	flex-wrap: wrap;
	border: 0.2vh solid #6A5D3D;
	height: ${props => props.theme.webcamSize*0.35}vh;
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

	& > ${Champion}
	{
		flex: ${props => props.inline ? "1" : "0 33%" };
	}
`;

export const QtdChampion = styled.h3`
	font-size: 2vh;
`;
