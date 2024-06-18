import CSS from 'csstype';

const SubProductCardStyle: CSS.Properties = {
    paddingTop: '0.5vh',
    paddingRight: '0.4vh',
    paddingLeft: '0.4vh',
    paddingBottom: '0.4vh',
    color: 'white',
    background: '#a09c9c',
};

const SubProductSearchDropDown: CSS.Properties = {
    color: 'black',
    paddingTop: '1vh',
    background: '#f0ecec',
    
};

export const SubProductStyles = {
    card: SubProductCardStyle,
    searchDropDown: SubProductSearchDropDown,
} as const;
