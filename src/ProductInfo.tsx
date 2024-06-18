import { Grid, Image, MantineProvider, Text } from "@mantine/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Product_Details } from "./models/products";
import { Carousel } from "@mantine/carousel";
import './product-details.css';
import { SlArrowLeftCircle } from "react-icons/sl";




function ProductInfo() {
    const { id } = useParams();
    const [productId, setProductID] = useState(id);
    const [Product_Info, setProductInfo] = useState<Product_Details | any>({});
    
    useEffect(() => {
        getProductInfo();
    }, [productId])
    
    const getProductInfo = () => {
        axios.get(`https://dummyjson.com/products/${productId}`)
            .then((response) => {
                const { data } = response;
                setProductInfo(data);
            })
            .catch((error) => {
                setProductInfo({});
            })
    }
    return (
        <MantineProvider>
            <>
            
            <Link to={`/`}><SlArrowLeftCircle className="back-btn"/></Link>
                <Grid mt={30}>
                    <Grid.Col span={4}>
                        <Carousel withIndicators height={200}>
                            {Product_Info.images &&
                                Product_Info.images.map((element: any) => (
                                    <Carousel.Slide key={element}> <Image className="carousel-img" src={element} /></Carousel.Slide>
                                ))
                            }
                        </Carousel>
                    </Grid.Col>
                    <Grid.Col span={8}>
                        <Text fw={700} size='lg'>Title</Text>
                        <Text>{Product_Info.title}</Text>
                        <Text fw={700} size='lg'>Brand</Text>
                        <Text>{Product_Info.brand}</Text>
                        <Text fw={700} size='lg'>Price</Text>
                        <Text >${Product_Info.price}</Text>
                        <Text fw={700} size='lg'>Description</Text>
                        <Text >{Product_Info.description}</Text>
                        <Text fw={700} size='lg'>Return Policy</Text>
                        <Text >{Product_Info.returnPolicy}</Text>
                        <Text fw={700} size='lg'>Warranty</Text>
                        <Text >{Product_Info.warrantyInformation}</Text>
                        <Text fw={700} size='lg'>Availiblity</Text>
                        <Text >{Product_Info.availabilityStatus}</Text>
  
                    </Grid.Col>
                </Grid>

            </>
        </MantineProvider>
    )
}

export default ProductInfo;