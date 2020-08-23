import styled from 'styled-components';

export const Form = styled.div`
	height: 100vh;
	display: flex;
	flex-direction: column;
`;

export const Section = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	padding: 1vh;
`;

export const SectionContent = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	padding: 1vh;

	&.by-row
	{
		display: grid;
		grid-template-rows: 1fr;
		grid-template-columns: 1fr 1fr;
		grid-template-areas: 'overlay form';
	}
`;

export const SectionTitle = styled.h1`
	width: 100%;
	height: 5vh;
	color: #000000;
	background-color: #ff0000;
	border: 0.25vh solid #000000;
	font-size: 3vh;
	display: flex;
	flex-direction: row;
	justify-content: space-between;

	button
	{
		width: 5vh;
		font-size: 4vh;
	}
`;

export const MensagemErro = styled.p`
	color: #ff0000;
	font-weight: bold;
`;

export const Subsection = styled.div`
	display: flex;
	flex-direction: column;
	padding: 1vh;
`;

export const SubsectionTitle = styled.h1`
	height: 5vh;
	color: #ffffff;
	background-color: #0000ff;
	border: 0.25vh solid #000000;
	font-size: 3vh;
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
