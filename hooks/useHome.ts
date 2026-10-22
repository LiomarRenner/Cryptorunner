import popularAssets, { PopularAsset } from "@/mocks/popularAssets";
import { useState } from "react";

export type HomeCategory = "Popular" | "Winners" | "Losers";

// The mock list is static, so the category buckets are computed once.
const categoryMap: Record<HomeCategory, PopularAsset[]> = {
	Popular: popularAssets,
	Winners: popularAssets.filter(asset => asset.change.trim().startsWith('+')),
	Losers: popularAssets.filter(asset => asset.change.trim().startsWith('-')),
};

const useHome = () => {
	const [selectedCategory, setSelectedCategory] = useState<HomeCategory>("Popular");

	const assets = categoryMap[selectedCategory];

	return {
		assets,
		setSelectedCategory,
	};
};

export default useHome;
