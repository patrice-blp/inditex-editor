import fetcher from "@/common/libs/fetcher";
import useSWR from "swr";
import { Product } from "@/common/types";

const ids = Array.from({ length: 10 }, (_, i) => i + 1);

export default function useProducts() {
  const { data, error, isLoading } = useSWR<Product[]>(
    `/api/products?ids=${ids}`,
    fetcher,
  );

  return {
    data,
    error,
    isLoading,
  };
}
