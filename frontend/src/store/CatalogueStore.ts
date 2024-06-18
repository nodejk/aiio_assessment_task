import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Product, ProductStore } from '../models/Product';
import { SubCategory } from '../models/SubCategory';
import { SubProduct } from '../models/SubProduct';

export interface CatalogueStoreInterface {
    onView: boolean,
    products: {
        [key: number]: ProductStore,
    },
}


const initialState: CatalogueStoreInterface = {
    onView: false,
    products: {},
};


export const catalogueSlice = createSlice({
    name: 'product',
    initialState: initialState,
    reducers: {
        addProductToSelected: (state, action: PayloadAction<Product>) => {
            const { id } = action.payload;

            state.products[id] = {...action.payload, subCategories: {}};
        },
        removeProductFromSelected: (state, action: PayloadAction<{productId: number}>) => {
            const { productId } = action.payload;

            delete state.products[productId];
        },
        addSubCategoryToProduct: (state, action: PayloadAction<{subCategory: SubCategory, productId: number}>) => {
            const { subCategory, productId } = action.payload;

            const { id } = subCategory;

            state.products[productId].subCategories[id] = {...subCategory, subProducts: {}};
        },
        removeSubCategoryFromProduct: (state, action: PayloadAction<{subCategoryId: number, productId: number}>) => {
            const {subCategoryId, productId} = action.payload;

            delete state.products[productId].subCategories[subCategoryId];
        },
        addSubProductToSubCategory: (state, action: PayloadAction<{subProduct: SubProduct, productId: number, subCategoryId: number}>) => {
            const { subProduct, subCategoryId, productId } = action.payload;

            const { id } = subProduct;

            state.products[productId].subCategories[subCategoryId].subProducts[id] = subProduct;
        },
        removeSubProductToSubCategory: (state, action: PayloadAction<{subProductId: number, productId: number, subCategoryId: number}>) => {
            const { subProductId, subCategoryId, productId } = action.payload;

            delete state.products[productId].subCategories[subCategoryId].subProducts[subProductId];
        },
        toggleModalView: (state) => {
            state.onView = !state.onView;
        },
    },
    selectors: {
        getAllSelectedProducts: state => {
            const selectedProducts = state.products;

            const allProductsSelected: Product[] = [];


            for (const productKey in selectedProducts) {
                allProductsSelected.push(selectedProducts[productKey]);
            } 

            return allProductsSelected;
        },
        getSelectedSubCategories: state => {
            const selectedProducts = state.products;
            
            const allSubCategoriesSelected: SubCategory[] = [];

            for (const productKey in selectedProducts) {
                const product = selectedProducts[productKey];
                
                for (const subCategoryKey in product.subCategories){
                    const subCategory = product.subCategories[subCategoryKey];

                    allSubCategoriesSelected.push(subCategory);
                }

            }

            return allSubCategoriesSelected; 
        },
        getSelectedSubProducts: state => {
            const selectedProducts = state.products;
            
            const allSubProductsSelected: SubProduct[] = [];

            for (const productKey in selectedProducts) {
                const product = selectedProducts[productKey];
                
                const allSubCategories = product.subCategories;
                for (const subCategoryKey in allSubCategories){
                    const subCategory = allSubCategories[subCategoryKey];

                    const allSubProducts = subCategory.subProducts; 
                    for (const subProductKey in subCategory.subProducts) {
                        allSubProductsSelected.push(allSubProducts[subProductKey]);
                    }

                }
            }

            return allSubProductsSelected; 
        },
        modalState: state => {
            return state.onView;
        },
    },
});

export const CatalogueReducer = catalogueSlice.reducer;
export const CatalogueActions = catalogueSlice.actions;
export const CatalogueSelectors = catalogueSlice.selectors;
