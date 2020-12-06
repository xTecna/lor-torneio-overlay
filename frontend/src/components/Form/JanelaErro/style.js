import styled from 'styled-components';

export const JanelaErro = styled.div`
	max-height: 25vh;

	padding: 1vh;

	display: flex;
	flex-direction: row;
	justify-content: space-between;

	border: 0.5vh #ff0000 solid;
	border-radius: 2vh;

	color: #ff0000;
`;

export const MensagensErro = styled.div`
	width: 90%;

	overflow-y: auto;

	display: flex;
	flex-direction: column;
`;

export const MensagemErroDetalhes = styled.div`
	display: flex;
	flex-direction: row;
`;

export const MensagemErro = styled.p`
	font-weight: bold;
`;

export const Detalhes = styled.a`
	margin-left: 1vw;
`;

export const BotaoFechar = styled.div`
	cursor: pointer;
`;