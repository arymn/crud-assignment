"use server";

export const getItems = async () => {
  try {
    const data = await fetch(
      "http://localhost:3000/pictures?_page=1&_per_page=4"
    ).then((res) => res.json());
    return { data };
  } catch (error) {
    return { error };
  }
};
