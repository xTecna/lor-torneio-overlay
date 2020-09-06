import styled from 'styled-components';

export const TimeRegionsChampions = styled.div`
	width: ${props => props.theme.webcamSize*0.5}vh;
	height: ${props => props.theme.webcamSize*1.25}vh;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
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

export const RegionsChampions = styled.div`
	height: ${props => props.theme.webcamSize*0.75}vh;
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
	width: ${props => props.theme.webcamSize*0.2}vh;
	height: ${props => props.theme.webcamSize*0.2}vh;
	border: #6A5D3D solid 0.3vh;
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
	width: ${props => props.theme.webcamSize*0.15}vh;
	height: ${props => props.theme.webcamSize*0.5}vh;
	color: #ffffff;
	padding: 0.5vh;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	flex-wrap: wrap;
	align-items: center;
`;

export const QtdChampion = styled.h3`
	font-size: 2vh;
`;

export const Champion = styled.div`
	width: ${props => props.theme.webcamSize*0.15}vh;
	height: ${props => props.theme.webcamSize*0.15}vh;
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