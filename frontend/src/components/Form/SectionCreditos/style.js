import styled from 'styled-components';

export const CreditosInformacao = styled.div`
	padding: 1vh;
	padding-bottom: 0vh;
`;

export const Creditos = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
`;

export const RedesSociais = styled.div`
	width: 10vw;

	font-size: 3vh;

	display: flex;
	flex-direction: row;
	justify-content: space-evenly;

	& > a
	{
		color: #000000;
	}
`;