import React from 'react';
import { FaStopwatch, FaPlay, FaPause, FaStop } from 'react-icons/fa';

import {useTime} from '../../../../context/Time';

import {Buttons, Button} from './style.js';

const ControleCronometro = () => {
	const { time, setTime } = useTime();
	const { tempo, temporizador } = time;
	
	return (
		<>
			<p><FaStopwatch/> Cronômetro:</p><br/>
			<Buttons>
				<Button className="botao-relogio" onClick={() => setTime({...time, temporizador: !temporizador})}>{temporizador ? <FaPause/> : <FaPlay/>}</Button>
				{(temporizador || tempo !== 0) && <Button className="botao-relogio" onClick={() => setTime({tempo: 0, temporizador: false})}><FaStop/></Button>}
			</Buttons>
		</>
	);
};

export default ControleCronometro;