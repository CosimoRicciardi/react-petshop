export interface IAnimal {
  _id: number | null;
  name: string;
  type: "CAT" | "DOG" | "";
  breed: string;
  birthDate: string;
}

export interface IAnimalExtended extends IAnimal {
  created_at: string;
  updated_at: string;
}
