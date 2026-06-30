import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCabin } from '../../services/apiCabins';
import toast from 'react-hot-toast';
import type { Cabin } from '../../types';

export default function useDeleteCabin() {
   const queryClient = useQueryClient();

   const { isPending, mutate } = useMutation<Cabin[], Error, number>({
      mutationFn: deleteCabin,
      onSuccess: () => {
         toast.success('Cabin successfully deleted');
         // Invalidate cabins cache to trigger refetch
         queryClient.invalidateQueries({ queryKey: ['cabins'] });
      },

      onError: (err: Error) => toast.error(err.message),
   });

   return { isDeleting: isPending, deleteCabin: mutate };
}
