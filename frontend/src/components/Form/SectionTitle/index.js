import React from 'react';
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti';

import { SectionTitle as SectionTitleDiv } from './style';

const SectionTitle = ({title, click, simbolo}) => {
	return (
		<SectionTitleDiv onClick={click}>
			<h3>{title}</h3>
			<span>{ simbolo ? <TiArrowSortedUp/> : <TiArrowSortedDown/>}</span>
		</SectionTitleDiv>
	);
};

export default SectionTitle;