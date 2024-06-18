import React, { useMemo, useState } from 'react';
import { API } from '../../services';
import { useAppDispatch } from '../../store';
import { CatalogueActions } from '../../store/CatalogueStore';
import { Product } from '../../models/Product';
import { SubCategory } from '../../models/SubCategory';
import { SubCategoryComponent } from '../SubCategory/SubCategory';
import { ComponentStyles } from '../../styles';

interface Props {
    onCheckBoxChange: (value: boolean, productId: number) => void,
    product: Product & {
        checked: boolean,
    },
}

type SubCategoryState = SubCategory & {
    checked: boolean,
}

export function ProductComponent(props: Props) {
    const [productExpanded, setProductExpanded] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const dispatch = useAppDispatch();
    
    const [subCategories, setSubCategories] = useState<SubCategoryState[]>([]);

    async function checkBox(value: boolean) {
        setProductExpanded(value);
        props.onCheckBoxChange(value, props.product.id);
        
        const subCategoriesResponse = await API.Server.getAllSubCategoriesForProduct(props.product.id);

        const temp = subCategoriesResponse.map((subCat) => {
            return {
                id: subCat.id,
                name: subCat.name,
                checked: false,
            };
        });
        setSubCategories(temp);
    }

    function onSearchQueryChange(value: string) {
        setSearchQuery(value);
    }

    const filteredSubCategories = useMemo(() => {        
        if (searchQuery === '') {
            return subCategories;
        }

        const lowerCaseQuery = searchQuery.toLowerCase();

        return subCategories.filter((subCat) => subCat.name.toLowerCase().includes(lowerCaseQuery));
    }, [searchQuery, subCategories]);


    function onCheckBoxChange(value: boolean, subCategoryId: number) {
        const subCategory = subCategories.find((subCat) => subCat.id === subCategoryId);
        
        if (subCategory === undefined) {
            return;
        }

        if (value) {
            dispatch(CatalogueActions.addSubCategoryToProduct({
                subCategory, productId: props.product.id,
            }));
        } else {
            dispatch(CatalogueActions.removeSubCategoryFromProduct({
                subCategoryId: subCategory.id, productId: props.product.id,
            }));
        }
    }

    return (
        <div>
            <div style={{
                    ...ComponentStyles.common.listItemCard,
                    paddingLeft: '1em',
                    paddingRight: '1em',
                }}>
                <div>
                    {props.product.name}
                </div>
                    <input
                        type='checkbox'
                        checked={productExpanded} 
                        onChange={(e) => checkBox(e.target.checked)}
                    ></input>
            </div>
            { productExpanded &&  
                <div style={ComponentStyles.subCategory.card}>

                    <p>Select Sub-Categories</p>

                    <div style={ComponentStyles.subCategory.searchDropDown}>

                        <div style={ComponentStyles.common.dropDownWrapper}>
                            <input
                                style={ComponentStyles.common.searchBar}
                                placeholder='search'
                                onChange={(e) => onSearchQueryChange(e.target.value)}
                                type='text'
                                value={searchQuery === null ? '' : searchQuery}
                            ></input>
                            { filteredSubCategories.map((subCategory) => 
                                <SubCategoryComponent
                                    productId={props.product.id}
                                    onCheckBoxChange={onCheckBoxChange} 
                                    key={subCategory.id}
                                    subCategory={subCategory}
                                />,
                            )}
                        </div>

                    </div>

                </div>
            }
        </div>

    );
}
