import { marketService, PopularAsset } from "@/services/market-service";
import { useEffect, useMemo, useState } from "react";

export type HomeCategory = "Popular" | "Winners" | "Losers";

const buildCategoryMap = (popular: PopularAsset[]): Record<HomeCategory, PopularAsset[]> => ({
	Popular: popular,
	Winners: popular.filter(asset => asset.change.trim().startsWith('+')),
	Losers: popular.filter(asset => asset.change.trim().startsWith('-')),
});

const useHome = () => {
	const [popular, setPopular] = useState<PopularAsset[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [selectedCategory, setSelectedCategory] = useState<HomeCategory>("Popular");

	useEffect(() => {
		let isActive = true;
		marketService
			.getPopularAssets()
			.then(data => {
				if (isActive) setPopular(data);
			})
			.finally(() => {
				if (isActive) setIsLoading(false);
			});
		return () => {
			isActive = false;
		};
	}, []);

	const categoryMap = useMemo(() => buildCategoryMap(popular), [popular]);
	const assets = categoryMap[selectedCategory];

	return {
		assets,
		isLoading,
		setSelectedCategory,
	};
};

export default useHome;
