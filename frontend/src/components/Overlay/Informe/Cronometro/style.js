import styled from 'styled-components';

export const Tempo = styled.p`
	font-size: 2.5vh;
	color: ${props =>
		{
			switch(props.limite)
			{
				case 0:	return '#FFFFFF';
				case 1: return '#FFFF00';
				case 2: return '#FF0000';
				default: return '#FFFFFF';
			}
		}
	};
	text-align: center;
`;