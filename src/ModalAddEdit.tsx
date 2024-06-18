import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, TextInput, Group, NumberInput, Textarea } from '@mantine/core';
import { MdEdit } from 'react-icons/md';
import './product-details.css';
import { useForm } from '@mantine/form';
import { FormEvent } from 'react';
import { notifications } from '@mantine/notifications';
import axios, { AxiosRequestConfig } from 'axios';

const ModalAddEdit = (props: any) => {

  const { buttonName, isEdit, fromValues, updateProduct } = props
  const [opened, { open, close }] = useDisclosure(false);
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      title: '',
      category: '',
      stock: '',
      price: '',
      description: ''
    },

    validate: {
      title: (value) => value.length > 0 ? null : 'Title is required',
      category: (value) => value.length > 0 ? null : 'Category is required',
      stock: (value) => !value ? 'Stock is required' : null,
      price: (value) => !value ? 'Price is required' : null,
      description: (value) => value.length > 0 ? null : 'Discription is required',
    },
  });

  const openModal = () => {
    open();
    form.reset();
    if (isEdit) {
      const values = {
        title: fromValues.title,
        category: fromValues.category,
        stock: fromValues.stock,
        price: fromValues.price,
        description: fromValues.description
      }
      form.setValues(values);
    }

  }
  const updateProductbyApi = (data: string, config: AxiosRequestConfig<any> | undefined) => {
    axios.patch(`https://dummyjson.com/products/${fromValues.id}`, data, config)
      .then((response) => {
        close();
        updateProduct(response.data, isEdit)
      })
      .catch((error) => {
      })
  }

  const addProducts = (data: string, config: AxiosRequestConfig<any> | undefined) => {
    axios.post(`https://dummyjson.com/products/add`, data, config)
      .then((response) => {
        close();
        updateProduct(response.data, isEdit)

      })
  }
  const SubmitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    form.validate();
    if (!form.isValid()) {
      return
    }
    const data = JSON.stringify(form.getValues())
    const config = { headers: { 'Content-Type': 'application/json' } };
    if (isEdit) {
      updateProductbyApi(data, config)
    } else if (!isEdit) {
      addProducts(data, config);
    }
  }

  return (
    <>
      <Modal opened={opened} onClose={close} title={isEdit ? 'Edit Product' : "Add Product"}>
        <form onSubmit={(e) => SubmitForm(e)}>
          <TextInput
            withAsterisk
            label="title"
            placeholder="Enter title"
            key={form.key('title')}
            {...form.getInputProps('title')}
          />

          <TextInput
            withAsterisk
            label="category"
            placeholder="Enter category"
            key={form.key('category')}
            {...form.getInputProps('category')}
          />

          <NumberInput
            withAsterisk
            label="Stock"
            placeholder="Enter stock"
            key={form.key('stock')}
            {...form.getInputProps('stock')}
          />

          <NumberInput
            withAsterisk
            label="Price"
            placeholder="Enter price"
            key={form.key('price')}
            {...form.getInputProps('price')}
          />
          <Textarea
            withAsterisk
            label="description"
            placeholder="Enter Discription"
            key={form.key('description')}
            {...form.getInputProps('description')}
          />

          <Group justify="center" mt="md">
            <Button type="submit">Submit</Button>
          </Group>
        </form>
      </Modal>
      {isEdit ? <MdEdit onClick={openModal} className='react-icon-edit react-icon' /> :
        <Button onClick={openModal}>{buttonName}</Button>
      }

    </>
  );
}

export default ModalAddEdit;