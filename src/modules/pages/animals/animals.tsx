import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

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

  const { register, watch } = useForm({
    mode: "onChange",
    defaultValues: undefined,
  });

  /*La funzionalità di search è ancora molto primordiale, restituisce solo il primo animale trovato per nome, non tenendo conto di eventuali omonimi.
  Cercherò di modificarla in maniera tale che, scrivendo una query nella searchbox, animal list viene ri-renderizzata solo con le card che contengono 
  la query nel nome */
  
  const watchBar = watch("searchbox");

  const petFound = animalsState.animals?.find((pet) => {
    return pet.name.toLowerCase() === watchBar.toLowerCase();
  });

  const navigate = useNavigate();

  const search = (event: any) => {
    if (event.keyCode === 13 || event.type === "click") {
      navigate(`/animal/${petFound?._id} `);
    }
  };

  return (
    <div className="animals">
      <h1>Animals</h1>
      <label htmlFor="search" id="search">
        Search for your pet:
        <br></br>
      </label>
      <input
        type="searchbox"
        {...register("searchbox", {})}
        placeholder="Pet's name"
        onKeyDown={search}
      ></input>
      <button className="searchbutton"onClick={search} disabled={!petFound}>Search</button>
      {!petFound && watchBar?.length > 0 && " No pet found"}
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
