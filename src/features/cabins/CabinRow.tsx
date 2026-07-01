import { HiPencil, HiTrash } from 'react-icons/hi';
import { HiSquare2Stack } from 'react-icons/hi2';
import styled from 'styled-components';
import ConfirmDelete from '../../ui/ConfirmDelete';
import Menus from '../../ui/Menus';
import Modal from '../../ui/Modal';
import Table from '../../ui/Table';
import { formatCurrency } from '../../utils/helpers';
import CreateCabinForm from './CreateCabinForm';
import type { CabinRowProps } from './types';
import useCreateCabin from './useCreateCabin';
import useDeleteCabin from './useDeleteCabin';

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

export default function CabinRow({ cabin }: CabinRowProps) {
   const { isDeleting, deleteCabin } = useDeleteCabin();
   const { createCabin } = useCreateCabin();

   const {
      id: cabinId,
      name,
      maxCapacity,
      regularPrice,
      discount,
      description,
      image,
   } = cabin;

   function handleDuplicate() {
      createCabin({
         name: `Copy of ${name}`,
         maxCapacity,
         regularPrice,
         discount,
         image,
         description,
      });
   }

   return (
      <Table.Row>
         <Img src={image} />
         <Cabin>{name}</Cabin>
         <div>Fits up to {maxCapacity}</div>
         <Price>{formatCurrency(regularPrice)}</Price>
         {discount ? (
            <Discount>{formatCurrency(discount)}</Discount>
         ) : (
            <span>&mdash;</span>
         )}
         <div>
            <Modal>
               <Menus.Menu>
                  <Menus.Toggle id={String(cabinId)} />

                  <Menus.List id={String(cabinId)}>
                     <Modal.Open opens='edit'>
                        <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
                     </Modal.Open>

                     <Modal.Open opens='delete'>
                        <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
                     </Modal.Open>

                     <Menus.Button
                        icon={<HiSquare2Stack />}
                        onClick={handleDuplicate}
                     >
                        Duplicate
                     </Menus.Button>
                  </Menus.List>

                  <Modal.Window name='edit'>
                     <CreateCabinForm cabinToEdit={cabin} />
                  </Modal.Window>

                  <Modal.Window name='delete'>
                     <ConfirmDelete
                        resourceName='cabins'
                        onConfirm={() => cabinId && deleteCabin(cabinId)}
                        disabled={isDeleting}
                     />
                  </Modal.Window>
               </Menus.Menu>
            </Modal>
         </div>
      </Table.Row>
   );
}
