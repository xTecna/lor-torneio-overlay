import styled from 'styled-components';

export const Time = styled.div`
	width: 5vw;

	display: flex;
	justify-content: space-between;
	align-items: center;
`;

export const Deck = styled.div`
	width: 9vw;

	display: flex;
	flex-direction: column;
	align-items: center;
`;

export const Regions = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-evenly;
	align-items: center;
`;

export const Region = styled.div`
	width: 1.75vw;
	height: 1.75vw;

	display: flex;
	align-items: center;
	justify-content: center;

	img{
		width: 100%;
		height: 100%;
	}
`;

export const Champions = styled.div`
	width: 9vw;

	display: flex;
	flex-direction: row;
	justify-content: space-evenly;
	align-items: center;
	text-align: center;
	flex-wrap: wrap;

	color: #ffffff;
	text-shadow: 1px 1px #000000;
	font-size: 0.75vw;
`;

export const Champion = styled.div`
	width: 1.5vw;
	height: 1.5vw;
	border-radius: 20vh;
	background-image: url(${props => props.img});
	background-size: cover;

	display: flex;
	flex-direction: row;
	justify-content: flex-end;
	align-items: flex-end;
`;
