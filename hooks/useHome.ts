import { marketService } from "@/services/market-service";
import type { HomeCategory, PopularAsset } from "@/types/market";
import { buildCategoryMap } from "@/utils/market";
import { useEffect, useMemo, useState } from "react";

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
