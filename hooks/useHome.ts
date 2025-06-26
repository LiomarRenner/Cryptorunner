import popularAssets, { PopularAsset } from "@/mocks/popularAssets";
import { useEffect, useState } from "react";

export type HomeCategory = "Popular" | "Winners" | "Losers";

const useHome = () => {
	const popular = popularAssets;
	const winners = popular.filter(asset => asset.change.trim().startsWith('+'));
	const losers = popular.filter(asset => asset.change.trim().startsWith('-'));
	const categoryMap: Record<HomeCategory, PopularAsset[]> = {
		Popular: popular,
		Winners: winners,
		Losers: losers,
	};

	const [editableData, setEditableData] = useState<PopularAsset[]>(popular);
	const [selectedCategory, setSelectedCategory] = useState<HomeCategory>("Popular");

	useEffect(() => {
		setEditableData(categoryMap[selectedCategory] || popular);
	}, [selectedCategory]);

	return {
		editableData,
		setSelectedCategory,
	}
};

export default useHome;
