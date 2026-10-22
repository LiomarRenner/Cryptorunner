import { StyleSheet, View } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { themes } from '@/theme/themes';

type BaseIconProps = {
	name: React.ComponentProps<typeof Ionicons>['name'];
	color: string;
	backgroundColor?: string;
	size?: number;
};

const DEFAULT_ICON_SIZE = 28;
const CONTAINER_SIZE = 44;

export default function BaseIcon(props: BaseIconProps) {
	return (
		<View
			style={[
				styles.circle,
				{
					backgroundColor: props.backgroundColor ? props.backgroundColor : themes.colors.deep_black,
					opacity: props.color === '#BCFF31' ? 1 : 0.5,
				},
			]}>
			<Ionicons size={props.size ? props.size : DEFAULT_ICON_SIZE} {...props} />
		</View>
	);
}

const styles = StyleSheet.create({
	circle: {
		width: CONTAINER_SIZE,
		height: CONTAINER_SIZE,
		borderRadius: CONTAINER_SIZE / 2,
		alignItems: 'center',
		justifyContent: 'center',
	},
});
