import React, {createContext, useState, useContext} from 'react';

const TimeContext = createContext();

export default function TimeProvider({children}){
	const [time, setTime] = useState({
		temporizador: false,
		tempo: 0
	});

	return (
		<TimeContext.Provider value={{time, setTime}}>
			{children}
		</TimeContext.Provider>
	);
};

export const useTime = () => {
	const context = useContext(TimeContext);
	const { time, setTime } = context;

	return { time, setTime };
};