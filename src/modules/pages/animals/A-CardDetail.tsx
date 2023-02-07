import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="animal-detail">
      {currentAnimalState.loading && "Loading"}
      {currentAnimalState.error && "Error loading "}
      {currentAnimalState.animal && (
        /*The id for the selected pet is "${currentAnimalState.animal._id}"*/
        <div className="animal-details">
          <div className="preview">
            <img src={currentAnimalState.animal.imgUrl} alt="" />{" "}
          </div>
          <b>Name: {currentAnimalState.animal.name}</b>
          <p>Breed: {currentAnimalState.animal.breed}</p>
          <p>Type: {currentAnimalState.animal.type}</p>
          <p>BirthDate: {currentAnimalState.animal.birthDate}</p>
          <p>Description: {currentAnimalState.animal.description}</p>
          <p>Pedigree: {currentAnimalState.animal.pedigree ? "yes" : "no"}</p>
          {ShowAge(calcAge(currentAnimalState.animal.birthDate))}
          <div>
            {" "}
            <Link
              to={`/animal/${currentAnimalState.animal._id}/edit`}
              state={currentAnimalState.animal}
            >
              <button >Edit</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
