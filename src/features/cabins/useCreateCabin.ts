import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { createEditCabin } from '../../services/apiCabins';
import type { Cabin } from '../../types';
import type { CabinApiData } from './types';

export default function useCreateCabin() {
   const queryClient = useQueryClient();

   const { isPending, mutate } = useMutation<Cabin, Error, CabinApiData>({
      mutationFn: (newCabinData) => createEditCabin(newCabinData),

      onSuccess: () => {
         toast.success('New cabin successfully created');
         queryClient.invalidateQueries({ queryKey: ['cabins'] });
      },

      onError: (err: Error) => toast.error(err.message),
   });

   return { isCreating: isPending, createCabin: mutate };
}
