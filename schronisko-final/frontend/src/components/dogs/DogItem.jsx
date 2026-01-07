import React from "react";

const DogItem = ({ dog }) => {
    return (
        <div className="dog-item">
            <h3>{dog.name}</h3>
            <p>Rasa: {dog.breed}</p>
            <p>Wiek: {dog.age}</p>
        </div>
    );
};

export default DogItem;