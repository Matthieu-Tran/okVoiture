"use client";

import React from "react";
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
  const [ville, setVille] = useState<string[]>([]);
  interface Ville {
    nom: string;
  }
  useEffect(() => {
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
    fetchData();
  }, []);

  const [isDisabled, setIsDisabled] = useState(false);
  interface CarModels {
    [key: string]: string[];
  }

  const carModels: CarModels = {
    Audi: ["A3", "A4", "Q5"],
    BMW: ["Series 3", "Series 5", "X5"],
    Citroen: ["C3", "C4 Cactus", "C5 Aircross"],
    Fiat: ["500", "Tipo", "Panda"],
    Ford: ["Focus", "Fiesta", "Mustang"],
    MercedesBenz: ["C-Class", "E-Class", "S-Class"],
    Opel: ["Corsa", "Astra", "Insignia"],
    Peugeot: ["208", "308", "3008"],
    Renault: ["Clio", "Megane", "Kadjar"],
    Volkswagen: ["Golf", "Passat", "Tiguan"],
    // Ajouter d'autres modèles en fonctions des voitures
  };

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

  const generateModelOptions = (): React.ReactNode => {
    const models = carModels[brandcar] || [];
    return models.map((model) => (
      <option key={model} value={model}>
        {model}
      </option>
    ));
  };

  const generateVilleOptions = () => {
    return ville;
  };

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
            <option>Peugot</option>
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
      <div className="w-full md:w-1/2 mx-auto mb-6">
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
      <div className="w-full md:w-1/2 mx-auto mb-6">
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
          Ville
        </label>
        <select
          className="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight"
          id="grid-first-name"
          name="ville"
        >
          {ville &&
            ville.map((ville: string) => (
              <option key={ville} value={ville}>
                {ville}
              </option>
            ))}
        </select>
      </div>

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
