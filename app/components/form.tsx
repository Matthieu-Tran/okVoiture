'use client'

import React from 'react'
import { useState } from 'react'
// Allows to mutate something whereas it's creating, deleting or changing data
import {useMutation, useQueryClient} from "@tanstack/react-query"
import axios from "axios"
import { authOptions } from '../../pages/api/auth/[...nextauth]'

  
export default function AddCarForm() {
    
    const [title, setTitle] = useState("")
    const [name, setName] = useState("")
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
        <form onSubmit={submitCar} className='bg-white m-8 p-8 rounded-md w-full max-w-lg'>
        <div className='flex flex-col'>
                <textarea 
                    onChange={(e) => setTitle(e.target.value)}
                    name="title" 
                    value={title} 
                    placeholder="Hello" 
                    className='bg-gray-200 p-4 rounded-md'>
                </textarea>
        </div>
        <p className={`font-bold text-sm ${title.length > 300 ? "text-red-700" : "text-black"}`}>
        {`${title.length}/300`}
        </p>
        <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    First Name
                </label>
                <input 
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-first-name" 
                    type="text" 
                    onChange={(e)=> setName(e.target.value)}
                />
            </div>
            <div className="w-full md:w-1/2 px-3">
                <label 
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Last Name
                </label>
                <input 
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                    id="grid-last-name" 
                    type="text" 
                />
            </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                    Email
                </label>
                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="password" placeholder="******************"/>

            </div>
        </div>
       


        




        <div className='flex items-center justify-between gap'>
                
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
