import { IAnimal } from "../../../model/IAnimal";
import { Link } from "react-router-dom";

type Props = {
  animal: IAnimal;
};

export const AnimalCard = (props: Props) => {
  const animal = props.animal;

  return (
    <div className="animal-card">
      <div className="preview">
        <img src={animal.imgUrl} alt="" />{" "}
      </div>
      <b>Name: {animal.name}</b>
      <p>Type: {animal.type}</p>
      
      <Link to={`/animal/${animal._id}`} state={animal}>
        <button>Details</button>
      </Link>
    </div>
  );
};
