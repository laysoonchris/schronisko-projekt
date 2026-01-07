import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
    const { user, logout, loading } = useContext(AuthContext);

    if (loading) return null;

    return (
        <nav className="site-nav">
            <ul>
                <li><Link to="/">Strona główna</Link></li>
                <li><Link to="/dogs">Psy do adopcji</Link></li>
                <li><Link to="/adoption">Formularz adopcyjny</Link></li>

                {!user ? (
                    <li><Link to="/login">Zaloguj się</Link></li>
                ) : (
                    <>
                        {user?.role === "admin" && (
                            <>
                                <li><Link to="/admin/people">Zarządzanie Ludźmi</Link></li>
                                <li><Link to="/admin/dogs">Zarządzanie Psami</Link></li>
                                <li><Link to="/admin/adoptions">Zarządzanie Zgłoszeniami</Link></li>
                            </>
                        )}
                        <li><Link to="/profil">Profil</Link></li>
                        <li>
                            {user.email}
                            <button onClick={logout} style={{ marginLeft: "10px" }}>
                                Wyloguj
                            </button>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
