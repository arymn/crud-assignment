"use server";

import { CreateItemSchema, UpdateItemSchema } from "@/schemas/schema";
import { z } from "zod";

export const getItems = async (page: number = 1) => {
  try {
    const response = await fetch(
      `http://localhost:3000/pictures?_page=0&_per_page=6`
    )
    console.log("url path", `${process.env.HOST_URL}/pictures?_page=${page}&_per_page=6`)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const pictureData = await response.json()

    const picturesWithDetails = await Promise.all(pictureData.map( async (picture)=>{
      const albumDetailsResponse = await fetch(`${process.env.HOST_URL}/albums/${picture.id}`);
      
      if(!albumDetailsResponse.ok){
        return null
      }
      const albumDetailsData = await albumDetailsResponse.json(); 
      return {...picture, album: albumDetailsData
    }))

    return { data: picturesWithDetails};
  } catch (error) {
    return { error };
  }
};

export const getItem = async (id: number) =>{
  try{
    const response = await fetch(`${process.env.HOST_URL}/pictures/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
   return {data: await response.json()}

  }catch(error) {
    return {error}
  }
}

export const addItem = async (data: z.infer<typeof CreateItemSchema>) => {
  try{
    const requestBody = CreateItemSchema.parse(data)
    const response = await fetch(`${process.env.HOST_URL}/pictures`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody) 
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return {message: "Created Successfully", data: await response.json()}
  }catch(error){
    return {error}
  }
}

export const updateItem = async (id: number, data: z.infer<typeof UpdateItemSchema>)=>{
  try{
    const requestBody = UpdateItemSchema.parse(data)
    const response = await fetch(`${process.env.HOST_URL}/pictures/${id}`,
    {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    })
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return {message: "Updated Successfully", data: await response.json()}

  }catch(error){
    return {error}
  }
}

export const deleteItem = async (id: number)=>{
  try{
    const response = await fetch(`${process.env.HOST_URL}/pictures/${id}`, {
      method: "DELETE"
    })

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return {message: "Deleted Successfully", data: id}
  }catch(error){
    return {error}
  }
}