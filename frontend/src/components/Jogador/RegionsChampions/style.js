import styled from 'styled-components';

export const RegionsChampions = styled.div`
	width: ${props => props.theme.webcamSize * (props.inline ? 1.5 : 0.5)};
	height: ${props => props.theme.webcamSize * (props.inline ? 0.25 : 0.75)}vh;
	display: flex;
	flex-direction: ${props => props.inline ? 'row' : 'column'};
	justify-content: space-between;
	background-image: ${props => props.inline ? 'linear-gradient(\#452f2c, \#402d2c)' : 'linear-gradient(\#402d2c, \#2b2728)'};
`;

export const Regions = styled.div`
	width: ${props => props.theme.webcamSize * (props.inline ? 0.5 : 0.5)}vh;
	height: ${props => props.theme.webcamSize * 0.25}vh;
	display: flex;
	flex-direction: row;
	justify-content: space-evenly;
	align-items: center;
	padding: 1vh;
`;

export const Region = styled.div`
	width: ${props => props.theme.webcamSize*0.2}vh;
	height: ${props => props.theme.webcamSize*0.2}vh;
	border-radius: 50%;
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
	width: ${props => props.theme.webcamSize * (props.inline ? 1.0 : 0.5)}vh;
	height: ${props => props.theme.webcamSize * (props.inline ? 0.25 : 0.5)}vh;
	color: #ffffff;
	padding-top: 1vh;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	flex-wrap: wrap;
	align-items: flex-start;
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