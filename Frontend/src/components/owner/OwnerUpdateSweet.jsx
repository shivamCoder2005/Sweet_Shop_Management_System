import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { BackendUrl } from "../constants/constant";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

function OwnerUpdateSweet() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { sweetId } = useParams();
  const navigate = useNavigate();

  // fetching old sweet data from db
  const fetchOldSweetData = async () => {
    try {
      const result = await axios.get(`${BackendUrl}/sweets/${sweetId}`);
      console.log(result);
      reset(result.data.data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchOldSweetData();
  }, []);

  // storing updated sweet data to db
  const updateSweet = async (data) => {
    try {
      const result = await axios.put(`${BackendUrl}/owner/sweets/${sweetId}`, {
        sweetData: data,
      });
      console.log(result);
      if (result.status == 200) {
        navigate(-1);
      }
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
            Update Sweet
          </h2>

          <form onSubmit={handleSubmit(updateSweet)} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-gray-700 mb-1"
              >
                Enter Name
              </label>
              <input
                id="name"
                type="name"
                {...register("name", {
                  required: "Name is required!",
                })}
                className={`w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition`}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="category"
                className="block text-sm font-semibold text-gray-700 mb-1"
              >
                Enter category
              </label>
              <input
                id="category"
                type="name"
                {...register("category", {
                  required: "category is required!",
                })}
                className={`w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition`}
              />
              {errors.category && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.category.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="price"
                className="block text-sm font-semibold text-gray-700 mb-1"
              >
                Enter price
              </label>
              <input
                id="price"
                type="number"
                {...register("price", {
                  required: "price is required!",
                })}
                className={`w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition`}
              />
              {errors.price && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.price.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="quantity"
                className="block text-sm font-semibold text-gray-700 mb-1"
              >
                Enter quantity
              </label>
              <input
                id="quantity"
                type="number"
                {...register("quantity", {
                  required: "quantity is required!",
                })}
                className={`w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition`}
              />
              {errors.quantity && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.quantity.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition disabled:opacity-50"
            >
              Update Sweet
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default OwnerUpdateSweet;
