import axios from "axios";
import { useEffect, useState } from "react";

import { IAnimal } from "../../../model/IAnimal";

import { AnimalCard } from "./animalCard";

type TAnimalState = {
  loading: boolean;
  error: boolean;
  animals: IAnimal[] | null;
};

export const Animals = () => {
  const [animalState, setAnimalState] = useState<TAnimalState>({
    loading: false,
    error: false,
    animals: null,
  });

  const fetchAnimals = async () => {
    setAnimalState({
      ...animalState,
      loading: true,
    });

    try {
      const res = await axios.get(`http://localhost:3000/animal`);
      const data: IAnimal[] = res.data;
      setAnimalState({
        ...animalState,
        animals: data,
        loading: false,
      });
    } catch (e) {
      setAnimalState({
        ...animalState,
        loading: false,
        error: true,
      });
    }
  };

  useEffect(() => {
    fetchAnimals();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="animals">
      <h1>Animals</h1>
      <div className="animals-list">
        {animalState.loading && "Loading"}
        {animalState.error && "Error"}

        {animalState.animals?.length === 0 && "No animals found"}
        {animalState.animals?.map((animal) => (
          <AnimalCard key={animal._id} animal={animal} />
        ))}
      </div>
    </div>
  );
};
