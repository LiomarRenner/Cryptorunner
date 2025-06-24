import React, { useCallback, useMemo, useState } from 'react';
import { View, Text, Pressable, LayoutChangeEvent } from 'react-native';
import Animated, {
	useSharedValue,
	useAnimatedStyle,
	withTiming,
} from 'react-native-reanimated';
import { styles } from './styles';

type SegmentedToggleProps = {
	options: string[];
	onChange?: (selected: string) => void;
	initial?: string;
};

export default function SegmentedToggle({
	options,
	onChange,
	initial,
}: SegmentedToggleProps) {
	const [selected, setSelected] = useState<string>(initial || options[0]);

	const indicatorX = useSharedValue(0);
	const segmentWidth = useSharedValue(0);

	const handlePress = useCallback(
		(option: string, index: number) => {
			setSelected(option);
			onChange?.(option);
			indicatorX.value = withTiming(index * segmentWidth.value, { duration: 300 });
		},
		[onChange, segmentWidth, indicatorX]
	);

	const onLayoutSegment = useCallback(
		(e: LayoutChangeEvent) => {
			segmentWidth.value = e.nativeEvent.layout.width / options.length;
		},
		[options.length, segmentWidth]
	);

	const animatedIndicatorStyle = useAnimatedStyle(() => ({
		transform: [{ translateX: indicatorX.value }],
		width: segmentWidth.value,
		height: '100%',
	}));

	const renderOption = useCallback(
		(option: string, index: number) => {
			const isActive = option === selected;
			return (
				<Pressable
					key={option}
					style={styles.button}
					onPress={() => handlePress(option, index)}
				>
					<Text style={[styles.text, isActive ? styles.textActive : styles.textInactive]}>
						{option}
					</Text>
				</Pressable>
			);
		},
		[handlePress, selected]
	);

	const optionsList = useMemo(
		() => options.map(renderOption),
		[options, renderOption]
	);

	return (
		<View style={styles.container} onLayout={onLayoutSegment}>
			<Animated.View style={[styles.indicator, animatedIndicatorStyle]} />
			{optionsList}
		</View>
	);
};
