import { useQuery } from '@tanstack/react-query';
import { getSettings } from '../../services/apiSettings';
import type { Settings } from '../../types';

export default function useSettings() {
   const { isLoading, data, error } = useQuery<Settings>({
      queryKey: ['settings'],
      queryFn: getSettings,
   });

   return { isLoading, settings: data, error };
}
