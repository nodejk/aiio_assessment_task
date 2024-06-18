import { Entity } from '../Entity';
import { SubCategoryStore } from '../SubCategory';

export interface Product extends Entity {
    name: string,
}

export interface ProductStore extends Entity {
    name: string,
    subCategories: {
        [key: number]: SubCategoryStore
    },
}
