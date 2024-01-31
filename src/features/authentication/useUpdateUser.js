import { useMutation } from '@tanstack/react-query';
import { updateUser as updateUserApi } from '../../services/apiAuth';
import toast from 'react-hot-toast';

export function useUpdateUser() {
  const { mutate: updateUser, isLoading } = useMutation({
    mutationFn: updateUserApi,
    onSuccess: () => {
      toast.success('Your info was successfully updated');
    },
    onError: (err) => toast.error(err.message),
  });
  return { updateUser, isLoading };
}
