import CSS from 'csstype';
const SubCategoryCardStyle: CSS.Properties = {
    color: 'white',
    paddingTop: '0.5em',
    paddingRight: '0.4em',
    paddingLeft: '0.4em',
    paddingBottom: '0.4em',
    backgroundColor: '#00416A',
};

const SubCategorySearchDropDown: CSS.Properties = {
    color: 'black',
    paddingTop: '1em',
    background: '#e0dcdc',
};

export const SubCategoryStyles = {
    card: SubCategoryCardStyle,
    searchDropDown: SubCategorySearchDropDown,
} as const;
