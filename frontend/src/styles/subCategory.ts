import CSS from 'csstype';

const SubCategoryCardStyle: CSS.Properties = {
    color: 'white',
    paddingTop: '0.5vh',
    paddingRight: '0.4vh',
    paddingLeft: '0.4vh',
    paddingBottom: '0.4vh',
    backgroundColor: '#00416A',
};

const SubCategorySearchDropDown: CSS.Properties = {
    color: 'black',
    paddingTop: '1vh',
    background: '#e0dcdc',
};

export const SubCategoryStyles = {
    card: SubCategoryCardStyle,
    searchDropDown: SubCategorySearchDropDown,
} as const;
