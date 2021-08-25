import React, { useState } from "react";

import { useSaveState } from "../../../context/SaveState";

import SectionTitle from "../SectionTitle";
import { Section, SectionContent, PesquisarImportar } from "../style";
import BarraPesquisar from "../BarraPesquisar";
import ImportacaoParticipantes from "./ImportacaoParticipantes";
import JanelaErro from "../JanelaErro";
import TabelaParticipantes from "./TabelaParticipantes";
import FormularioParticipante from "./FormularioParticipante";

const SectionParticipantes = () => {
  const regraFuncao = {
    Cardlock: checkCardlock,
    Regionlock: checkRegionlock,
    Riotlock: checkRiotlock,
  };

  function checkCardlock(decks) {
    const allCardCodes = decks.flatMap((deck) =>
      deck.cards.map((card) => card.code)
    );
    const cards = [...new Set(allCardCodes)];

    return allCardCodes.length === cards.length;
  }

  function checkRegionlock(decks) {
    const allRegions = decks.flatMap((deck) => deck.regions);
    const regions = [...new Set(allRegions)];

    return allRegions.length === regions.length;
  }

  function checkRiotlock(decks) {
    const allChampions = decks.flatMap((deck) =>
      deck.champions.flatMap((champion) => champion.nome)
    );
    const champions = [...new Set(allChampions)];

    const allRegions = decks.map((deck) => deck.regions.sort().join(""));
    const regions = [...new Set(allRegions)];

    return (
      allChampions.length === champions.length &&
      allRegions.length === regions.length &&
      decks.reduce(
        (acc, current) => (current.champions.length === 0 ? acc + 1 : acc),
        0
      ) < 2
    );
  }

  const { saveState } = useSaveState();
  const { jogadores } = saveState;

  const [mostrar, setMostrar] = useState(true);
  const [jogadorQuery, setJogadorQuery] = useState("");
  const [mostrarEditar, setMostrarEditar] = useState(false);
  const [jogadorAntigo, setJogadorAntigo] = useState({
    nome: "",
    time: { nome: "", url_logo: "" },
    decks: [
      { code: "", regions: [], champions: [] },
      { code: "", regions: [], champions: [] },
      { code: "", regions: [], champions: [] },
    ],
  });

  const [errosImportacao, setErrosImportacao] = useState([]);

  function buscaJogador(nome) {
    return jogadores.find((jogador) => jogador.nome === nome);
  }

  function apresentaFormulario(nome) {
    const jogador = buscaJogador(nome);

    if (jogador) {
      setJogadorAntigo(jogador);
      setMostrarEditar(true);
    }
  }

  return (
    <Section>
      <SectionTitle mostrar={mostrar} toggleMostrar={setMostrar}>
        Participantes
      </SectionTitle>
      {mostrar && (
        <SectionContent>
          <PesquisarImportar>
            <BarraPesquisar
              name={"jogador"}
              query={jogadorQuery}
              funcaoMuda={setJogadorQuery}
            />
            <ImportacaoParticipantes
              regraFuncao={regraFuncao}
              funcaoErro={setErrosImportacao}
            />
          </PesquisarImportar>
          {errosImportacao.length > 0 && (
            <JanelaErro erros={errosImportacao} setErros={setErrosImportacao} />
          )}
          <TabelaParticipantes
            jogadorQuery={jogadorQuery}
            apresentaFormulario={apresentaFormulario}
          />
          {mostrarEditar && (
            <FormularioParticipante
              titulo={`Editar Participante ${jogadorAntigo.nome}`}
              mensagemClica="Editar jogador"
              regraFuncao={regraFuncao}
              mostrar={mostrarEditar}
              setMostrar={setMostrarEditar}
              jogadorAntigo={jogadorAntigo}
            />
          )}
          <FormularioParticipante
            titulo="Novo Participante"
            mensagemClica="Cadastrar novo jogador"
            regraFuncao={regraFuncao}
            mostrar={undefined}
            setMostrar={undefined}
            jogadorAntigo={undefined}
          />
        </SectionContent>
      )}
    </Section>
  );
};

export default SectionParticipantes;
