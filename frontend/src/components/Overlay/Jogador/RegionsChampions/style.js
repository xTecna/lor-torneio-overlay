import styled from 'styled-components';

export const RegionsChampions = styled.div`
	width: 100%;
	height: ${props => props.theme.webcamSize * (props.inline ? 0.25 : (props.time ? 0.75 : 1.25))}vh;
	background-color: #4d312e;
	
	display: flex;
	flex-direction: ${props => props.inline ? 'row' : 'column'};
	justify-content: space-between;
`;

export const Regions = styled.div`
	width: ${props => props.theme.webcamSize*0.5}vh;
	height: ${props => props.theme.webcamSize * (props.inline ? 0.25 : (props.time ? 0.25 : 0.5))}vh;
	display: flex;
	flex-direction: row;
	justify-content: space-evenly;
	align-items: center;
`;

export const Region = styled.div`
	width: ${props => props.theme.webcamSize*0.2}vh;
	height: ${props => props.theme.webcamSize*0.2}vh;

	img{
		width: 100%;
		height: 100%;
	}
`;

export const Champions = styled.div`
	width: ${props => props.theme.webcamSize * (props.inline ? (props.time ? 1 : 1.5) : 0.5)}vh;
	height: ${props => props.theme.webcamSize * (props.inline ? 0.25 : (props.time ? 0.5 : 0.75))}vh;
	
	display: flex;
	flex-direction: row;
	justify-content: space-evenly;
	align-items: center;
	flex-wrap: wrap;
`;

export const Champion = styled.div`
	width: ${props => props.theme.webcamSize*(props.lotado ? 0.15 : 0.2)}vh;
	height: ${props => props.theme.webcamSize*(props.lotado ? 0.15 : 0.2)}vh;
	
	color: #ffffff;
	border-radius: 20vh;
	background-image: url(${props => props.img});
	background-size: cover;
	font-size: 2vh;

	display: flex;
	flex-direction: row;
	justify-content: flex-end;
	align-items: flex-end;
`;