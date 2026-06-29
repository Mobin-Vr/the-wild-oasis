import styled from 'styled-components';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { createCabin } from '../../services/apiCabins';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Textarea from '../../ui/Textarea';
import type { CabinFormData } from './types';

const ButtonsContainer = styled.div`
   padding: 1.2rem 0;
   display: flex;
   justify-content: flex-end;
   gap: 1.2rem;
`;

function CreateCabinForm() {
   const { register, handleSubmit, reset, getValues, formState } =
      useForm<CabinFormData>();

   const { errors } = formState;
   const queryClient = useQueryClient();

   const { isPending: isCreating, mutate } = useMutation({
      mutationFn: createCabin,
      onSuccess: () => {
         toast.success('New cabin successfully created');
         // Invalidate cabins cache to trigger refetch
         queryClient.invalidateQueries({ queryKey: ['cabins'] });
         reset();
      },

      onError: (err) => toast.error(err.message),
   });

   function onsubmit(data: CabinFormData) {
      mutate({ ...data, image: data.image[0] });
   }

   return (
      <Form onSubmit={handleSubmit(onsubmit)}>
         <FormRow label='Cabin name' error={errors?.name?.message}>
            <Input
               type='text'
               id='name'
               disabled={isCreating}
               {...register('name', {
                  required: 'This field is required',
               })}
            />
         </FormRow>

         <FormRow label='Maximum capacity' error={errors?.maxCapacity?.message}>
            <Input
               type='number'
               id='maxCapacity'
               disabled={isCreating}
               {...register('maxCapacity', {
                  required: 'This field is required',
                  min: {
                     value: 1,
                     message: 'Capacity should be at least 1',
                  },
               })}
            />
         </FormRow>

         <FormRow label='Regular price' error={errors?.regularPrice?.message}>
            <Input
               type='number'
               id='regularPrice'
               disabled={isCreating}
               {...register('regularPrice', {
                  required: 'This field is required',
                  min: {
                     value: 1,
                     message: 'Price should be at least 1',
                  },
               })}
            />
         </FormRow>

         <FormRow label='Discount' error={errors?.discount?.message}>
            <Input
               type='number'
               id='discount'
               disabled={isCreating}
               defaultValue={0}
               {...register('discount', {
                  required: 'This field is required',
                  validate: (value) =>
                     +value <= +getValues().regularPrice ||
                     'Discount should be less than regular price',
               })}
            />
         </FormRow>

         <FormRow label='Description' error={errors?.description?.message}>
            <Textarea
               id='description'
               disabled={isCreating}
               defaultValue=''
               {...register('description', {
                  required: 'This field is required',
               })}
            />
         </FormRow>

         <FormRow label='Cabin photo' error={errors?.image?.message}>
            <FileInput
               id='image'
               accept='image/*'
               {...register('image', {
                  required: 'This field is required',
               })}
            />
         </FormRow>

         <ButtonsContainer>
            {/* type is an HTML attribute! */}
            <Button variation='secondary' type='reset'>
               Cancel
            </Button>
            <Button disabled={isCreating}>Add cabin</Button>
         </ButtonsContainer>
      </Form>
   );
}

export default CreateCabinForm;
