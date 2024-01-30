import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { deleteBooking as deleteBookingApi } from '../../services/apiBookings';

export function useDeleteBooking() {
  const queryClient = useQueryClient();
  const { mutate: deleteBooking, isLoading: isDeleting } = useMutation({
    mutationFn: (bookingId) => deleteBookingApi(bookingId),
    onSuccess: () => {
      toast.success(`Booking was successfully deleted`);
      queryClient.invalidateQueries(['bookings']);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { deleteBooking, isDeleting };
}
