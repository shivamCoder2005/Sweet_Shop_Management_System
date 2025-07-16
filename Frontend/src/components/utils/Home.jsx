import axios from "axios";
import { BackendUrl } from "../constants/constant";
import { useEffect, useState } from "react";

function Home() {
  const [sweetData, setSweetData] = useState();
  
  const [sortFilter, setSortFilter] = useState({
    name: "",
    category: "",
    minVal: 0,
    maxVal: 0,
  });

  const [fetchFlag, setFetchFlag] = useState(false);

  const fetchSweets = async () => {
    try {
      const result = await axios.get(`${BackendUrl}/sweet/all`);
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
  }, []);

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
              className="bg-white rounded-xl shadow-md p-4 border hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {sweet.name}
              </h2>
              <p className="text-gray-600">Category: {sweet.category}</p>
              <p className="text-gray-600">Price: ₹{sweet.price}</p>
              <p className="text-gray-600">Quantity: {sweet.quantity}</p>
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
