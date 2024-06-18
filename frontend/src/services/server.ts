import axios from 'axios';
import { baseServerRoute } from './baseRoute';
import { Product } from '../models/Product';
import { SubProduct } from '../models/SubProduct';
import { SubCategory } from '../models/SubCategory';

const RESOURCE_PRODUCTS = 'products' as const;
const RESOURCE_SUB_CATEGORY = 'sub-categories' as const; 
const RESOURCE_SUB_PRODUCT = 'sub-products' as const;
const RESOURCE_SAVED_SELECTIONS = 'saved-selections' as const;

export const Server = {
    getAllProducts: () => 
        axios.get<Product[]>(`${baseServerRoute}/${RESOURCE_PRODUCTS}/all/`)
        .then(response => response.data),
    
    getAllSubCategoriesForProduct: (productId: number) => 
        axios.get<SubCategory[]>(`${baseServerRoute}/${RESOURCE_PRODUCTS}/${productId}/${RESOURCE_SUB_CATEGORY}/all`)
        .then((response) => response.data),

    getAllSubProductsForSubCategory: (subCategoryId: number) => 
        axios.get<SubProduct[]>(`${baseServerRoute}/${RESOURCE_SUB_CATEGORY}/${subCategoryId}/${RESOURCE_SUB_PRODUCT}/all`)
        .then((response) => response.data),
        
    addSubProductToSubCategory: (payload: {subCategoryId: number, name: string}) =>
        axios.post<SubProduct>(
            `${baseServerRoute}/${RESOURCE_SUB_PRODUCT}/create/`, 
            payload,
        ).then((response) => response.data),

    saveSelections: (payload: {
        savedProducts: Product[],
        savedSubCategories: SubCategory[],
        savedSubProducts: SubProduct[],
    }) => axios.post<boolean>(
            `${baseServerRoute}/${RESOURCE_SAVED_SELECTIONS}/create/`,
            payload,
        ).then((response) => response.data),
};
