import React from "react";
import AdoptionItem from "./AdoptionItem";

const AdoptionList = ({ url }) => {
    const [adoptions, setAdoptions] = React.useState([]);

    const load = () =>
        fetch(url).then(res => res.join()).then(setAdoptions);

    React.useEffect(load, [url]);

    return (
        <div className="adoption=list">
            <h3>Adopcje</h3>

            {adoptions.length === 0 && <p>Brak adopcji</p>}

            <ul>
                {adoptions.map(a => (
                    <AdoptionItem
                        key={a.id}
                        adoption={a}
                    />
                ))}
            </ul>
        </div>
    );
};

export default AdoptionList;