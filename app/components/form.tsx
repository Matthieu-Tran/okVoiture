"use client";

import React, { SyntheticEvent } from "react";
import { useState, useEffect } from "react";
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
  const [brandcar, setBrandCar] = useState("");
  const [modelcar, setModelCar] = useState("");
  const [yearcar, setYearCar] = useState("");
  const [citycar, setLaVille] = useState("Anaa");
  const [ville, setVille] = useState<string[]>([]);
  const [priceperdaycar, setPrix] = useState<number>(0);

  //This constant will disable the button while data is being processed
  const [isDisabled, setIsDisabled] = useState(false);

  interface Ville {
    nom: string;
  }

  // This function fetch the geo.api in order to get the city from French Polynesia
  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://geo.api.gouv.fr/departements/987/communes"
      );
      const data = await response.json();
      const nomVille = data.map((obj: { nom: string }) => obj.nom);
      setVille(nomVille);
    } catch (error) {
      console.log(error);
    }
  };

  // This will fetch data everytime the page renders
  useEffect(() => {
    fetchData();
  }, []);

  interface CarModels {
    [key: string]: string[];
  }
  //This match the car brands to their specific models
  const carModels: CarModels = {
    Audi: ["« Choisissez »", "A3", "A4", "Q5"],
    BMW: ["« Choisissez »", "Series 3", "Series 5", "X5"],
    Citroen: ["« Choisissez »", "C3", "C4 Cactus", "C5 Aircross"],
    Fiat: ["« Choisissez »", "500", "Tipo", "Panda"],
    Ford: ["« Choisissez »", "Focus", "Fiesta", "Mustang"],
    MercedesBenz: ["« Choisissez »", "C-Class", "E-Class", "S-Class"],
    Opel: ["« Choisissez »", "Corsa", "Astra", "Insignia"],
    Peugeot: ["« Choisissez »", "208", "308", "3008"],
    Renault: ["« Choisissez »", "Clio", "Megane", "Kadjar"],
    Volkswagen: ["« Choisissez »", "Golf", "Passat", "Tiguan"],
    // Ajouter d'autres modèles en fonctions des voitures
  };

  // Creating a car with all the differents parameters
  const { mutate } = useMutation(
    async (formData: {
      title: string;
      nameRenter: string;
      firstNameRenter: string;
      descriptionCar: string;
      emailRenter: string;
      brandcar: string;
      modelcar: string;
      yearcar: string;
      citycar: string;
      priceperdaycar: number;
    }) => {
      await axios.post("/api/cars/addCars", {
        title,
        nameRenter,
        firstNameRenter,
        descriptionCar,
        emailRenter,
        brandcar,
        modelcar,
        yearcar,
        citycar,
        priceperdaycar,
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
        toast.success("Votre annonce a bien été publié");
        setTitle("");
        setName("");
        setFirstName("");
        setDescriptionCar("");
        setBrandCar("");
        setModelCar("");
        setYearCar("");
        setLaVille("Anaa");
        setPrix(0);
        setIsDisabled(false);
      },
    }
  );

  //When the user click on the button, then we send a request to the API with all the differents parameters
  const submitCar = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsDisabled(true);
    mutate({
      title,
      nameRenter,
      firstNameRenter,
      descriptionCar,
      emailRenter,
      brandcar,
      modelcar,
      yearcar,
      citycar,
      priceperdaycar,
    });
  };

  //This will generate the model options depending on what the user chosed for the car brand
  const generateModelOptions = (): React.ReactNode => {
    const models = carModels[brandcar] || [];
    return models.map((model) => (
      <option key={model} value={model}>
        {model}
      </option>
    ));
  };

  // This function prevent the user from putting negative values
  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "-") {
      event.preventDefault();
    }
    if (event.key === ".") {
      event.preventDefault();
    }
  }

  return (
    <form
      onSubmit={submitCar}
      className="bg-white m-8 p-8 rounded-md w-full max-w-lg mx-auto"
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

      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Marque
          </label>
          <select
            className="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight"
            id="grid-first-name"
            name="brandCar"
            onChange={(e) => setBrandCar(e.target.value)}
            value={brandcar}
          >
            {/*
            Je n'ai mis ici que les marques courantes que l'on retrouve sur le marché mais bien sur, il faudra mettre toutes les marques industrielles présentes sur le marché

            Note for letter: remember to send an error if the brand is empty
            */}
            <option value="">« Choisissez »</option>
            <option>Audi</option>
            <option>BMW</option>
            <option>Citroen</option>
            <option>Fiat</option>
            <option>Ford </option>
            <option>MercedesBenz </option>
            <option>Opel </option>
            <option>Peugeot</option>
            <option>Renault </option>
            <option>Volkswagen </option>
            <option>Autre</option>
          </select>
        </div>
        <div className="w-full md:w-1/2 px-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Modèle
          </label>
          <select
            className="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight"
            id="grid-first-name"
            name="modelCar"
            disabled={!brandcar}
            onChange={(e) => {
              setModelCar(e.target.value);
            }}
            value={modelcar}
          >
            {/*
            This function attributes for each brand chosen the right car model 
            */}
            {generateModelOptions()}
          </select>
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Année
          </label>
          <select
            className="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight"
            id="grid-first-name"
            name="yearCar"
            onChange={(e) => setYearCar(e.target.value)}
            value={yearcar}
          >
            <option value="">« Choisissez »</option>
            <option>2023</option>
            <option>2022</option>
            <option>2021</option>
            <option>2020</option>
            <option>2019</option>
            <option>2018</option>
            <option>2017</option>
            <option>2016</option>
            <option>2015</option>
            <option>2014</option>
            <option>2013</option>
            <option>2012</option>
            <option>2011</option>
            <option>2010</option>
            <option>2009</option>
            <option>2008</option>
            <option>2007</option>
            <option>2006</option>
            <option>2005</option>
            <option>2004</option>
            <option>2003</option>
            <option>2002</option>
            <option>2001</option>
            <option>2000</option>
            <option>1999 ou avant</option>
          </select>
        </div>
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Ville
          </label>
          <select
            className="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight"
            id="grid-first-name"
            name="ville"
            onChange={(e) => {
              setLaVille(e.target.value);
            }}
            value={citycar}
          >
            {ville &&
              ville.map((ville: string) => (
                <option key={ville} value={ville}>
                  {ville}
                </option>
              ))}
          </select>
        </div>
      </div>

      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
        Prix par jour
      </label>
      <div className="w-full md:w-1/2 px-3 mb-6 pb-3 mx-auto md:mb-0 flex items-center">
        <div className="flex-grow">
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-price"
            type="number"
            onKeyDown={handleKeyDown}
            onChange={(e) => {
              // Converting the string to an int
              const prixFloat = parseFloat(e.target.value);
              setPrix(prixFloat);
            }}
            value={priceperdaycar}
          />
        </div>
        <div className="ml-2">
          <span className="text-gray-500 sm:text-sm">F</span>
        </div>
      </div>

      {/*
        The image upload functionnality is not yet implemented but it will be in the future
        It will intergrate Amazon S3 Buckets
      */}
      {/* <div>
        <label className="block text-sm font-medium leading-6 text-gray-900">
          Photo de la voiture
        </label>
        <div className="mt-2 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
          <div className="space-y-1 text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <div className="flex text-sm text-gray-600">
              <label className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500">
                <span>Ajoutez une image</span>
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  className="sr-only"
                />
              </label>
            </div>
            <p className="text-xs text-gray-500">PNG, JPG, GIF jusqu'à 10MB</p>
          </div>
        </div>
      </div> */}
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
