import { SubProductStore } from '../SubProduct';
import { Entity } from '../Entity';

export interface SubCategory extends Entity {   
    name: string,
}

export interface SubCategoryStore extends Entity {
    name: string,
    subProducts: {
        [key:number]: SubProductStore,
    },
}
