import useLoadable from "@/hooks/useLoadable";
import { marketService } from "@/services/market-service";
import type { HomeCategory, PopularAsset } from "@/types/market";
import { buildCategoryMap } from "@/utils/market";
import { useMemo, useState } from "react";

const EMPTY_ASSETS: PopularAsset[] = [];
const loadPopularAssets = () => marketService.getPopularAssets();

const useHome = () => {
	const { data: popular = EMPTY_ASSETS, status, retry } = useLoadable(loadPopularAssets);
	const [selectedCategory, setSelectedCategory] = useState<HomeCategory>("Popular");

	const categoryMap = useMemo(() => buildCategoryMap(popular), [popular]);
	const assets = categoryMap[selectedCategory];

	return {
		assets,
		status,
		retry,
		setSelectedCategory,
	};
};

export default useHome;
