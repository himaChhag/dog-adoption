import React, { useEffect, useState } from "react";

import { Dog } from "../types";
import { fetchDog } from "../api.ts";
import { DogCardProps } from "../types.ts";

const DogCard: React.FC<DogCardProps> = ({ dogId, onFavorite, isFavourite }) => {
  const [dog, setDog] = useState<Dog | null>(null);

  useEffect(() => {
    const fetchDogDetails = async () => {
      const cached = localStorage.getItem(`dog-${dogId}`);
      if (cached) {
        try {
          const parsedDog = JSON.parse(cached);
          setDog(parsedDog);
          return;
        } catch (err) {
          console.warn("Failed to parse dog from localStorage", err);
        }
      }
      const response = await fetchDog(dogId);
      setDog(response);
      localStorage.setItem(`dog-${dogId}`, JSON.stringify(response));
    };

    fetchDogDetails();
  }, [dogId]);

  if (!dog) return <div>Loading...</div>;

  return (
    <div className="dog-card" role="article" id={`dog-card-${dog.id}`} tabIndex={0}>
      <div className="dog-image">
        <img src={dog.img} alt={`${dog.name}, ${dog.breed}`} />
      </div>
      <div className="dog-details">
      <h3>{dog.name}</h3>
      <p>Age: {dog.age}</p>
      <p>Breed: {dog.breed}</p>
      <p>Zip Code: {dog.zip_code}</p>
      {onFavorite && isFavourite && (
        <button
          onClick={() => onFavorite(dog.id)}
          aria-label={`Remove ${dog.name} from your favorites`}
        >
          {'Remove from Favourite'}
        </button>
      )}

      {onFavorite && !isFavourite && (
        <button
          onClick={() => onFavorite(dog.id)}
          aria-label={`Add ${dog.name} to your favorites` }
        >
          { 'Add to Favourite'}
        </button>
      )}
      </div>

    </div>
  );
};

export default DogCard;