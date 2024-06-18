import CSS from 'csstype';

const SubProductCardStyle: CSS.Properties = {
    paddingTop: '0.5em',
    paddingRight: '0.4em',
    paddingLeft: '0.4em',
    paddingBottom: '0.4em',
    color: 'white',
    background: '#a09c9c',
};

const SubProductSearchDropDown: CSS.Properties = {
    color: 'black',
    paddingTop: '1em',
    background: '#f0ecec',
    
};

export const SubProductStyles = {
    card: SubProductCardStyle,
    searchDropDown: SubProductSearchDropDown,
} as const;
