import { useForm } from "react-hook-form";
import axios from "axios";
import { BackendUrl } from "../constants/constant";
import { Link, useNavigate } from "react-router-dom";

function OwnerLogIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  // log in owner to app
  const loginOwner = async (data) => {
    try {
      const result = await axios.post(`${BackendUrl}/owner/login`, {
        ownerData: data,
      });
      if (result.status == 200) {
        navigate("/home");
      }
      console.log(result);
    } catch (error) {
      console.log(error);
      console.error(error?.response?.data?.msg);
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200 px-4">
        <div className="bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-2xl w-full max-w-md">
          <h2 className="text-3xl font-extrabold text-center text-blue-700 mb-8">
            Welcome Back Owner!!
          </h2>

          <form onSubmit={handleSubmit(loginOwner)} className="space-y-6">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-700 mb-1"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="hello123@gmail.com"
                {...register("email", {
                  required: "Email is required!",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid email address",
                  },
                })}
                className={`w-full px-4 py-3 border ${
                  errors.email ? "border-red-400" : "border-gray-300"
                } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition`}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Hello@123"
                {...register("password", {
                  required: "Password is required!",
                  pattern: {
                    // value:
                    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/,
                    message:
                      "Min 8 chars, uppercase, number & special char required.",
                  },
                })}
                className={`w-full px-4 py-3 border ${
                  errors.password ? "border-red-400" : "border-gray-300"
                } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition`}
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition disabled:opacity-50"
            >
              Login
            </button>

            <p className="text-center text-sm text-gray-600 mt-4">
              Don't have an account?{" "}
              <Link
                to="/owner/signup"
                className="text-blue-600 font-semibold hover:underline"
              >
                signup
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default OwnerLogIn;
