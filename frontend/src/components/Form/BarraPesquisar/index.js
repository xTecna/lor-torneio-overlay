import React from 'react';

const BarraPesquisar = ({name, query, funcaoMuda}) => {
	return (
		<>
			<label htmlFor={`pesquisar_${name}`}>Pesquisar:</label>
			<input type="text" name={`pesquisar_${name}`} value={query}
				   onChange={(e) => funcaoMuda(e.target.value)}/>
		</>
	);
};

export default BarraPesquisar;