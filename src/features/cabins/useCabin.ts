import { useQuery } from '@tanstack/react-query';
import type { Cabin } from '../../types';
import { getCabins } from '../../services/apiCabins';

export default function useCabin() {
   const { isLoading, data, error } = useQuery<Cabin[]>({
      queryKey: ['cabins'],
      queryFn: getCabins,
   });

   return { isLoading, cabins: data, error };
}
