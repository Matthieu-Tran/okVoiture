'use client'

import React from 'react'
import { useState } from 'react'
// Allows to mutate something whereas it's creating, deleting or changing data
import {useMutation, useQueryClient} from "@tanstack/react-query"
import axios from "axios"
  
export default function AddCarForm() {
    const [title, setTitle] = useState("")
    const [isDisabled, setIsDisabled] = useState(false)
    // Creating a form
    const {mutate} = useMutation(
        async (title: string) => 
        await axios.post('/api/cars/addCars', 
        {title}
        ),
        {
            onError: (error) =>{
                console.log(error);
                console.log("erreur")
            },
            onSuccess:(data) =>{
                console.log("bonjour")
                console.log(data);
                setTitle("");
                setIsDisabled(false);
            }
        }
        
    )
    const submitCar = async (e: React.FormEvent) =>{
        e.preventDefault()
        setIsDisabled(true)
        mutate(title)
    }

    return (
        <form onSubmit={submitCar} className='bg-white m-8 p-8 rounded-md'>
        <div className='flex flex-col'>
                <textarea 
                    onChange={(e) => setTitle(e.target.value)}
                    name="title" 
                    value={title} 
                    placeholder="Hello" 
                    className='bg-gray-200 p-4 rounded-md'>
                </textarea>
        </div>
        <div className='flex items-center justify-between gap'>
                <p className={`font-bold text-sm ${title.length > 300 ? "text-red-700" : "text-black"}`}>
                    {`${title.length}/300`}
                </p>
                <button
                disabled={isDisabled}
                className="text-sm bg-teal-600 text-white p-2 mt-2 rounded-lg disabled:opacity-75"
                type="submit"
                >
                Créer votre annonce
                </button>
        </div>
        </form>
    )
}
