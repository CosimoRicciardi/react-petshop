


export type TdefaultPet ={
  _id?:string,
  name: string,
  type: "CAT" | "DOG" | null,
  breed: string,
  birthDate: string,
  imgUrl: string,
  description: string,
  pedigree: boolean ,




}

export const defaultPet: TdefaultPet = {
  
  name: "",
  type: null,
  breed: "",
  birthDate: "",
  imgUrl: "",
  description: "",
  pedigree: false,
};