import { marketService } from "@/services/market-service";
import type { LoadStatus } from "@/types/load-status";
import type { HomeCategory, PopularAsset } from "@/types/market";
import { buildCategoryMap } from "@/utils/market";
import { useCallback, useEffect, useMemo, useState } from "react";

const useHome = () => {
	const [popular, setPopular] = useState<PopularAsset[]>([]);
	const [status, setStatus] = useState<LoadStatus>("loading");
	const [requestId, setRequestId] = useState(0);
	const [selectedCategory, setSelectedCategory] = useState<HomeCategory>("Popular");

	useEffect(() => {
		let isActive = true;
		marketService
			.getPopularAssets()
			.then(data => {
				if (!isActive) return;
				setPopular(data);
				setStatus("success");
			})
			.catch(() => {
				if (isActive) setStatus("error");
			});
		return () => {
			isActive = false;
		};
	}, [requestId]);

	const retry = useCallback(() => {
		setStatus("loading");
		setRequestId(id => id + 1);
	}, []);

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
