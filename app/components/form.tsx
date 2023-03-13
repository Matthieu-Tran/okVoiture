"use client";

import React from "react";
import { useState } from "react";
// Allows to mutate something whereas it's creating, deleting or changing data
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

export default function AddCarForm(props: any) {
  const { session } = props;
  const emailRenter: string = session?.user.email;
  const [title, setTitle] = useState("");
  const [nameRenter, setName] = useState("");
  const [firstNameRenter, setFirstName] = useState("");
  const [descriptionCar, setDescriptionCar] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);

  // Creating a form
  const { mutate } = useMutation(
    async (formData: {
      title: string;
      nameRenter: string;
      firstNameRenter: string;
      descriptionCar: string;
      emailRenter: string;
    }) => {
      const {
        title,
        nameRenter,
        firstNameRenter,
        descriptionCar,
        emailRenter,
      } = formData;
      await axios.post("/api/cars/addCars", {
        title,
        nameRenter,
        firstNameRenter,
        descriptionCar,
        emailRenter,
      });
    },
    {
      onError: (error) => {
        if (error instanceof AxiosError) {
          toast.error(error?.response?.data.message);
        }
        setIsDisabled(false);
      },
      onSuccess: (data) => {
        toast.success("Your car has been sent");
        setTitle("");
        setIsDisabled(false);
      },
    }
  );
  const submitCar = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsDisabled(true);
    mutate({
      title,
      nameRenter,
      firstNameRenter,
      descriptionCar,
      emailRenter,
    });
  };

  return (
    <form
      onSubmit={submitCar}
      className="bg-white m-8 p-8 rounded-md w-full max-w-lg"
    >
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Titre
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            onChange={(e) => setTitle(e.target.value)}
            name="title"
            value={title}
            id="grid-email"
            type="text"
          />
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Prénom
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-first-name"
            name="firstnamerenter"
            type="text"
            onChange={(e) => setFirstName(e.target.value)}
            value={firstNameRenter}
          />
        </div>
        <div className="w-full md:w-1/2 px-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Nom
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-last-name"
            onChange={(e) => setName(e.target.value)}
            name="namerenter"
            value={nameRenter}
            type="text"
          />
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Email
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight disabled:opacity-50 disabled:cursor-not-allowed"
            id="grid-email"
            type="text"
            name="emailrenter"
            value={emailRenter}
            disabled
          />
        </div>
      </div>
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
        Description
      </label>
      <div className="flex flex-col">
        <textarea
          onChange={(e) => setDescriptionCar(e.target.value)}
          name="descriptionCar"
          value={descriptionCar}
          placeholder="Rédigez une description d'annonce"
          className="bg-gray-200 p-4 rounded-md"
        ></textarea>
      </div>
      <p
        className={`font-bold text-sm ${
          descriptionCar.length > 300 ? "text-red-700" : "text-black"
        }`}
      >
        {`${descriptionCar.length}/300`}
      </p>
      <hr className="my-12 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:opacity-100" />
      <div className="flex items-center justify-between gap">
        <button
          disabled={isDisabled}
          className="text-sm bg-teal-600 text-white p-2 mt-2 rounded-lg disabled:opacity-75"
          type="submit"
        >
          Ajouter votre annonce
        </button>
      </div>
    </form>
  );
}
