import { useEffect } from "react";

const CreateAndEditUser = () => {
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: "AAA", email: "@" }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  }, []);
  return null;
};
export default CreateAndEditUser;
