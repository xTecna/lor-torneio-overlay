import React, {useMemo} from 'react';
import DataTable from 'react-data-table-component';
import { FaTrash, FaPencilAlt, FaEye } from 'react-icons/fa';

import {useSaveState} from '../../../../context/SaveState';

import {Time} from './style';

function renderTime(time, index){
	return (
		<Time key={index}>
			<img className="logo" src={time.url_logo} alt={time.nome}/>
			<span>{time.nome}</span>
		</Time>
	);
}

const TabelaPartidas = ({partidaQuery, apresentaFormulario}) => {

	const { saveState, setSaveState } = useSaveState();
	const { partidas } = saveState;

	function deletaPartida(index){
		const novo = partidas.filter((p, i) => index !== i);
		setSaveState({...saveState, partidas: novo});
	}
	
	function mudaPartidaAtual(row){
		setSaveState({...saveState, jogador1: row.jogador1, jogador2: row.jogador2});
	}

	const colunasPartidas = [
		{
			name: 'Excluir',
			selector: 'excluir',
			sortable: false,
			cell: (row, index) => <button className="botao-excluir" onClick={() => deletaPartida(index)}><FaTrash/></button>,
			center: true
		},
		{
			name: 'Editar',
			selector: 'editar',
			sortable: false,
			cell: (row, index) => <button className="botao-editar" onClick={() => apresentaFormulario(index)}><FaPencilAlt/></button>,
			center: true
		},
		{
			name: 'Round',
			selector: 'round',
			sortable: true,
			right: true
		},
		{
			name: 'Time 1',
			selector: 'time1',
			sortable: true,
			cell: row => renderTime(row.jogador1.time),
			right: true
		},
		{
			name: 'Nome 1',
			selector: 'nome1',
			sortable: true,
			cell: row => <span>{row.jogador1.nome}</span>
		},
		{
			name: 'Time 2',
			selector: 'time2',
			sortable: true,
			cell: row => renderTime(row.jogador2.time),
			right: true
		},
		{
			name: 'Nome 2',
			selector: 'nome2',
			sortable: true,
			cell: row => <span>{row.jogador2.nome}</span>
		},
		{
			name: 'Partida Atual',
			selector: 'partida_atual',
			sortable: false,
			cell: (row) => <button className="botao-jogador" onClick={() => mudaPartidaAtual(row)}><FaEye/></button>,
			center: true
		}
	];

	const partidasVisiveis = useMemo(() => partidas.filter((partida) =>
																partida.jogador1.nome.toLowerCase().includes(partidaQuery.toLowerCase()) ||
																partida.jogador2.nome.toLowerCase().includes(partidaQuery.toLowerCase())),
										[partidas, partidaQuery]);

	return (
		<DataTable
			noHeader
			pagination
			paginationPerPage={12}
			paginationRowsPerPageOptions={[12, 24, 36]}
			defaultSortField='round'
			columns={colunasPartidas}
			data={partidasVisiveis}
			noDataComponent='Não há partidas neste torneio.'
		/>
	);
};

export default TabelaPartidas;