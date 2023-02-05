import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { IAnimal } from "../../../model/IAnimal";
import { calcAge, ShowAge } from "../../../utils/shared-functions";

type TCurrentAnimalState = {
  animal: IAnimal | null;
  loading: boolean;
  error: boolean;
};

export const AnimalCardDetail = () => {
  const params = useParams();
  const location = useLocation();

  const _id = params._id;

  const animal: IAnimal = location.state;

  const [currentAnimalState, setCurrentAnimalState] =
    useState<TCurrentAnimalState>({
      animal,
      loading: false,
      error: false,
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
  }, []);

  return (
    <div className="animal-details">
      {currentAnimalState.loading && "Loading"}
      {currentAnimalState.error && "Error loading "}
      {currentAnimalState.animal &&
        /*The id for the selected pet is "${currentAnimalState.animal._id}"*/
        ` ${ShowAge(calcAge(currentAnimalState.animal.birthDate))}`}
    </div>
  );
};

/* last pet created Luca is still not born  */
