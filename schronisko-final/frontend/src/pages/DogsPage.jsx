import React from 'react';
import DogList from '../components/dogs/DogList.jsx';

const DogsPage = () => {
    return (
        <>
            <header className="site-header">
                <h1>Schronisko pod palmą</h1>
                <p>Adoptuj. Pomagaj.</p>
            </header>
            <main className="container">
                <header className="page-header">
                    <h1>Psy do adopcji</h1>
                </header>

                <div className="dogs-list">
                    
                    <DogList url="http://localhost:3001/api/dogs/free"/>

                    <div className="actions">
                        <a href="/adoption" className="btn">Złóż wniosek adopcyjny</a>
                    </div>
                                    </div>
            </main>
        </>
    )
};

export default DogsPage;