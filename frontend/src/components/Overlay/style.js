import styled from 'styled-components';

export const Overlay = styled.div`
	width: ${props => props.theme.webcamSize*2}vh;
	height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`;