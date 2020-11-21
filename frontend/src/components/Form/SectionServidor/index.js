import React, {useRef} from 'react';
import {Link} from 'react-router-dom';
import {FiExternalLink, FiCopy} from 'react-icons/fi';

import {Section, SectionContent} from '../style';
import {Botoes, Botao} from './style';

const SectionServidor = ({idServidor}) => {
	const textRef = useRef(null);

	function copiar(e) {
		textRef.current.select();
		document.execCommand('copy');
		e.target.focus();
	};

	return (
		<Section>
			<SectionContent className="form-inline">
				<div>
					<label htmlFor="id_servidor">ID da sessão:</label>
					<input type="text" id="id_servidor" value={idServidor} ref={textRef} readOnly/>
				</div>
					<Botoes>
						<Link to={`/${idServidor}`} target='_blank'>
							<Botao><FiExternalLink/></Botao>
						</Link>
						<Botao onClick={(e) => copiar(e)}><FiCopy/></Botao>
					</Botoes>
			</SectionContent>
		</Section>
	);
};

export default SectionServidor;