"use server";

import { CreateItemSchema, UpdateItemSchema } from "@/schemas/schema";
import { Picture } from "@/types";
import { z } from "zod";

export const getItems = async (page: number = 1) => {
  try {
    const response = await fetch(
      `${process.env.HOST_URL}/pictures?_page=${page}&_per_page=6`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const pictureData = await response.json();

    const picturesWithDetails = await Promise.all(
      pictureData.data.map(async (picture: Picture) => {
        const albumDetailsResponse = await fetch(
          `${process.env.HOST_URL}/albums/${picture.albumId}`
        );

        if (!albumDetailsResponse.ok) {
          return { ...picture, album: { title: "No Album Found" } };
        }
        const albumDetailsData = await albumDetailsResponse.json();

        return { ...picture, album: albumDetailsData };
      })
    );
    console.log("pictures Data", {
      ...{ ...pictureData, data: picturesWithDetails },
    });

    return {
      ...{ ...pictureData, data: picturesWithDetails },
    };
  } catch (error) {
    return { error };
  }
};

export const getItem = async (id: number) => {
  try {
    const response = await fetch(`${process.env.HOST_URL}/pictures/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return { data: await response.json() };
  } catch (error) {
    return { error };
  }
};

export const addItem = async (data: z.infer<typeof CreateItemSchema>) => {
  try {
    console.log("dta", data);
    const requestBody = CreateItemSchema.parse(data);
    const response = await fetch(`${process.env.HOST_URL}/pictures`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return { message: "Created Successfully", data: await response.json() };
  } catch (error) {
    return { error };
  }
};

export const updateItem = async (
  id: number,
  data: z.infer<typeof UpdateItemSchema>
) => {
  try {
    const requestBody = UpdateItemSchema.parse(data);
    const response = await fetch(`${process.env.HOST_URL}/pictures/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return { message: "Updated Successfully", data: await response.json() };
  } catch (error) {
    return { error };
  }
};

export const deleteItem = async (id: number) => {
  try {
    const response = await fetch(`${process.env.HOST_URL}/pictures/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return { message: "Deleted Successfully", data: id };
  } catch (error) {
    return { error };
  }
};
