import styled from 'styled-components';

import { useForm } from 'react-hook-form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Textarea from '../../ui/Textarea';
import type { CabinFormData, CreateCabinFormProps } from './types';
import useCreateCabin from './useCreateCabin';
import useEditcabin from './useEditcabin';

const ButtonsContainer = styled.div`
   padding: 1.2rem 0;
   display: flex;
   justify-content: flex-end;
   gap: 1.2rem;
`;

function CreateCabinForm({ cabinToEdit, onShowForm }: CreateCabinFormProps) {
   const { id: editId, ...editValues } = cabinToEdit ?? {};

   const { isCreating, createCabin } = useCreateCabin();
   const { isEditing, editCabin } = useEditcabin();
   const isWorking = isCreating || isEditing;

   const isEditSession = Boolean(editId);

   const { register, handleSubmit, reset, getValues, formState } =
      useForm<CabinFormData>({
         defaultValues: isEditSession ? editValues : {},
      });

   const { errors } = formState;

   function onsubmit(data: CabinFormData) {
      // Extract File from FileList (react-hook-form always returns FileList for file inputs)
      const image: File | string =
         data.image instanceof FileList ? data.image[0] : data.image;

      if (isEditSession)
         editCabin(
            { newCabinData: { ...data, image }, id: editId },
            {
               onSuccess: () => {
                  reset();
                  onShowForm?.((show) => !show);
               },
            },
         );
      else createCabin({ ...data, image }, { onSuccess: () => reset() });
   }

   return (
      <Form onSubmit={handleSubmit(onsubmit)}>
         <FormRow label='Cabin name' error={errors?.name?.message}>
            <Input
               type='text'
               id='name'
               disabled={isWorking}
               {...register('name', {
                  required: 'This field is required',
               })}
            />
         </FormRow>

         <FormRow label='Maximum capacity' error={errors?.maxCapacity?.message}>
            <Input
               type='number'
               id='maxCapacity'
               disabled={isWorking}
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
               disabled={isWorking}
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
               disabled={isWorking}
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
                  required: isEditSession ? false : 'This field is required',
               })}
            />
         </FormRow>

         <ButtonsContainer>
            <Button variation='secondary' type='reset'>
               Cancel
            </Button>
            <Button disabled={isWorking}>
               {isEditSession ? 'Edit cabin' : 'Create new cabin'}
            </Button>
         </ButtonsContainer>
      </Form>
   );
}

export default CreateCabinForm;
