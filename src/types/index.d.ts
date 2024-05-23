interface Picture {
    id: string;
    albumId: number;
    title: string;
    url: string;
    thumbnailUrl: string;
}

interface Album {
    id: string;
    userId: number;
    title:string;
}

export {Picture, Album}