import AdoptionCreateForm from "../components/adoptions/AdoptionCreateForm";

const AdoptionPage = () => {
    return (
        <>
            <header className="site-header">
                <h1>Schronisko pod palmą</h1>
                <p>Adoptuj. Pomagaj.</p>
            </header>

            <main className="container">
                <header className="page-header">
                    <h1>Formularz adopcyjny</h1>
                </header>

                <AdoptionCreateForm />
            </main>
        </>
    );
};

export default AdoptionPage;