import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	container: {
		width: '100%',
		minHeight: 48,
		flexDirection: 'row',
		backgroundColor: '#99CC33',
		borderRadius: 64,
		position: 'relative',
		overflow: 'hidden',
	},
	button: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 64,
	},
	indicator: {
		position: 'absolute',
		backgroundColor: '#0A0A0A',
		borderRadius: 64,
	},
	text: {
		fontSize: 14,
		fontWeight: '500',
	},
	textActive: {
		color: 'white',
	},
	textInactive: {
		color: '#0A0A0A',
	},
});
