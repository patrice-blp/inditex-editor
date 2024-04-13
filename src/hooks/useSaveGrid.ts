import fetcher from "@/common/libs/fetcher";
import useSWRMutation from "swr/mutation";
import { useCallback } from "react";

type Arg = { arg: Record<string, any> };
async function sendRequest(url: string, { arg }: Arg) {
  return fetcher(url, {
    method: "POST",
    body: JSON.stringify(arg),
  });
}

export default function useSaveGrid() {
  const { trigger, isMutating } = useSWRMutation("/api/templates", sendRequest);

  const saveGrid = useCallback(async (data: object) => {
    try {
      await trigger(data);
      alert("Parilla guardada");
    } catch (e) {
      alert("Error");
    }
  }, []);

  return {
    saveGrid,
    isMutating,
  };
}
