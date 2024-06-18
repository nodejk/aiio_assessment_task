import React, { useEffect, useMemo, useState } from 'react';
import { useAppSelector } from '../../store';
import { CatalogueActions, CatalogueSelectors } from '../../store/CatalogueStore';
import { useDispatch } from 'react-redux';
import { API } from '../../services';
import Snackbar from '@mui/material/Snackbar';
import { ComponentStyles } from '../../styles';

export function Modal() {
    const modalView: boolean = useAppSelector(CatalogueSelectors.modalState);
    
    const [snackBar, setSnackBar] = useState<boolean>(false);
    const [snackBarMessage, setSnackBarMessage] = useState<string>('');

    const dispatch = useDispatch();
    const selectedProducts = useAppSelector(CatalogueSelectors.getAllSelectedProducts);
    const selectedSubCategories = useAppSelector(CatalogueSelectors.getSelectedSubCategories);
    const selectedSubProducts = useAppSelector(CatalogueSelectors.getSelectedSubProducts);

    const selectedProductNames: string = useMemo(() => {
        if (selectedProducts.length === 0) {
            return 'None Selected';
        }
        
        return selectedProducts.reduce((prevVal, currentVal) => {
            return `${currentVal.name}, ${prevVal}`;
        }, '');
    }, [selectedProducts]);

    const selectedSubCategoriesNames: string = useMemo(() => {
        if (selectedSubCategories.length === 0) {
            return 'None Selected';
        }

        return selectedSubCategories.reduce((prevVal, currentVal) => {
            return `${currentVal.name}, ${prevVal}`;
        }, '');
    }, [selectedSubCategories]);

    const selectedSubProductsName: string = useMemo(() => {
        if (selectedSubProducts.length === 0) {
            return 'None Selected';
        }

        return selectedSubProducts.reduce((prevVal, currentVal) => {
            return `${currentVal.name}, ${prevVal}`;
        }, '');
    }, [selectedSubProducts]);

    function toggleModal() {
        dispatch(CatalogueActions.toggleModalView());
    }

    const handleSnackBarClose = (_event: React.SyntheticEvent | Event, _reason?: string) => {
        setSnackBar(false);
    };

    async function saveSelectedView() {
        if (
            selectedProducts.length === 0 &&
            selectedSubCategories.length === 0 &&
            selectedSubProducts.length === 0
        ) {
            setSnackBar(true);
            setSnackBarMessage('Empty selection. Please select some products.');
            return;    
        }
        try {
            await API.Server.saveSelections({
                savedProducts: selectedProducts, 
                savedSubCategories: selectedSubCategories,
                savedSubProducts: selectedSubProducts,
            });
            
            setSnackBarMessage('Selection saved successfully!');
        } catch {   
            setSnackBarMessage('Some error occurred :(');
        }        
        setSnackBar(true);
    }

    return (
        <> 
            {
                modalView && 
                <div 
                    style={ComponentStyles.common.modalContainer}>
                    <div style={ComponentStyles.common.modalBox}>
                        <div>
                            <h3>Products</h3>
                            {selectedProductNames}

                            <h3>Sub-Categories</h3>
                            {selectedSubCategoriesNames}

                            <h3>Sub-Products</h3>
                            {selectedSubProductsName}
                        </div>
                        
                        <div style={{
                                display: 'flex', 
                                justifyContent: 'space-between',
                                paddingTop: '1em',
                                margin: '1em',
                            }}>
                            <button 
                                style={ComponentStyles.common.cancelButton}
                                onClick={toggleModal}
                            >CLOSE</button>
                            <button 
                                style={ComponentStyles.common.saveButton}
                                onClick={saveSelectedView}
                            >SAVE</button>
                        </div>
                        <Snackbar
                            open={snackBar}
                            autoHideDuration={3000}
                            onClose={handleSnackBarClose}
                            message={snackBarMessage}
                        />
                    </div>
                </div>
            }
        </>
    );
}
