import { View } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';

type BaseIconProps = {
	name: React.ComponentProps<typeof Ionicons>['name'];
	color: string;
	backgroundColor?: string;
	size?: number;
};

export default function BaseIcon(props: BaseIconProps) {
	return (
		<View
			style={{
				width: 44,
				height: 44,
				borderRadius: 22,
				backgroundColor: props.backgroundColor ? props.backgroundColor : '#0A0A0A',
				alignItems: 'center',
				justifyContent: 'center',
				opacity: props.color === '#BCFF31' ? 1 : 0.5,
			}}>
			<Ionicons size={props.size ? props.size : 28} {...props} />
		</View>
	);
}
