import React, {useMemo} from 'react';
import DataTable from 'react-data-table-component';
import { FaTrash, FaPencilAlt } from 'react-icons/fa';

import {useSaveState} from '../../../../context/SaveState';

const TabelaTimes = ({timeQuery, apresentaFormulario}) => {

	const { saveState, setSaveState } = useSaveState();
	const { jogadores, times } = saveState;

	function deletaTime(nome){
		const novoJogadores = jogadores.map((jogador) => {
			if (jogador.time.nome === nome){
				return {...jogador, time: {nome: '', url_logo: ''}};
			}else{
				return jogador;
			}
		});
		const novo = times.filter((time) => time.nome !== nome);
		setSaveState({...saveState, jogadores: novoJogadores, times: novo});
	}

	const colunasTimes = [
		{
			name: 'Excluir',
			selector: 'excluir',
			sortable: false,
			cell: (row) => <button className="botao-excluir" onClick={() => deletaTime(row.nome)}><FaTrash/></button>,
			center: true
		},
		{
			name: 'Editar',
			selector: 'editar',
			sortable: false,
			cell: (row) => <button className="botao-editar" onClick={() => apresentaFormulario(row.nome)}><FaPencilAlt/></button>,
			center: true
		},
		{
			name: 'Logo',
			selector: 'logo',
			sortable: true,
			cell: row => <img className="logo" src={row.url_logo} alt={row.name}/>,
			right: true
		},
		{
			name: 'Nome',
			selector: 'nome',
			sortable: true
		}
	];

	const timesVisiveis = useMemo(() => times.filter((time) => time.nome.toLowerCase().includes(timeQuery.toLowerCase())),
										[times, timeQuery]);

	return (
		<DataTable
			noHeader
			pagination
			paginationPerPage={12}
			paginationRowsPerPageOptions={[12, 24, 36]}
			defaultSortField='nome'
			columns={colunasTimes}
			data={timesVisiveis}
			noDataComponent='Não há times neste torneio.'
		/>
	);
};

export default TabelaTimes;