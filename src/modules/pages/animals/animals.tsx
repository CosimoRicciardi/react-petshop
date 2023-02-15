import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";

import { IAnimal } from "../../../model/IAnimal";

import { AnimalCard } from "./animalCard";

type TAnimalsState = {
  loading: boolean;
  error: boolean;
  animals: IAnimal[] | null;
};

export const Animals = () => {
  const [animalsState, setAnimalsState] = useState<TAnimalsState>({
    loading: false,
    error: false,
    animals: null,
  });
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredAnimals, setFilteredAnimals] = useState<IAnimal[] | null>([]);

  const fetchAnimals = async () => {
    setAnimalsState({
      ...animalsState,
      loading: true,
    });

    try {
      const res = await axios.get(`http://localhost:3000/animal`);
      const data: IAnimal[] = res.data;

      setAnimalsState({
        ...animalsState,
        animals: data,
        loading: false,
      });
    } catch (e) {
      setAnimalsState({
        ...animalsState,
        loading: false,
        error: true,
      });
    }
  };

  useEffect(() => {
    fetchAnimals();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = (event: any) => {
    const searchTerm = event.target.value.toLowerCase();

    setSearchTerm(searchTerm);

    if (searchTerm.length >= 2) {
      const filteredAnimals = animalsState.animals?.filter((animal) =>
        animal.name.toLowerCase().includes(searchTerm)
      );

      if (filteredAnimals) {
        setFilteredAnimals(filteredAnimals);
      }
    } else {
      setFilteredAnimals([]);
    }
  };

  return (
    <div className="animals">
      <h1>Animals</h1>
      <label htmlFor="search" id="search">
        Search for your pet:
      </label>
      <div>
        <input
          type="searchbox"
          placeholder="Type the pet's name"
          onChange={handleSearch}
        />

        {filteredAnimals?.length !== 0 && (
          <div className="animals-list">
            Pet(s) found:
            {filteredAnimals?.map((animal) => (
              <AnimalCard key={animal._id} animal={animal} />
            ))}
          </div>
        )}
        {filteredAnimals?.length === 0 && searchTerm.length > 2 && (
          <p className="not-found">No animals found</p>
        )}
      </div>

      <div className="animals-list">
        {animalsState.loading && "Loading"}
        {animalsState.error && "Error"}

        {animalsState.animals?.length === 0 && "No animals found"}
        {animalsState.animals?.map((animal) => (
          <AnimalCard key={animal._id} animal={animal} />
        ))}
      </div>
    </div>
  );
};
