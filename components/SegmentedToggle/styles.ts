import { StyleSheet } from 'react-native';
import { themes } from '@/theme/themes';

const { colors, shape, fontSize } = themes;

export const styles = StyleSheet.create({
	container: {
		width: '100%',
		minHeight: 48,
		flexDirection: 'row',
		backgroundColor: colors.accent_muted,
		borderRadius: shape.pill,
		position: 'relative',
		overflow: 'hidden',
	},
	button: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: shape.pill,
	},
	indicator: {
		position: 'absolute',
		backgroundColor: colors.deep_black,
		borderRadius: shape.pill,
	},
	text: {
		fontSize: fontSize.sm,
		fontWeight: '500',
	},
	textActive: {
		color: colors.white,
	},
	textInactive: {
		color: colors.deep_black,
	},
});
