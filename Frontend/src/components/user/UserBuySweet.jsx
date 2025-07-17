import { useForm } from "react-hook-form";
import axios from "axios";
import { BackendUrl } from "../constants/constant";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";

function UserBuySweet() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  const navigate = useNavigate();
  const [sweetData, setSweetData] = useState({});
  const { sweetId } = useParams();
  const [billPrice, setBillPrice] = useState(0);

  // fetching select sweet from db
  const getSweet = async () => {
    try {
      const result = await axios.get(`${BackendUrl}/sweets/${sweetId}`);
      console.log(result);
      if (result.status == 200) {
        setSweetData(result.data.data);
        reset(result.data.data);
      }
    } catch (error) {
      console.log(error);
      console.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    getSweet();
  }, []);

  // buy and update stock quantity 
  const buySweet = async (data) => {
    const purchaseData = { ...sweetData, buyQuantity: data.buyQuantity };
    try {
      const result = await axios.post(`${BackendUrl}/user/sweets/buy`, {
        purchaseData,
      });
      console.log(result);
      if (result.status == 200) {
        navigate("/home");
      }
    } catch (error) {
      console.log(error);
      console.error(error?.response?.data?.message);
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200 px-4">
        <div className="bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-2xl w-full max-w-md">
          <h2 className="text-3xl font-extrabold text-center text-blue-700 mb-8">
            Buy Sweet
          </h2>

          <form onSubmit={handleSubmit(buySweet)} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-gray-700 mb-1"
              >
                Name
              </label>
              <input
                id="name"
                type="name"
                {...register("name", {
                  required: "Name is required!",
                })}
                disabled
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
                htmlFor="price"
                className="block text-sm font-semibold text-gray-700 mb-1"
              >
                price
              </label>
              <input
                id="price"
                type="number"
                {...register("price", {
                  required: "price is required!",
                })}
                disabled
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
                available quantity
              </label>
              <input
                id="quantity"
                type="number"
                {...register("quantity", {
                  required: "quantity is required!",
                })}
                disabled
                className={`w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition`}
              />
              {errors.quantity && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.quantity.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="buyQuantity"
                className="block text-sm font-semibold text-gray-700 mb-1"
              >
                Enter Quantity :
              </label>
              <input
                id="buyQuantity"
                type="number"
                {...register("buyQuantity", {
                  required: "Please add buy quantity",
                  validate: (value) =>
                    Number(value) <= sweetData.quantity ||
                    `Exceed available stock (${sweetData.quantity})`,
                })}
                onChange={(e) => {
                  const value = e.target.value;
                  setValue("buyQuantity", value, { shouldValidate: true });
                  setBillPrice(Number(value) * sweetData.price);
                }}
                className="w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
              />

              {errors.buyQuantity && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.buyQuantity.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition disabled:opacity-50"
            >
              Buy Sweet
            </button>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center shadow-inner">
              <h3 className="text-lg font-semibold text-blue-800">
                Total Bill
              </h3>
              <p className="text-2xl font-bold text-blue-900 mt-1">
                ₹ {!isNaN(billPrice) ? billPrice.toLocaleString() : 0}
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default UserBuySweet;
