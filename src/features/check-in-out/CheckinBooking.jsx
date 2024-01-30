import styled from 'styled-components';
import BookingDataBox from '../../features/bookings/BookingDataBox';

import Row from '../../ui/Row';
import Heading from '../../ui/Heading';
import ButtonGroup from '../../ui/ButtonGroup';
import Button from '../../ui/Button';
import ButtonText from '../../ui/ButtonText';

import { useMoveBack } from '../../hooks/useMoveBack';
import { useBooking } from '../bookings/useBooking';
import Spinner from '../../ui/Spinner';
import { useEffect, useState } from 'react';
import Checkbox from '../../ui/Checkbox';
import { formatCurrency } from '../../utils/helpers';
import { useCheckIn } from './useCheckIn';
import SpinnerMini from '../../ui/SpinnerMini';
import { useSettings } from '../settings/useSettings';
import Input from '../../ui/Input';
import FormRow from '../../ui/FormRow';

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);
  const [breakfastCount, setBreakfastCount] = useState(0);
  const [error, setError] = useState('');
  const { booking, isLoading } = useBooking();
  const { settings, isLoading: isLoadingSettings } = useSettings();

  useEffect(
    function () {
      setConfirmPaid(booking?.isPaid ?? false);
    },
    [booking.isPaid]
  );

  const moveBack = useMoveBack();
  const { checkIn, isCheckingIn } = useCheckIn();

  if (isLoading || isLoadingSettings) return <Spinner />;

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  const optionalBreakfastPrice =
    settings?.breakfastPrice * numNights * breakfastCount || 0;

  function handleCheckin() {
    if (!confirmPaid) return;
    if (addBreakfast) {
      checkIn({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extraPrice: optionalBreakfastPrice,
          totalPrice: totalPrice + optionalBreakfastPrice,
          breakfastCount,
        },
      });
    } else checkIn(bookingId);
  }

  function handleConfirm() {
    if (addBreakfast) {
      if (breakfastCount < 1 || breakfastCount > numGuests) {
        setError(`Number of breakfasts should be between 1 and ${numGuests}`);
        return;
      } else {
        setError('');
        setConfirmPaid((confirm) => !confirm);
      }
    }
  }
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && (
        <Box>
          <Checkbox
            onChange={() => {
              setAddBreakfast((add) => !add);
              setConfirmPaid(false);
              setBreakfastCount(0);
            }}
            id="add-breakfast"
            disabled={isCheckingIn}
          >
            Want to add breakfast for{' '}
            {optionalBreakfastPrice === 0
              ? `${formatCurrency(settings?.breakfastPrice)} per guest`
              : formatCurrency(optionalBreakfastPrice)}
            ?
          </Checkbox>
          {addBreakfast && (
            <FormRow
              label="How many guests will have breakfast: "
              error={error}
            >
              <Input
                type="number"
                id="breakfastCount"
                value={breakfastCount}
                onChange={(e) => setBreakfastCount(Number(e.target.value))}
                disabled={confirmPaid}
                min={1}
                max={numGuests}
              />
            </FormRow>
          )}
        </Box>
      )}

      <Box>
        <Checkbox
          checked={confirmPaid}
          onChange={handleConfirm}
          id="confirm"
          disabled={confirmPaid || isCheckingIn}
        >
          I confirm that {guests.fullName} has paid the total amount of{' '}
          <span>
            {!addBreakfast
              ? formatCurrency(totalPrice)
              : `${formatCurrency(
                  totalPrice + optionalBreakfastPrice
                )} (${formatCurrency(totalPrice)} + ${formatCurrency(
                  optionalBreakfastPrice
                )} for breakfast)`}
          </span>
        </Checkbox>
      </Box>

      <ButtonGroup>
        {!isCheckingIn ? (
          <Button
            onClick={handleCheckin}
            disabled={!confirmPaid || isCheckingIn}
          >
            Check in booking #{bookingId}
          </Button>
        ) : (
          <SpinnerMini />
        )}
        <Button
          variation="secondary"
          onClick={moveBack}
        >
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
