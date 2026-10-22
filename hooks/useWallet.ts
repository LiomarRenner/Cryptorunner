import useLoadable from "@/hooks/useLoadable";
import { marketService } from "@/services/market-service";
import { computeAllocation } from "@/utils/wallet";
import { useMemo } from "react";

const loadWalletSummary = () => marketService.getWalletSummary();

const useWallet = () => {
	const { data: summary, status, retry } = useLoadable(loadWalletSummary);

	const allocation = useMemo(
		() => (summary ? computeAllocation(summary.holdings) : []),
		[summary]
	);

	return {
		summary,
		allocation,
		status,
		retry,
	};
};

export default useWallet;
