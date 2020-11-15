import styled from 'styled-components';

export const Subsection = styled.div`
	width: 50%;

	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 1vh;
`;

export const SubsectionTitle = styled.h5`
	width: 20vh;

	color: #ffffff;
	background-color: #4d312e;
	padding: 0.5vh;
	padding-left: 1vh;
	border-radius: 5vh;
	font-size: 3vh;
	text-align: center;
`;

export const SubsectionContent = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	padding: 1vh;

	.by-row
	{
		flex-direction: row;
	}
`;

export const Decks = styled.div`
	display: flex;
	flex-direction: column;
`;
