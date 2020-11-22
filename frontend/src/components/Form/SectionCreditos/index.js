import React from 'react';
import {FaGithub, FaTwitch, FaTwitter, FaDiscord} from 'react-icons/fa';

import {Section} from '../style';
import {Creditos, RedesSociais} from './style';

const SectionCreditos = () => {
	return (
		<Section>
			<Creditos>
				<p>Feito com <span role="img" aria-label="amor">❤️</span> por xTecna.</p>
				<RedesSociais>
					<a href="https://github.com/xTecna/lor-torneio-overlay" target="_blank" rel="noopener noreferrer"><FaGithub/></a>
					<a href="https://www.twitch.tv/xtecna" target="_blank" rel="noopener noreferrer"><FaTwitch/></a>
					<a href="https://www.twitter.com/WNXTecna" target="_blank" rel="noopener noreferrer"><FaTwitter/></a>
					<a href="https://discord.gg/7UfQTkc" target="_blank" rel="noopener noreferrer"><FaDiscord/></a>
				</RedesSociais>
			</Creditos>
		</Section>
	);
};

export default SectionCreditos;