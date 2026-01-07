import DogList from "../components/dogs/DogList";
import Header from "../components/layout/Header";

const HomePage = () => {
    return (
        <>
            <Header />

            <div className="container layout">
                <aside className="links" aria-label="Przydatne linki">
                    <h2>Przydatne linki</h2>
                    <ul>
                        <li><a href="#o-nas">O nas</a></li>
                        <li><a href="#adopcje">Dostępne psy</a></li>
                        <li><a href="#procedura">Procedura</a></li>
                        <li><a href="#formularz">Formularz</a></li>
                    </ul>
                </aside>

                <main id="main" className="content">
                    <section id="o-nas">
                        <h2>O nas</h2>
                        <p>Bezpieczny dom tymczasowy.</p>
                    </section>

                    <section id="adopcje">
                        <h2>Nasze pieski</h2>
                            <DogList url="http://localhost:3001/api/dogs" />
                    </section>

                    <section id="procedura">
                        <h2>Procedura</h2>
                        <ul>
                            <li>Wizyta</li>
                            <li>Wywiad</li>
                            <li>Umowa</li>
                        </ul>
                        <ol>
                            <li>Wybierz psa</li>
                            <li>Wypełnij formularz</li>
                            <li>Poczekaj na kontakt</li>
                        </ol>
                    </section>

                    <figure className="photo">
                        <img
                            src="https://picsum.photos/id/237/900/500"
                            alt="Pies czekający na dom"
                        />
                        <figcaption>Kawka na spacerze – czeka na dom.</figcaption>
                    </figure>

                    {/* <section id="formularz">
                        <h2>Formularz adopcyjny</h2>
                        <p style={{ fontSize: "0.9rem", color: "#6b7280", marginTop: 0 }}>
                            Skrócona wersja formularza. Pełny formularz znajdziesz na osobnej stronie.
                        </p>

                        <form noValidate>
                            <div className="field">
                                <label htmlFor="name">Imię i nazwisko</label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    autoComplete="name"
                                    required
                                    minLength={2}
                                    maxLength={60}
                                />
                                <p className="error-msg" aria-live="polite"></p>
                            </div>

                            <div className="field">
                                <label htmlFor="email">E-mail</label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                />
                                <p className="error-msg" aria-live="polite"></p>
                            </div>

                            <div className="field">
                                <label htmlFor="dog">Wybrany piesek (opcjonalnie)</label>
                                <input id="dog" name="dog" type="text" list="dogs-list" />
                                <datalist id="dogs-list">
                                    <option value="Bobik" />
                                    <option value="Pixel" />
                                    <option value="Mafi" />
                                </datalist>
                                <p className="error-msg" aria-live="polite"></p>
                            </div>

                            <div className="field">
                                <label htmlFor="message">Krótka wiadomość</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={4}
                                    placeholder="Np. warunki w domu, doświadczenie z psami…"
                                />
                                <p className="error-msg" aria-live="polite"></p>
                            </div>

                            <div className="actions">
                                <button type="submit">Wyślij (makieta)</button>
                                <a href="adoption.html" className="btn-secondary">
                                    Pełny formularz
                                </a>
                            </div>
                        </form>
                    </section> */}
                </main>
            </div>
        </>
    );
};

export default HomePage;
