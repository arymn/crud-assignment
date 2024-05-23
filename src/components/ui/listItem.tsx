import React, { FC } from "react";

interface ListItemProps {
  itemData: {
    thumbnailUrl: string;
    title: string;
    albumId: number;
  };
}

const ListItem: FC<ListItemProps> = ({ itemData }) => {
  return (
    <div className="w-full flex p-2 justify-between items-center">
      <div className="avatar">
        <img
          className="rounded-full w-6"
          src={itemData.thumbnailUrl}
          alt={itemData.title}
        />
      </div>
      <h2>Name: {itemData.title}</h2>
      <p>AlbumId: {itemData.albumId}</p>
    </div>
  );
};

export default ListItem;
``;
