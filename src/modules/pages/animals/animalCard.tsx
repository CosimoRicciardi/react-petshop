import { IAnimal } from "../../../model/IAnimal";
import { Link } from "react-router-dom";

type Props = {
  animal: IAnimal;
};

export const AnimalCard = (props: Props) => {
  const animal = props.animal;

  return (
    <div className="animal-card">
      <b>Name: {animal.name}</b>
      <p>Breed: {animal.breed}</p>
      <p>Type: {animal.type}</p>
      <p>BirthDate: {animal.birthDate}</p>
      <Link to={`/animal/${animal._id}`} state={animal}>
        <b>Detail(only age for now)</b>
      </Link>
    </div>
  );
};
