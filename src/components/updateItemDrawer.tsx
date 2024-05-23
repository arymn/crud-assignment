"use client"

import React, { FC, useEffect } from "react";
import { UpdateItemSchema, CreateItemSchema } from "@/schemas/schema";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addItem, updateItem } from "@/app/actions";

interface UpdateItemDrawerProps {
  children: React.ReactNode;
  itemData: z.infer<typeof CreateItemSchema> & {
    id: number
  }
}

type UpdateItemSchemaType = z.infer<typeof UpdateItemSchema>;

const UpdateItemDrawer: FC<UpdateItemDrawerProps> = ({ children, itemData }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateItemSchemaType>({
      defaultValues: itemData,
    resolver: zodResolver(UpdateItemSchema)
  })

  const onSubmit: SubmitHandler<UpdateItemSchemaType> = async (data) => {
    console.log(data);
    await updateItem(itemData.id, data )
  };

  return (
    <div className="drawer z-20">
      <input id={`my-drawer-${itemData.id}`} type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <label htmlFor={`my-drawer-${itemData.id}`} className="drawer-button ">
          <div>{children}</div>
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor={`my-drawer-${itemData.id}`}
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="menu p-4 w-1/3 min-h-full  bg-base-200 text-base-content">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full px-2  space-y-4 md:space-y-3"
          >
            <div>
              <label
                htmlFor="title"
                className="mb-2 block text-sm font-medium text-gray-500"
              >
                Title
              </label>
              <input
                {...register("title")}
                type="text"
                name="title"
                id="title"
                className="block w-full rounded-lg border border-accent bg-base-200 p-2.5 text-base-content focus:border-primary focus:ring-primary sm:text-sm "
                placeholder="Title"
                required
              />
            </div>
            <div>
              <label
                htmlFor="albumId"
                className="mb-2 block text-sm font-medium text-gray-500"
              >
                Album Id
              </label>
              <input
                {...register("albumId")}
                type="number"
                name="albumId"
                id="albumId"
                className="block w-full rounded-lg border border-accent bg-base-200 p-2.5 text-base-content focus:border-primary focus:ring-primary sm:text-sm"
                placeholder="Album Id"
                required
              />
            </div>
            <div>
              <label
                htmlFor="url"
                className="mb-2 block text-sm font-medium text-gray-500"
              >
                Image Url
              </label>
              <input
                {...register("url")}
                type="url"
                name="url"
                id="password"
                placeholder="Url"
                className="block w-full rounded-lg border border-accent bg-base-200 p-2.5 text-base-content focus:border-primary focus:ring-primary sm:text-sm"
                required
              />
              <label
                htmlFor="thumbnailUrl"
                className="mb-2 block text-sm font-medium text-gray-500"
              >
                Thumbnail Url
              </label>
              <input
                {...register("thumbnailUrl")}
                type="url"
                name="thumbnailUrl"
                id="thumbnailUrl"
                placeholder="Thumbnail Url"
                className="block w-full rounded-lg border border-accent bg-base-200 p-2.5 text-base-content focus:border-primary focus:ring-primary sm:text-sm"
                required
              />
            </div>

            <button type="submit" className="btn btn-accent w-full">
              Update Item
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateItemDrawer;
