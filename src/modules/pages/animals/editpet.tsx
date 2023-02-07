import { useLocation } from "react-router-dom";
import { IAnimal } from "../../../model/IAnimal";

import { PetForm } from "./petform";

export const EditPet = () => {
  const location = useLocation();
  const animal: IAnimal = location.state;

  return (
    <div>
      <PetForm defaultValues={animal}   />
    </div>
  );
};
