import CSS from 'csstype';

const CheckBoxStyle: CSS.Properties = {
    cursor: 'pointer',
    height: '1.13em',
    width: '1.13em',
};

const ListItemCard: CSS.Properties = {
    display: 'flex',
    paddingTop: '1em',
    paddingBottom: '1em',
    justifyContent: 'space-between',
    alignItems: 'center',
};

const SearchBar: CSS.Properties = {
    width: '100%',
    boxSizing: 'border-box',
    height: '3em',    
};

const DropDownWrapper: CSS.Properties = {     
    marginLeft: '1em',
    marginRight: '1em',
};

const SaveButton: CSS.Properties = {
    backgroundColor: '#04AA6D',
    border: 'none',
    color: 'white',
    padding: '0.5em 1em',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    cursor: 'pointer',
};

const CancelButton: CSS.Properties = {
    backgroundColor: '#f44336',
    border: 'none',
    color: 'white',
    padding: '0.5em 1em',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    cursor: 'pointer',
};

const ModalContainer: CSS.Properties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: '#00000099',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    justifyItems: 'center',
    backdropFilter: 'blur(5px)',
};


const ModalBox: CSS.Properties = {
    position:'fixed',
    alignSelf: 'center',
    background: 'white',
    padding: '2rem',
    margin: '1em',
    width: '30vw',
    top: '50veh',
    alignItems: 'center',
};

export const CommonStyles = {
    checkBox: CheckBoxStyle,
    listItemCard: ListItemCard,
    searchBar: SearchBar,
    dropDownWrapper: DropDownWrapper,
    saveButton: SaveButton,
    cancelButton: CancelButton,
    modalContainer: ModalContainer,
    modalBox: ModalBox,
} as const;
