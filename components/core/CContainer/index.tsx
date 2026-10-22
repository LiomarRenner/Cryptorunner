import { StyleSheet, View } from 'react-native'
import React, { ReactNode } from 'react'
import { themes } from '@/theme/themes'

type CContainerProps = {
	children: ReactNode;
};

export default function CContainer({ children }: CContainerProps) {
	return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: themes.colors.primary_green,
	},
});
