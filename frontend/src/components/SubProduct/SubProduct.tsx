import React, { useState } from 'react';
import { SubProductStore } from '../../models/SubProduct';
import { ComponentStyles } from '../../styles';

interface Props {
    subProduct: SubProductStore,
    toggleCheckBoxChange: (value: boolean, subProductId: number) => void,
    subCategoryId: number,
}

export function SubProductComponent (props: Props) {
    const [subProductSelected, setSubProductSelected] = useState<boolean>(false);

    function checkBox(value: boolean) {
        setSubProductSelected(value);
        props.toggleCheckBoxChange(value, props.subProduct.id);

    }
    
    return (
        <div style={{
                ...ComponentStyles.common.listItemCard, 
                backgroundColor: '#e0e4e4', 
                marginTop: '0.9vh',
                paddingLeft: '1vh',
                paddingRight: '1vh',
            }}>
            <div>
                {props.subProduct.name}
            </div>
            <div>
                <input
                    style={ComponentStyles.common.checkBox}
                    type='checkbox'
                    checked={subProductSelected} 
                    onChange={(e) => checkBox(e.target.checked)}
                ></input>
            </div>
        </div>   
    ); 
}
