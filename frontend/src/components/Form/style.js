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

export const PesquisarImportar = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
`;