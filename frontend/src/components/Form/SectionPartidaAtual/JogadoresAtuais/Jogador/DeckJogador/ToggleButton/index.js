import React from 'react';

import {Button} from './style';

const ToggleButton = ({toggleFunction, jogador, posicao, matriz, Simbolo1, Simbolo2}) => {
	return (
		<Button onClick={() => toggleFunction(jogador, posicao)}>{matriz[jogador][posicao] ? Simbolo1 : Simbolo2}</Button>
	);
};

export default ToggleButton;