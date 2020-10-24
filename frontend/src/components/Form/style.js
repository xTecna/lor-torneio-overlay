import styled from 'styled-components';

export const Form = styled.div`
	width: 100%;
	height: 100vh;

	overflow-y: auto;
`;

export const Section = styled.div`
	width: 100%;

	display: flex;
	flex-direction: column;
`;

export const SectionContent = styled.div`
	padding: 1vh;

	display: flex;
	flex-direction: column;

	&.form-inline
	{
		flex-direction: row;
		flex-wrap: wrap;
		align-items: center;
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
