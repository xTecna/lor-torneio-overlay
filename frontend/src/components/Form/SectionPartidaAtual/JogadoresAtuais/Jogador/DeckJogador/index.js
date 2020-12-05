import React from 'react';
import { FaCheck, FaTrophy, FaThumbsDown } from 'react-icons/fa';
import { TiCancel } from 'react-icons/ti';

import {useSaveState} from '../../../../../../context/SaveState';

import {DeckJogador as DeckJogadorDiv, Deck, Regions, Region, Champions, Champion} from './style';
import ToggleButton from './ToggleButton';

function renderRegion(region, index){
	return <Region key={index}><img src={`http://dd.b.pvp.net/latest/core/en_us/img/regions/icon-${region}.png`} alt={region}/></Region>;
}

function renderChampion(champion, index){
	return <Champion key={index} img={`http://ddragon.leagueoflegends.com/cdn/10.15.1/img/champion/${champion.nome}.png`}>{champion.qtd}</Champion>;
}

function renderDeck(deck, index, jogadorIndex){
	return (
		<Deck htmlFor={`jogador${jogadorIndex}_atual${index}`}>
			<Regions>
				{deck.regions.map(renderRegion)}
			</Regions>
			<Champions>
				{deck.champions.map(renderChampion)}
			</Champions>
		</Deck>
	);
}

const DeckJogador = ({deck, index, jogadorIndex}) => {
	
	const { saveState, setSaveState } = useSaveState();
	const { atuais, bans, vitorias } = saveState;

	function toggleAtual(jogador, deck){
		if (!atuais[jogador][deck]){
			let novo = [...atuais];
			novo[jogador] = novo[jogador].map(() => false);
			novo[jogador][deck] = true;
			setSaveState({...saveState, atuais: novo});
		}
	}

	function toggleBan(jogador, deck){
		let novo = [...bans];
		novo[jogador][deck] = !novo[jogador][deck];
		setSaveState({...saveState, bans: novo});
	}

	function toggleVitoria(jogador, deck){
		let novo = [...vitorias];
		novo[jogador][deck] = !novo[jogador][deck];
		setSaveState({...saveState, vitorias: novo});
	}

	return (
		<DeckJogadorDiv>
			<input type="radio" id={`jogador${jogadorIndex}_atual${index}`} name={`jogador${jogadorIndex}_atual`} onChange={() => toggleAtual(jogadorIndex, index)} checked={atuais[jogadorIndex][index] ? "checked" : ""}></input>
			{renderDeck(deck, index, jogadorIndex)}
			<ToggleButton toggleFunction={toggleBan} jogador={jogadorIndex} posicao={index} matriz={bans} Simbolo1={<FaCheck />} Simbolo2={<TiCancel />} />
			<ToggleButton toggleFunction={toggleVitoria} jogador={jogadorIndex} posicao={index} matriz={vitorias} Simbolo1={<FaThumbsDown />} Simbolo2={<FaTrophy />} />
		</DeckJogadorDiv>
	);
};

export default DeckJogador;