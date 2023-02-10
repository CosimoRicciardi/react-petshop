export interface IAnimal {
  _id?: string;
  name: string;
  type: "CAT" | "DOG"| null;
  breed: string;
  birthDate: string;
  imgUrl: string,
  description: string,
  pedigree: boolean,
}

export interface IAnimalExtended extends IAnimal {
  created_at: string;
  updated_at: string;
}
