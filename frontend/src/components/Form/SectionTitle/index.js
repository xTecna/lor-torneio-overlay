import React from 'react';
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti';

import { SectionTitle as SectionTitleDiv } from './style';

const SectionTitle = ({children, mostrar, toggleMostrar}) => {
	return (
		<SectionTitleDiv onClick={() => toggleMostrar(!mostrar)}>
			<h3>{children}</h3>
			<span>{ mostrar ? <TiArrowSortedUp/> : <TiArrowSortedDown/>}</span>
		</SectionTitleDiv>
	);
};

export default SectionTitle;