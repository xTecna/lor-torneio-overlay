import styled from 'styled-components';

export const Campo = styled.div`
	display: flex;
	flex-direction: row;
`;

export const Barra = styled.input`
	width: 40vw;
`;

export const Botoes = styled.div`
	width: 50%;

	display: flex;
	flex-direction: row;
	justify-content: space-between;
`;

export const Botao = styled.button`
	width: 10vw;
	height: 4vh;
	border: 0.25vh solid #000000;
	margin: 0.5vh;
	font-weight: bold;
	border-radius: 1vh;
`;

export const MensagemErroDetalhes = styled.div`
	display: flex;
`;

export const Detalhes = styled.a`
	margin-left: 1vw;
	color: #ff0000;
`;