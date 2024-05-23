import React, { FC } from "react";
import { CreateItemSchema } from "@/schemas/schema";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface CreateItemDrawerProps {
  children: React.ReactNode;
}

type CreateItemSchemaType = z.infer<typeof CreateItemSchema>;

const CreateItemDrawer: FC<CreateItemDrawerProps> = ({ children }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateItemSchemaType>({
    resolver: zodResolver(CreateItemSchema),
  });

  const onSubmit: SubmitHandler<CreateItemSchemaType> = async (data) => {
    console.log(data);
    await fetch("http://localhost:3000/pictures", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    reset();
  };

  return (
    <div className="drawer drawer-end z-10">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <label htmlFor="my-drawer-4" className="drawer-button ">
          <div>{children}</div>
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-4"
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
              Create Item
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateItemDrawer;
