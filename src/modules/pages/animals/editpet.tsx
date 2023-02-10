import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { IAnimal } from "../../../model/IAnimal";
import { TCurrentAnimalState } from "./A-CardDetail";

import { PetForm } from "./petform";

export const EditPet = () => {
  const location = useLocation();
  const params = useParams();
  const _id = params._id;
  const animal: IAnimal = location.state;

  const [currentAnimalState, setCurrentAnimalState] =
    useState<TCurrentAnimalState>({
      animal,
      loading: false,
      error: false,
      saving:false,
      deleting:false,
      buttonclicked: false,
    });

  const fetchAnimalById = async () => {
    setCurrentAnimalState({
      ...currentAnimalState,
      loading: true,
    });

    try {
      const res = await axios.get(`http://localhost:3000/animal/${_id}`);

      setCurrentAnimalState({
        ...currentAnimalState,
        loading: false,
        animal: res.data,
      });
    } catch (e) {
      setCurrentAnimalState({
        ...currentAnimalState,
        loading: false,
        error: true,
      });
    }
  };

  useEffect(() => {
    !animal && fetchAnimalById();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {currentAnimalState.loading && "Loading"}
      {currentAnimalState.error && "Error loading "}
      {currentAnimalState.animal && (
        <PetForm defaultValues={currentAnimalState.animal} />
      )}
    </div>
  );
};