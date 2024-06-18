export interface Product {
	Product_Details: Product_Details[];
}

export interface Product_Details {
    id: number;
    title: string;
    description: string;
    category: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    tags: string[];
    brand: string;
    sku: string;
    weight: number;
    dimensions: IDimensions;
    warrantyInformation: string;
    shippingInformation: string;
    availabilityStatus: string;
    reviews: IReview[];
    returnPolicy: string;
    minimumOrderQuantity: number;
    meta: IMeta;
    thumbnail: string;
    images: string[];
  }

  export interface IDimensions {
    width: number;
    height: number;
    depth: number;
  }
  
  export interface IReview {
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
    reviewerEmail: string;
  }
  
  export interface IMeta {
    createdAt: string;
    updatedAt: string;
    barcode: string;
    qrCode: string;
  }
  
  // export interface IFromData{
  //   title:string,
  //   category:string,
  //   stock: number,
  //   price: number,
  //   description: string
  // }

//   export interface IProductResponse {
//     products: Product[];
//     total: number;
//     skip: number;
//     limit: number;
//   }