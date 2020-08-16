import styled from 'styled-components';

export const JogadorDecks = styled.div`
	display: flex;
	flex-direction: column;
`;

export const Jogador = styled.div`
	display: flex;
	flex-direction: row;
`;

export const Decks = styled.div`
	display: flex;
	flex-direction: row;
	width: ${props => props.theme.webcamSize*2}vh;
	height: ${props => props.theme.webcamSize*0.35}vh;
`;