import { useForm } from "react-hook-form";
import axios from "axios";
import { BackendUrl } from "../constants/constant";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function OwnerAddStock() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const [sweetData, setSweetData] = useState([]);

  // getting old inventory data from db
  const fetchInventory = async () => {
    try {
      const result = await axios.get(`${BackendUrl}/sweets/all`);
      console.log(result);
      setSweetData(result.data.data);
    } catch (error) {
      console.log(error);
      console.error(error?.response?.data?.msg);
    }
  };

  //  data is like this where sweet is object like array
  //   data : {
  //   sweet: {
  //     0: 12,
  //     1: 5,
  //     2: 8,
  //     ...
  //   }
  // }

  // adding new stocks to db
  const addStock = async (data) => {

    // fomat the newly added stock
    const updatedStock = sweetData.map((sweet, index) => {
      if (data.sweet[index]) {
        return {
          ...sweet,
          updatedSweetQuantity: sweet.quantity + parseInt(data.sweet[index]),
        };
      } else return { ...sweet };
    });

    console.log(updatedStock);
    try {
      const result = await axios.post(`${BackendUrl}/owner/sweets/addStock`, {
        updatedStock,
      });
      console.log(result);
      if (result.status == 200) {
        navigate("/home");
      }
    } catch (error) {
      console.log(error);
      console.error(error?.response?.data?.msg);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  return (
    <>
      {sweetData.length === 0 ? (
        <h1 className="text-center text-xl font-semibold text-gray-500">
          No sweets are available
        </h1>
      ) : (
        <form
          onSubmit={handleSubmit(addStock)}
          className="max-w-4xl mt-8 mx-auto p-6 mb-10 bg-blue-50 rounded-xl shadow-md space-y-6"
        >
          <h2 className="text-2xl font-bold text-black text-center">
            📦 Add Stock for Available Sweets
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {sweetData.map((sweet, index) => (
              <div
                key={index}
                className="border border-gray-200 bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition"
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                  {sweet.name}
                </h3>
                <p className="text-gray-600 mb-1">Price: ₹{sweet.price}</p>
                <p className="text-gray-600 mb-2">Quantity: {sweet.quantity}</p>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Add Quantity:
                </label>
                <input
                  type="number"
                  {...register(`sweet[${index}]`)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
                  min={0}
                />
              </div>
            ))}
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="mt-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
            >
              Update Stock
            </button>
          </div>
        </form>
      )}
    </>
  );
}

export default OwnerAddStock;
