import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import FormRow from '../../ui/FormRow';

import { useForm } from 'react-hook-form';
import { useCreateCabin } from './useCreateCabin';
import { useUpdateCabin } from './useUpdateCabin';

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  const { isCreating, createCabin } = useCreateCabin();
  const { isUpdating, updateCabin } = useUpdateCabin();

  //Передаем в компонент cabin который нужно изменить и деструктурируем его
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);

  // Если есть cabinToEdit, то делаем ее значение дефолтным в форме, если кабины нет, то пустой объект
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;

  const isWorking = isCreating || isUpdating;

  function onSubmit(data) {
    const image = typeof data.image === 'string' ? data.image : data.image[0];
    if (isEditSession)
      updateCabin(
        { newCabinData: { ...data, image }, id: editId },
        {
          onSuccess: (data) => {
            console.log(data);
            reset();
            onCloseModal?.();
          },
        }
      );
    else
      createCabin(
        { ...data, image: image },
        {
          onSuccess: (data) => {
            console.log(data);
            reset();
            onCloseModal?.();
          },
        }
      );
  }

  function onError(errors) {
    console.log(errors);
  }
  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? 'modal' : 'regular'}
    >
      <FormRow
        disabled={isWorking}
        label='Cabin name'
        error={errors?.name?.message}
      >
        <Input
          type='text'
          id='name'
          {...register('name', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow
        disabled={isWorking}
        label='Maximum capacity'
        error={errors?.maxCapacity?.message}
      >
        <Input
          type='number'
          id='maxCapacity'
          {...register('maxCapacity', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow
        disabled={isWorking}
        label='Regular price'
        error={errors?.regularPrice?.message}
      >
        <Input
          type='number'
          id='regularPrice'
          {...register('regularPrice', {
            required: 'This field is required',
            min: {
              value: 1,
              message: 'Capacity should be at least 1',
            },
          })}
        />
      </FormRow>

      <FormRow
        disabled={isWorking}
        label='Discount'
        error={errors?.discount?.message}
      >
        <Input
          type='number'
          id='discount'
          defaultValue={0}
          {...register('discount', {
            required: 'This field is required',
            validate: (value) =>
              Number(value) <= Number(getValues().regularPrice) ||
              'Discount should be less than regular price',
          })}
        />
      </FormRow>

      <FormRow
        label='Description for website'
        error={errors?.description?.message}
      >
        <Textarea
          type='number'
          id='description'
          defaultValue=''
          {...register('description', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow
        disabled={isWorking}
        label='Cabin photo'
        error={errors?.image?.message}
      >
        <FileInput
          id='image'
          accept='image/*'
          type='file'
          {...register('image', {
            required: isEditSession ? false : 'This field is required',
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation='secondary'
          type='reset'
          disabled={isCreating}
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {!isCreating
            ? isEditSession
              ? 'Edit cabin'
              : 'Create new cabin'
            : 'Creating'}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
