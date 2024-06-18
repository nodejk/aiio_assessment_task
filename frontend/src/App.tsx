import React from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Catalogue } from './components/Catalogue/Catalogue';
import { Modal } from './components/Modal/Modal';

function App() {
	return (
		<>
			<Header/>
				<div style={{
						justifyContent: 'center', 
						display: 'flex', 
						alignItems: 'center',
					}}>
					<Catalogue />
				</div>
			<Footer/>
			<Modal />
		</>
	);
}

export default App;
