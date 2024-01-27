import styled from 'styled-components';
import { formatCurrency } from '../../utils/helpers';
import CreateCabinForm from './CreateCabinForm';
import { useDeleteCabin } from './useDeleteCabin';
import { HiPencil, HiSquare2Stack, HiTrash } from 'react-icons/hi2';
import { useCreateCabin } from './useCreateCabin';
import SpinnerMini from '../../ui/SpinnerMini';
import Modal from '../../ui/Modal';
import Button from '../../ui/Button';
import ConfirmDelete from '../../ui/ConfirmDelete';
const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: 'Sono';
`;

const Price = styled.div`
  font-family: 'Sono';
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: 'Sono';
  font-weight: 500;
  color: var(--color-green-700);
`;
function CabinRow({ cabin }) {
  const { id, name, maxCapacity, regularPrice, discount, description, image } =
    cabin;

  const { isCreating: isCopying, createCabin } = useCreateCabin();
  const { isDeleting, deleteCabin } = useDeleteCabin();

  function handleDuplicate() {
    createCabin({
      name: `copy of ${name}`,
      maxCapacity,
      regularPrice,
      discount,
      description,
      image,
    });
  }
  return (
    <TableRow role='row'>
      <Img src={image} />
      <Cabin>{name}</Cabin>
      <div>Fits up to {maxCapacity} guests</div>
      <Price>{formatCurrency(regularPrice)}</Price>
      <Discount>
        {discount ? formatCurrency(discount) : <span>&mdash;</span>}
      </Discount>
      {isCopying || isDeleting ? (
        <SpinnerMini />
      ) : (
        <div>
          <Button size='small' onClick={handleDuplicate}>
            <HiSquare2Stack />
          </Button>
          <Modal>
            <Modal.Open opens='cabin-update'>
              <Button size='small'>
                <HiPencil />
              </Button>
            </Modal.Open>
            <Modal.Window name='cabin-update'>
              <CreateCabinForm cabinToEdit={cabin} />
            </Modal.Window>
            <Modal.Open opens='cabin-delete'>
              <Button size='small' disabled={isDeleting}>
                <HiTrash />
              </Button>
            </Modal.Open>
            <Modal.Window name='cabin-delete'>
              <ConfirmDelete
                resourceName={`cabin ${name}`}
                onConfirm={() => deleteCabin(id)}
                disabled={isDeleting}
              />
            </Modal.Window>
          </Modal>
        </div>
      )}
    </TableRow>
  );
}

export default CabinRow;
