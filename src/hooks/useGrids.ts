import fetcher from "@/common/libs/fetcher";
import useSWR from "swr";
import { GridResponse } from "@/common/types";

export default function useGrids() {
  const { data, error, isLoading } = useSWR<GridResponse[]>(
    `/api/templates`,
    fetcher,
  );

  return {
    data,
    error,
    isLoading,
  };
}
