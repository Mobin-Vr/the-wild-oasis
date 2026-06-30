import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { updateSetting as updateSettingApi } from '../../services/apiSettings';
import type { Settings, SettingsUpdate } from '../../types';

export default function useEditSetting() {
   const queryClient = useQueryClient();

   const { isPending, mutate } = useMutation<Settings, Error, SettingsUpdate>({
      mutationFn: updateSettingApi,

      onSuccess: () => {
         toast.success('Setting successfully edited');
         queryClient.invalidateQueries({ queryKey: ['settings'] });
      },

      onError: (err: Error) => toast.error(err.message),
   });

   return { isUpdating: isPending, updateSetting: mutate };
}
