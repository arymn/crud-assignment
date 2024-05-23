"use client";

import CreateItemDrawer from "@/components/createItemDrawer";
import Image from "next/image";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import ListItem from "@/components/ui/listItem";

export default function Home() {
  const [page, setPage] = useState(0);
  // const res = await fetch(
  //   "https://jsonplaceholder.typicode.com/photos?_limit=6&_page="
  // );
  // const photos = await res.json();

  const fetchPhotos = async (page: number = 0) => {
    return fetch(`http://localhost:3000/pictures?_page=1&_per_page=4`)
      .then((res) => {
        return res.json();
      })
      .catch((error) => {});
  };

  const { isPending, isError, error, data, isFetching, isPlaceholderData } =
    useQuery({
      queryKey: ["photos", page],
      queryFn: () => fetchPhotos(page),
      placeholderData: keepPreviousData,
    });

  useEffect(() => {
    console.log("Data", data);
  }, [data]);
  return (
    <main className="flex flex-col min-h-screen  items-center justify-between p-24">
      <div className="w-full max-w-5xl items-start justify-between font-mono text-sm flex flex-col gap-4">
        <h1 className="text-4xl font-bold">CRUD Application</h1>
        <div className="flex flex-col w-full">
          <div className="self-end w-1/4">
            <CreateItemDrawer>
              <span className="btn w-full  btn-primary">Create Item</span>
            </CreateItemDrawer>
          </div>
        </div>
        {/* <div className="flex flex-col gap-4">
          {data?.map((photo: any) => (
            <div key={photo.id}>
              <ListItem itemData={photo} />
            </div>
          ))}
        </div> */}
        <div className="overflow-x-auto w-full">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>Thumbnail</th>
                <th>Title</th>
                <th>Album Id</th>
              </tr>
            </thead>
            <tbody>
              {isPending ? (
                <tr>
                  <td colSpan={3}>Loading...</td>
                </tr>
              ) : data.data.length > 0 ? (
                data.data.map((photo: any) => (
                  <tr key={photo.id}>
                    <td>
                      <div className="avatar">
                        <Image
                          className="rounded-full"
                          src={photo.thumbnailUrl}
                          alt={photo.title}
                          width={40}
                          height={40}
                        />
                      </div>
                    </td>
                    <td>{photo.title}</td>
                    <td>{photo.albumId}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3}>No Data Found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="flex gap-2">
          <button
            className="btn btn-circle  btn-outline"
            onClick={() => setPage((old) => Math.max(old - 1, 0))}
            disabled={page === 0}
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.81809 4.18179C8.99383 4.35753 8.99383 4.64245 8.81809 4.81819L6.13629 7.49999L8.81809 10.1818C8.99383 10.3575 8.99383 10.6424 8.81809 10.8182C8.64236 10.9939 8.35743 10.9939 8.1817 10.8182L5.1817 7.81819C5.09731 7.73379 5.0499 7.61933 5.0499 7.49999C5.0499 7.38064 5.09731 7.26618 5.1817 7.18179L8.1817 4.18179C8.35743 4.00605 8.64236 4.00605 8.81809 4.18179Z"
                fill="currentColor"
                fill-rule="evenodd"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>{" "}
          <button
            className="btn  btn-circle btn-outline"
            onClick={() => {
              if (!isPlaceholderData && data.hasMore) {
                setPage((old) => old + 1);
              }
            }}
            disabled={isPlaceholderData || !data?.hasMore}
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.18194 4.18185C6.35767 4.00611 6.6426 4.00611 6.81833 4.18185L9.81833 7.18185C9.90272 7.26624 9.95013 7.3807 9.95013 7.50005C9.95013 7.6194 9.90272 7.73386 9.81833 7.81825L6.81833 10.8182C6.6426 10.994 6.35767 10.994 6.18194 10.8182C6.0062 10.6425 6.0062 10.3576 6.18194 10.1819L8.86374 7.50005L6.18194 4.81825C6.0062 4.64251 6.0062 4.35759 6.18194 4.18185Z"
                fill="currentColor"
                fill-rule="evenodd"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </main>
  );
}
