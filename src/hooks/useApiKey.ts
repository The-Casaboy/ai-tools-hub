import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useApiKey = (provider: string) => {
  return useQuery({
    queryKey: ["apiKey", provider],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("api_keys")
        .select("api_key")
        .eq("provider", provider)
        .single();

      if (error) throw error;
      return data?.api_key;
    },
  });
};