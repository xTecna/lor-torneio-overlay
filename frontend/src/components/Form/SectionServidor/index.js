import React, {useRef, useState} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {FiExternalLink, FiCopy} from 'react-icons/fi';
import {FaRegEye, FaRegEyeSlash, FaPencilAlt, FaCheck} from 'react-icons/fa';
import {RiCloseLine} from 'react-icons/ri';

import {useSaveState} from '../../../context/SaveState';
import {useTime} from '../../../context/Time';

import {Section, SectionContent, MensagemErro} from '../style';
import {Botoes, Botao} from './style';

const SectionServidor = ({idServidor, setIdServidor, setDados}) => {
	const textRef = useRef(null);

	const {setSaveState} = useSaveState();
	const {time, setTime} = useTime();

	const [ mostrarEditar, setMostrarEditar ] = useState();
	const [ mostrarIdServidor, setMostrarIdServidor ] = useState();
	const [ novoIdServidor, setNovoIdServidor ] = useState();
	const [ mensagemErro, setMensagemErro ] = useState();

	function copiar(e) {
		textRef.current.select();
		document.execCommand('copy');
		e.target.focus();
	};

	function abrirFormulario(){
		setMostrarEditar(true);
	}

	async function validarId(){
		try{
			const response = await axios({
				method: 'get',
				url: `http://localhost:3030/${novoIdServidor}`
			});
			console.log(response);

			if (response.status === 200){
				setDados(response.data, time, setIdServidor, setSaveState, setTime);
				setNovoIdServidor('');
				setMensagemErro('');
				setMostrarEditar(false);
			}else{
				console.log('deu ruim');
				if (response.status === 404){
					setMensagemErro('O ID passado não corresponde a um registro válido.');
				}else{
					setMensagemErro('Ocorreu um erro.');
				}
			}
		}
		catch (err)
		{
			setMensagemErro('O ID passado não corresponde a um registro válido.');
		}
	}

	function fecharFormulario(){
		setNovoIdServidor('');
		setMensagemErro('');
		setMostrarEditar(false);
	}

	return (
		<Section>
			<SectionContent className="form-inline">
				<div>
					<label htmlFor="id_servidor">ID da sessão:</label>
					<input type={mostrarIdServidor ? "text" : "password"} id="id_servidor" value={idServidor} ref={textRef} readOnly/>
				</div>
				<Botoes>
					<Botao onClick={() => setMostrarIdServidor(!mostrarIdServidor)}>
						{mostrarIdServidor ? <FaRegEyeSlash/> : <FaRegEye/>}
					</Botao>
					<Link to={`/${idServidor}`} target='_blank'>
						<Botao><FiExternalLink/></Botao>
					</Link>
					<Botao onClick={(e) => copiar(e)}><FiCopy/></Botao>
					<Botao onClick={() => abrirFormulario()}><FaPencilAlt/></Botao>
				</Botoes>
				{mostrarEditar &&
				<>
					<div>
						<label htmlFor="novo_id_servidor">Novo ID da sessão:</label>
						<input type="text" id="novo_id_servidor" value={novoIdServidor}
							onChange={(e) => setNovoIdServidor(e.target.value)}/>
					</div>
					<Botao onClick={async () => await validarId()}><FaCheck/></Botao>
					<Botao onClick={() => fecharFormulario()}><RiCloseLine/></Botao>
					<MensagemErro>{mensagemErro}</MensagemErro>
				</>}
			</SectionContent>
		</Section>
	);
};

export default SectionServidor;