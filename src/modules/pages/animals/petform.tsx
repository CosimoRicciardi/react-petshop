import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

import { IAnimal } from "../../../model/IAnimal";
import axios from "axios";

type Tprops = {
  defaultValues: IAnimal;
};
type TPostAnimalState = {
  saving: boolean;
  error: boolean;
};
type TDeleteAnimalState = {
  deleting: boolean;
  error: boolean;
};

export const PetForm = (props: Tprops) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { isValid, errors },
  } = useForm({ mode: "onChange", defaultValues: props.defaultValues });
  const [animalState, setAnimalState] = useState<TPostAnimalState>({
    saving: false,
    error: false,
  });
  const [animalDelState, setAnimalDelState] = useState<TDeleteAnimalState>({
    deleting: false,
    error: false,
  });
  const navigate = useNavigate();

  const onSubmit = (data: IAnimal) => {
    console.log(data);
    const saveAnimal = async () => {
      setAnimalState({
        ...animalState,
        saving: true,
      });
      try {
        const res = props.defaultValues._id
          ? await axios.put(`http://localhost:3000/animal/:_id`, data)
          : await axios.post(`http://localhost:3000/animal`, data);
        setAnimalState({
          ...animalState,
          saving: false,
        });
        const _id = res.data._id;
        navigate(`/animal/${_id}`);
      } catch (error) {
        setAnimalState({
          ...animalState,
          saving: false,
          error: true,
        });
      }
    };
    saveAnimal();
  };

  const DeleteAnimal = async () => {
    setAnimalDelState({
      ...animalState,
      deleting: true,
    });
    try {
      const res = await axios.delete(
        `http://localhost:3000/animal/${props.defaultValues._id}`
      );
      setAnimalDelState({
        ...animalState,
        error: false,
        deleting: false,
      });
      console.log(res);
      if (res.data === true) {
      }
      navigate(`/animal`);
    } catch (error) {
      setAnimalDelState({
        ...animalState,
        deleting: false,
        error: true,
      });
      console.log(error);
    }
    DeleteAnimal();
  };

  const buttonText = props.defaultValues._id ? "Edit" : "Create the profile";
  const now = dayjs().format("YYYY-MM-DD");
  const watchImage = watch("imgUrl");
  const watchType = watch("type");
  return (
    <div>
      <h2>Add your pet to the PetShop</h2>
      <form>
        {" "}
        <div className="row">
          <label htmlFor="name"> Insert your pet's name: </label>
          <input
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
          <select {...register("type", { required: true })}>
            <option value="CAT">Cat</option>
            <option value="DOG">Dog</option>
          </select>
        </div>
        {watchType && (
          <div className="row">
            <label htmlFor="breed"> Breed: </label>
            <select
              {...register("breed", {
                required: { value: true, message: "Field required" },
              })}
            >
              {watchType === "CAT" ? (
                <>
                  <option value="">None</option>
                  <option value="Persian">Persian</option>
                  <option value="Abyssinian">Abyssinian</option>
                </>
              ) : (
                <>
                  <option value="">None</option>
                  <option value="Pinscher">Pinscher</option>
                  <option value="Pitbull">Pitbull</option>
                </>
              )}
            </select>
          </div>
        )}
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
        <div className="row">
          <label htmlFor="description"> Insert your pet's description: </label>
          <input
            {...register("description", {
              required: {
                value: true,
                message: " Please enter the description",
              },
              minLength: { value: 25, message: " Minimum 25 chars" },
            })}
            placeholder="Description"
          />
          {errors.description?.message}
        </div>
        <div className="row">
          <label htmlFor="image">Insert image url:</label>
          <input
            id="image"
            {...register("imgUrl", {
              required: { value: true, message: "Field required" },
            })}
            placeholder="Image"
          />
          {errors.imgUrl?.message}
        </div>
        <div className="row">
          {watchImage && (
            <img className="preview-image" src={watchImage} alt="" />
          )}
        </div>
        <div className="row">
          <label htmlFor="pedigree">Does he have a pedigree?</label>
          <input
            id="pedigree"
            type="checkbox"
            {...register("pedigree", {
              required: { value: false, message: "Field required" },
            })}
          />
        </div>
        <button
          className="formbutton"
          disabled={!isValid || animalState.saving}
          onClick={handleSubmit(onSubmit)}
        >
          {buttonText}
        </button>
      </form>

      <div className="button">
        {" "}
        {props.defaultValues.name && (
          <button
            className="formbutton"
            onClick={DeleteAnimal}
            disabled={animalDelState.deleting}
          >
            Delete
          </button>
        )}
      </div>
      {animalDelState.error && "Error deleting animal"}
    </div>
  );
};
