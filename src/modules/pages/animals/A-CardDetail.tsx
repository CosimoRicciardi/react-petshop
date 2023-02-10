import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useLocation, Link, useNavigate } from "react-router-dom";
import { IAnimal } from "../../../model/IAnimal";
import { calcAge, ShowAge } from "../../../utils/shared-functions";

export type TCurrentAnimalState = {
  animal: IAnimal | null;
  loading: boolean;
  error: boolean;
  saving: boolean;
  deleting: boolean;
  buttonclicked: boolean;
};

export const AnimalCardDetail = () => {
  const params = useParams();
  const location = useLocation();

  const _id = params._id;
  const animal: IAnimal = location.state;
  const navigate = useNavigate();


  const [currentAnimalState, setCurrentAnimalState] =
    useState<TCurrentAnimalState>({
      animal,
      loading: false,
      error: false,
      deleting: false,
      saving: false,
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
  const deleteAnimal = async () => {
    setCurrentAnimalState({
      ...currentAnimalState,
      deleting: true,
    });
    try {
      const res = await axios.delete(`http://localhost:3000/animal/${_id}`);
      setCurrentAnimalState({
        ...currentAnimalState,
        error: false,
        deleting: false,
      });
    
      if (res.data === true) {
      }
      navigate(`/animal`);
    } catch (error) {
      setCurrentAnimalState({
        ...currentAnimalState,
        deleting: false,
        error: true,
      });
      console.log(error);
    }
  };

  const confirmFunction = () => {
    setCurrentAnimalState({
      ...currentAnimalState,
      buttonclicked: !currentAnimalState.buttonclicked,
    });
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
      
        <div className="animal-details">
          <div className="preview">
            <img src={currentAnimalState.animal.imgUrl} alt="" />{" "}
          </div>
          <br></br>
          <b>Name: {currentAnimalState.animal.name}</b>
          <p>Id: {currentAnimalState.animal._id}</p>
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
              <button>Edit</button>
            </Link>
          </div>
          <div>
            <button
              onClick={confirmFunction}
              disabled={currentAnimalState.deleting}
            >
              Delete
            </button>
          </div>
          {currentAnimalState.error && "Error deleting animal"}
          {currentAnimalState.buttonclicked && (
            <div>
              <br></br>
              Are you sure you want to delete?
              <div>
                <button onClick={deleteAnimal}>Yes</button>
                <br></br>
                <button onClick={confirmFunction}>No</button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
