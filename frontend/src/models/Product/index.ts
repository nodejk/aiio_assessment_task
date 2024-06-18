import { Entity } from '../Entity';
import { SubCategoryStore } from '../SubCategory';

export interface ProductStore extends Entity {
    name: string,
    subCategories: {
        [key: number]: SubCategoryStore
    },
}

export interface Product extends Entity {
    name: string,
}
