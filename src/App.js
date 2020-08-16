import React, {useState} from 'react';
import {ThemeProvider} from 'styled-components';

import Overlay from './components/Overlay';
import {Form} from './style';

const theme = {
	webcamSize: 20
};

const App = () => {
	const [ nomeTorneio, setNomeTorneio ] = useState('');
	
	return (
		<div id="content">
			<ThemeProvider theme={theme}>
				<Overlay className="overlay" nome={nomeTorneio}/>
				<Form>
					<div id="dados_torneio">
						<h3>Dados do Torneio</h3>
						<label for="nome_torneio">Nome do torneio:</label>
						<input type="text" id="nome_torneio" onChange={e => setNomeTorneio(e.target.value)}></input>
					</div>
				</Form>
			</ThemeProvider>
		</div>
	)
}

export default App;
