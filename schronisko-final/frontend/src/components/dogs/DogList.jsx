import React from "react";
import DogItem from "./DogItem";

const DogList = ({ url }) => {
    const [dogs, setDogs] = React.useState([]);

    React.useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => setDogs(data));
    }, [url]); // url jako dependency

    return (
        <div className="dog-list">
            {dogs.map(dog => (
                <DogItem key={dog.id} dog={dog} />
            ))}
        </div>
    );
};

export default DogList;
