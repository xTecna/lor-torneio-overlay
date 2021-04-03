import React from "react";
import { CgCloseO } from "react-icons/cg";

import {
  JanelaErro as JanelaErroDiv,
  MensagensErro,
  MensagemErroDetalhes,
  MensagemErro,
  Detalhes,
  BotaoFechar,
} from "./style";

const JanelaErro = ({ erros, setErros }) => {
  return (
    <JanelaErroDiv>
      <MensagensErro>
        {erros.map((erro, index) => {
          if (erro.detalhes) {
            return (
              <MensagemErroDetalhes key={index}>
                <MensagemErro>{erro.mensagem}</MensagemErro>
                <Detalhes
                  href={erro.detalhes}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Mais Detalhes
                </Detalhes>
              </MensagemErroDetalhes>
            );
          } else {
            return <MensagemErro>{erro.mensagem}</MensagemErro>;
          }
        })}
      </MensagensErro>
      <BotaoFechar onClick={() => setErros([])}>
        <CgCloseO />
      </BotaoFechar>
    </JanelaErroDiv>
  );
};

export default JanelaErro;
