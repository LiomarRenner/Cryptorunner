import { View } from 'react-native'
import React from 'react'
import { ReactNode } from 'react';

type CContainerProps = {
	children: ReactNode;
};

export default function CContainer({ children }: CContainerProps) {
	return (
		<View
			style={{
				flex: 1,
				alignItems: 'center',
				justifyContent: 'center',
				backgroundColor: '#BCFF31',
			}}
		>
			{children}
		</View>
	);
}
