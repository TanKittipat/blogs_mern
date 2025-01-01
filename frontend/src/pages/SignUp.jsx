import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAuthContext } from "../contexts/auth.context";
import AuthServices from "../services/auth.service";
import Swal from "sweetalert2";

const SignUp = () => {
  const navigate = useNavigate();
  const { user: loggedInUser } = useAuthContext();

  useEffect(() => {
    if (loggedInUser) {
      navigate("/");
    }
  }, [loggedInUser]);

  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((user) => ({ ...user, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const res = await AuthServices.register(user.username, user.password);
      console.log(res.status);
      if (res.status === 201) {
        Swal.fire({
          title: "Registration",
          text: res.data.message,
          showConfirmButton: false,
          icon: "success",
          position: "center",
        });
        setUser({ username: "", password: "" });
        navigate("/login");
      }
    } catch (error) {
      Swal.fire({
        title: "Registration",
        text: error?.response?.data?.message,
        showConfirmButton: false,
        icon: "success",
        position: "center",
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[87vh] bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-500">
      <div class="max-w-md w-full space-y-3 bg-white rounded-lg px-8 py-10">
        <div>
          <h1 className="text-center text-3xl text-gray-700 mb-12 font-bold">
            Register
          </h1>
        </div>
        <div class="relative">
          <input
            required
            onChange={handleChange}
            name="username"
            value={user.username}
            type="text"
            class="peer py-3 px-4 ps-11 block w-full bg-gray-100 border-transparent rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
            placeholder="Enter username"
          />
          <div class="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none">
            <svg
              class="shrink-0 size-4 text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </div>
        </div>
        <div class="relative">
          <input
            required
            onChange={handleChange}
            name="password"
            value={user.password}
            type="password"
            class="peer py-3 px-4 ps-11 block w-full bg-gray-100 border-transparent rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
            placeholder="Enter password"
          />
          <div class="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none">
            <svg
              class="shrink-0 size-4 text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M2 18v3c0 .6.4 1 1 1h4v-3h3v-3h2l1.4-1.4a6.5 6.5 0 1 0-4-4Z"></path>
              <circle cx="16.5" cy="7.5" r=".5"></circle>
            </svg>
          </div>
        </div>
        <div className="pt-4 flex gap-2 justify-end">
          <button
            onClick={() => {
              setUser({ username: "", password: "" });
              navigate("/");
            }}
            type="button"
            class="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            type="button"
            class="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-teal-500 text-white hover:bg-teal-600 focus:outline-none focus:bg-teal-600 disabled:opacity-50 disabled:pointer-events-none"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
