import React from 'react';

import {BarraPesquisa} from './style.js';

const BarraPesquisar = ({name, query, funcaoMuda}) => {
	return (
		<BarraPesquisa>
			<label htmlFor={`pesquisar_${name}`}>Pesquisar:</label>
			<input type="text" name={`pesquisar_${name}`} value={query}
				   onChange={(e) => funcaoMuda(e.target.value)}/>
		</BarraPesquisa>
	);
};

export default BarraPesquisar;