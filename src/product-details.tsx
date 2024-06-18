import axios from 'axios';
import { useEffect, useState } from 'react';
import { Product, Product_Details } from './models/products';
import { Box, Flex, Table, TextInput, Image } from '@mantine/core';
import { MdDelete } from "react-icons/md";
import './product-details.css';
import { Link } from 'react-router-dom';
import ModalAddEdit from './ModalAddEdit';
import { Notifications, notifications } from '@mantine/notifications';


function ProductDetails() {

  const [productInfo, setProductDetails] = useState<Product | any>();
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    getAllProductDetails();
  }, []);

  useEffect(() => {
    getSearchProductDetails();
  }, [searchQuery]);

  const truncateText = (text: string, maxLength: number) => {
    if (text?.length <= maxLength) return text;
    return text?.slice(0, maxLength) + '...';
  };

  function getAllProductDetails() {
    axios.get('https://dummyjson.com/products')
      .then((response) => {
        const { data: { products } } = response;
        setProductDetails({ Product_Details: products });
      })
      .catch((error) => {
        setProductDetails({ Product_Details: [] });
      })
  }

  const getSearchProductDetails = () => {
    axios.get(`https://dummyjson.com/products/search?q=${searchQuery}`)
      .then((response) => {
        const { data: { products } } = response;
        setProductDetails({ Product_Details: products });
      })
      .catch((error) => {
        setProductDetails({ Product_Details: [] });
      })
  }


  const deleteProduct = (productId: number, event: any) => {
    event.preventDefault();
    axios.delete(`https://dummyjson.com/products/${productId}`)
      .then((response) => {
        if (response) {

          const filterValues: any = productInfo?.Product_Details.filter((result: any) => result.id !== productId);
          setProductDetails({ Product_Details: filterValues });
          notifications.show({
            title: 'Delete',
            message: 'Delteded successfully',
            color: 'red',
          });
        }
      })
      .catch((error) => {
      })
  }

  const updateProduct = (response: any, mode: boolean) => {
    if (mode) {
      let foundIndex = productInfo?.Product_Details.findIndex((x: { id: any; }) => x.id == response.id);
      if (foundIndex !== -1) {
        productInfo.Product_Details[foundIndex].title = response.title;
        productInfo.Product_Details[foundIndex].category = response.category;
        productInfo.Product_Details[foundIndex].stock = response.stock;
        productInfo.Product_Details[foundIndex].price = response.price;
        productInfo.Product_Details[foundIndex].description = response.description;
      }
    } else {
      let length = productInfo.Product_Details.length;
      let id = productInfo.Product_Details[length - 1].id;
      const obj = {
        id: id + 1,
        title: response.title,
        category: response.category,
        stock: response.stock,
        price: response.price,
        description: response.description,
      }
      productInfo.Product_Details.push(obj);
    }
    setProductDetails({ Product_Details: productInfo.Product_Details });
    notifications.show({
      title: mode ? 'Edit' : 'Add',
      message: mode ? 'Product edited successfully' : 'Product added successfully',
      color: 'green',
    });
  }

  return (
    <>
      {productInfo?.Product_Details ?
        <>
          <Flex
            direction={{ base: 'column', sm: 'row' }}
            gap={{ base: 'sm', sm: 'lg' }}
            justify={{ sm: 'center' }}
          >
            <Box mb="md">
              <TextInput
                placeholder="Search products"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.currentTarget.value)}
                w={300}
              />
            </Box>
            <ModalAddEdit buttonName="Add Product" isEdit={false} fromValues={{}} updateProduct={updateProduct} />
          </Flex>
          {productInfo?.Product_Details.length > 0 ?
            <Table	>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Product </Table.Th>
                  <Table.Th> Title</Table.Th>
                  <Table.Th> Description</Table.Th>
                  <Table.Th> Price</Table.Th>
                  <Table.Th> Category</Table.Th>
                  <Table.Th>Action</Table.Th>
                </Table.Tr>
              </Table.Thead>

              <Table.Tbody>
                {
                  productInfo?.Product_Details.map((element: Product_Details) => (
                    <Table.Tr key={element.id}>
                      <Table.Td>
                        <Image
                          h={50}
                          w={50}
                          fit="contain"
                          src={element.thumbnail}
                        />
                      </Table.Td>
                      <Table.Td>
                        <Link to={`product-info/${element.id}`}>{element.title}</Link>
                      </Table.Td>
                      <Table.Td>{truncateText(element.description, 130)}</Table.Td>
                      <Table.Td>{element.price}</Table.Td>
                      <Table.Td>{element.category}</Table.Td>
                      <Table.Td>
                        <MdDelete className='react-icon-delete react-icon ' onClick={(e) => deleteProduct(element.id, e)} />
                        <ModalAddEdit buttonName="" isEdit={true} fromValues={element} updateProduct={updateProduct} />
                      </Table.Td>
                    </Table.Tr>
                  ))
                }
              </Table.Tbody>
            </Table> : <Flex direction={{ base: 'column', sm: 'row' }}
              gap={{ base: 'sm', sm: 'lg' }}
              justify={{ sm: 'center' }}><h3>Product is not availbale</h3></Flex>
          }
        </>
        : <h3>Data not found....</h3>}

    </>
  );

};

export default ProductDetails;