import React from "react";
import { useForm } from "react-hook-form";
import { IAnimal } from "../../../model/IAnimal";
import { defaultPet } from "../../../utils/defaultPet";

import dayjs from "dayjs";

export const AddPet = () => {
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm({ mode: "onChange", defaultValues: defaultPet });
  const onSubmit = (data: IAnimal) => {
    console.log(data);
  };

  const now = dayjs().format("YYYY-MM-DD");
  return (
    <div>
      <h2>Add your pet to the PetShop</h2>
      <form>
        {" "}
        <div className="row">
          <label htmlFor="name"> Insert your pet's name: </label>
          <input
            id="name"
            {...register("name", {
              required: { value: true, message: " Please enter the name" },
              minLength: { value: 2, message: " Minimum 2 chars" },
            })}
            placeholder="Name"
          />
          {errors.name?.message}
        </div>
        <div className="row">
          <label htmlFor="type"> Cat or Dog? </label>
          <select
            {...register("type", { required: true })}
            placeholder="Insert wether is a cat or a dog"
          >
            <option value="cat">Cat</option>
            <option value="dog">Dog</option>
          </select>
        </div>
        <div className="row">
          <label htmlFor="breed"> Insert your pet's breed: </label>
          <input
            id="breed"
            {...register("breed", {
              required: { value: true, message: " Please enter the breed" },
            })}
            placeholder="Breed"
          />
          {errors.breed?.message}
        </div>
        <div className="row">
          <label htmlFor="birthDate">Insert the birthdate: </label>
          <input
            id="birthDate"
            type="date"
            max={now}
            {...register("birthDate", {
              required: { value: true, message: "Field required" },
            })}
            placeholder="Birthdate"
          />
          {errors.birthDate && errors.birthDate.message}
        </div>
        <button disabled={!isValid} onClick={handleSubmit(onSubmit)}>
          Create the profile
        </button>
      </form>
    </div>
  );
};
