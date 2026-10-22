import type { LoadStatus } from "@/types/load-status";
import { useCallback, useEffect, useState } from "react";

// Runs an async loader on mount and exposes its status and a retry action.
// The loader must be stable (defined outside the component or memoized).
const useLoadable = <T,>(load: () => Promise<T>) => {
	const [data, setData] = useState<T | undefined>(undefined);
	const [status, setStatus] = useState<LoadStatus>("loading");
	const [requestId, setRequestId] = useState(0);

	useEffect(() => {
		let isActive = true;
		load()
			.then(result => {
				if (!isActive) return;
				setData(result);
				setStatus("success");
			})
			.catch(() => {
				if (isActive) setStatus("error");
			});
		return () => {
			isActive = false;
		};
	}, [load, requestId]);

	const retry = useCallback(() => {
		setStatus("loading");
		setRequestId(id => id + 1);
	}, []);

	return { data, status, retry };
};

export default useLoadable;
