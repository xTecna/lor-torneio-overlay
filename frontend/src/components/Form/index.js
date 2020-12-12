import React from 'react';

import {Form as FormDiv} from './style';
import SectionCreditos from './SectionCreditos';
import SectionServidor from './SectionServidor';
import SectionPreferencias from './SectionPreferencias';
import SectionDadosTorneio from './SectionDadosTorneio';
import SectionPartidaAtual from './SectionPartidaAtual';
import SectionPartidas from './SectionPartidas';
import SectionParticipantes from './SectionParticipantes';
import SectionTimes from './SectionTimes';

const Form = ({idServidor, setIdServidor, setDados}) => {

	return (
		<FormDiv className="form">
			<SectionCreditos/>
			<SectionServidor idServidor={idServidor} setIdServidor={setIdServidor} setDados={setDados}/>
			<SectionPreferencias/>
			<SectionDadosTorneio/>
			<SectionPartidaAtual/>
			<SectionPartidas/>
			<SectionParticipantes/>
			<SectionTimes/>
		</FormDiv>
	)
}

export default Form;