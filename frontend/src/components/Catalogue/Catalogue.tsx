import React, { useEffect, useState } from 'react';
import { API } from '../../services';
import { useAppDispatch} from '../../store';
import { CatalogueActions } from '../../store/CatalogueStore';
import { ProductComponent } from '../Product/Product';
import { Product } from '../../models/Product';
import { ComponentStyles } from '../../styles';

type ProductState = Product & {
    checked: boolean
}

export function Catalogue() {
    const [productState, setProductState] = useState<ProductState[]>([]);
    const dispatch = useAppDispatch();

    useEffect(() => {
        async function fetchFromServer() {
            const productResponse = await API.Server.getAllProducts();

            const allProducts = productResponse.map((product) => {
                return {
                    ...product,
                    checked: false,
                };
            });

            setProductState(allProducts);
        }
        fetchFromServer();
    }, []);

    function onCheckBoxChange(value: boolean, productId: number) {
        const product = productState.find((prod) => prod.id === productId);
        
        if (product === undefined) {
            return;
        }

        if (value) {
            dispatch(CatalogueActions.addProductToSelection(product));
        } else {
            dispatch(CatalogueActions.removeProductFromSelection({productId}));
        }
    }

    function toggleModalView() {
        dispatch(CatalogueActions.toggleModalView());
    }

    return (
        <div style={ComponentStyles.catalogue.container}>

            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <h2 style={{textAlign: 'center', flex: 1}}>Products</h2>
                <button 
                    style={ComponentStyles.common.saveButton}
                    onClick={() => toggleModalView()}
                >DONE</button>
            </div>
            
            <div style={ComponentStyles.product.card}>
                {productState.map((product) => 
                    <ProductComponent
                        key={product.id}
                        onCheckBoxChange={onCheckBoxChange}
                        product={product} 
                    />,
                )}
            </div>
        </div>
    );
}
