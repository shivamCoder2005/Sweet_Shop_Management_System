import axios from "axios";
import { BackendUrl } from "../constants/constant";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [sweetData, setSweetData] = useState();

  const [sortFilter, setSortFilter] = useState({
    name: "",
    category: "",
    minVal: 0,
    maxVal: 0,
  });

  const [fetchFlag, setFetchFlag] = useState(false);
  const navigate = useNavigate();

  const fetchSweets = async () => {
    try {
      const result = await axios.get(`${BackendUrl}/sweets/all`);
      console.log(result);
      if (result.status == 200) {
        console.log(result.data.data);
        setSweetData(result.data.data);
      }
    } catch (error) {
      console.log(error);
      console.error(error?.response?.data?.msg);
    }
  };

  useEffect(() => {
    fetchSweets();
  }, [fetchFlag]);

  const goToUpdate = async (sweetId) => {
    navigate(`/owner/update_sweet/${sweetId}`);
  };

  const handleDelete = async (sweetId) => {
    try {
      const result = await axios.delete(
        `${BackendUrl}/owner/sweets/${sweetId}`
      );
      console.log(result);
      if (result.status == 200) {
        setFetchFlag((prev) => !prev);
      }
    } catch (error) {
      console.log(error);
      console.error(error?.response?.data?.msg);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-pink-600">
        🍭 Welcome to the Sweet Shop App 🍬
      </h1>

      {sweetData && sweetData.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {sweetData.map((sweet, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md p-6 border border-gray-200 hover:shadow-xl transition duration-300"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {sweet.name}
              </h2>
              <p className="text-gray-600 mb-1">
                Category: <span className="font-medium">{sweet.category}</span>
              </p>
              <p className="text-gray-600 mb-1">
                Price: <span className="font-medium">₹{sweet.price}</span>
              </p>
              <p className="text-gray-600 mb-4">
                Quantity: <span className="font-medium">{sweet.quantity}</span>
              </p>

              <div className="flex space-x-3">
                <button
                  onClick={() => goToUpdate(sweet._id)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(sweet._id)}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No sweets available yet.</p>
      )}
    </div>
  );
}

export default Home;
