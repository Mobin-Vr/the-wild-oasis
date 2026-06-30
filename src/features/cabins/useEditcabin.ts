import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { CabinApiData } from './types';
import { createEditCabin } from '../../services/apiCabins';
import toast from 'react-hot-toast';

type EditCabinVariables = {
   newCabinData: CabinApiData;
   id: number;
};

export default function useEditCabin() {
   const queryClient = useQueryClient();

   const { isPending, mutate } = useMutation<
      CabinApiData,
      Error,
      EditCabinVariables
   >({
      mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),

      onSuccess: () => {
         toast.success('Cabin successfully edited');
         queryClient.invalidateQueries({ queryKey: ['cabins'] });
      },

      onError: (err: Error) => toast.error(err.message),
   });

   return { isEditing: isPending, editCabin: mutate };
}
