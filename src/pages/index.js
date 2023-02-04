import axios from "axios";
import { useState } from "react";

const api = axios.create({
  baseURL: "/api/",
  withCredentials: true,
});

api.interceptors.response.use(undefined, async (error) => {
  if (error.response.status === 419) {
    await getCsrfCookie();
    // TODO: set retry limit in case API returns 419 even when
    // token is correctly set to prevent infinite request loop
    return await api.request(error.config);
  }
  return error;
});

const getCsrfCookie = async () => {
  await api.get("/csrf-cookie");
};

function Auth() {
  const [user, setUser] = useState(null);

  const login = async () => {
    // Optional, since it will be retried if token expired/does not exist.
    // But, since this is login page, it is very likely the user does not
    // have an active csrf token
    await getCsrfCookie();

    const response = await api.post("/login", {
      username: "admin",
      password: "password",
    });

    if (response.status === 200) {
      setUser(response.data);
    } else {
      alert(response.data.message);
    }
  };

  return user ? user.name : <button onClick={login}>Login</button>;
}

export default function Home() {
  return <Auth />;
}
