import React, { useMemo, useState } from 'react';
import { SubCategory } from '../../models/SubCategory';
import { SubProduct } from '../../models/SubProduct';
import { API } from '../../services';
import { SubProductComponent } from '../SubProduct/SubProduct';
import { useAppDispatch } from '../../store';
import { Snackbar } from '@mui/material';
import { ComponentStyles } from '../../styles';
import { CatalogueActions } from '../../store/CatalogueStore';

interface Props {
    productId: number,
    onCheckBoxChange: (value: boolean, subCategoryId: number) => void,
    subCategory: SubCategory
}

type SubProductState = SubProduct & {
    checked: boolean,
}

interface SubProductForm {
    name: string,
}


export function SubCategoryComponent(props: Props) {
    const [subCategoryExpanded, setSubCategoryExpanded] = useState<boolean>(false);
    const [subProducts, setSubProducts] = useState<SubProductState[]>([]);
    const dispatch = useAppDispatch();

    const [formState, setFormState] = useState<boolean>(false);
    const [subProductForm, setSubProductForm] = useState<SubProductForm>({
        name: '',
    });
    const [formError, setFormError] = useState<boolean>(false);
    
    const [searchQuery, setSearchQuery] = useState<string>('');
    
    async function toggleSubCategoryCheckBox(value: boolean) {
        setSubCategoryExpanded(value);
        props.onCheckBoxChange(value, props.subCategory.id);
        
        const subProductsResponse = await API.Server.getAllSubProductsForSubCategory(props.subCategory.id);

        const temp = subProductsResponse.map((subCat) => {
            return {
                id: subCat.id,
                name: subCat.name,
                checked: false,
            };
        });
        setSubProducts(temp);
    }

    async function toggleSubProductCheckBox(value: boolean, subProductId: number) {
        const subProduct = subProducts.find((subProd) => subProd.id === subProductId);

        if (subProduct === undefined) {
            return;
        }

        if (value) {
            dispatch(CatalogueActions.addSubProductToSubCategory({
                subProduct,
                productId: props.productId, 
                subCategoryId: props.subCategory.id,
            }));
        } else {
            dispatch(CatalogueActions.removeSubProductFromSubCategory({
                subProductId: subProduct.id,
                productId: props.productId, 
                subCategoryId: props.subCategory.id,
            })); 
        }
    }

    function onSearchQueryChange(value: string) {
        setSearchQuery(value);
    }

    const filteredSubProducts: SubProductState[] = useMemo(() => {
        if (searchQuery === '') {
            return subProducts;
        }

        const lowerCaseQuery = searchQuery.toLowerCase();

        return subProducts.filter((subProduct) => subProduct.name
            .toLowerCase().includes(lowerCaseQuery),
        );
    }, [searchQuery, subProducts]);

    function toggleSubProductForm() {
        if (formState) {
            resetSubProductForm();
        }

        setFormState(state => !state);
    }

    function handleSnackBarClose (_event: React.SyntheticEvent | Event, _reason?: string) {
        setFormError(false);
    }

    async function submitSubProductForm(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();

        if (subProductForm.name === '') {
            setFormError(true);
            return;
        }

        const newSubProduct = await API.Server.addSubProductToSubCategory({
            subCategoryId: props.subCategory.id, 
            name: subProductForm.name,
        });

        setSubProducts([...subProducts, {
            id: newSubProduct.id,
            name: newSubProduct.name,
            checked: false,
        }]);

        resetSubProductForm();
        toggleSubProductForm();
    }

    function onSubProductFormChange(value: string) {
        setSubProductForm({name: value});
    }

    function resetSubProductForm() {
        setSubProductForm({name: ''});
    }

    return (
        <React.Fragment>
        <div style={ComponentStyles.common.listItemCard}>
            <div>
                {props.subCategory.name}
            </div>
            <div>
                <input
                    style={ComponentStyles.common.checkBox}
                    type='checkbox'
                    checked={subCategoryExpanded}
                    onChange={(e) => toggleSubCategoryCheckBox(e.target.checked)}
                ></input>
            </div>
        </div>
        { subCategoryExpanded && 
            <div style={ComponentStyles.subProduct.card}>

                <p>Select Sub-Products</p>

                <div style={ComponentStyles.subProduct.searchDropDown}>

                    <div style={ComponentStyles.common.dropDownWrapper}>
                        <input 
                            style={ComponentStyles.common.searchBar}
                            placeholder='search'
                            onChange={(e) => onSearchQueryChange(e.target.value)}
                            type='text'
                            value={searchQuery}
                        ></input>

                        { filteredSubProducts.map((subProd) =>  
                            <SubProductComponent
                                toggleCheckBoxChange={toggleSubProductCheckBox}
                                key={subProd.id}
                                subCategoryId={props.subCategory.id}
                                subProduct={subProd}
                            />,
                        )}

                        <div style={{paddingBottom: '1em', height: '4em', alignContent: 'center'}}>
                            { 
                                !formState && 
                                <div>
                                    <button onClick={toggleSubProductForm}>+ ADD SUB-PRODUCT</button>
                                </div>
                            }
                            {
                                formState &&
                                <div style={{display: 'flex',  justifyContent: 'space-between'}}>
                                    <input
                                        style={{width: '75%'}}
                                        onChange={(e) => onSubProductFormChange(e.target.value)}>    
                                    </input>
                                    <div style={{display: 'flex', width: '20%', justifyContent: 'space-evenly'}}> 
                                        <button
                                            style={ComponentStyles.common.saveButton}
                                            onClick={submitSubProductForm}
                                        >+ADD</button>
                                        <button 
                                            style={ComponentStyles.common.cancelButton}
                                            onClick={toggleSubProductForm}
                                        >CANCEL</button>
                                    </div>
                                </div>
                            }
                            <Snackbar
                                open={formError && formState}
                                autoHideDuration={3000}
                                onClose={handleSnackBarClose}
                                message='Sub-Product Name can not be empty'
                            />    
                        </div>
                    </div>
                </div>
            </div>
        }
    </React.Fragment>
        
    );
}
