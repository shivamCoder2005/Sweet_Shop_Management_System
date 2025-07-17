import axios from "axios";
import { BackendUrl } from "../constants/constant";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [sweetData, setSweetData] = useState();
  const [category, setCategory] = useState([]);

  const [sortFilterOptions, setsortFilterOptions] = useState({
    name: "",
    category: "",
    sortBy: "",
    sort: 0,
    minVal: 0,
    maxVal: 10000,
  });

  const [fetchFlag, setFetchFlag] = useState(false);
  const navigate = useNavigate();

  // fetch all sweet from db
  const fetchSweets = async () => {
    try {
      const result = await axios.get(`${BackendUrl}/sweets/all`);
      console.log(result);
      if (result.status == 200) {
        console.log(result.data.data);
        setSweetData(result.data.data);
        setCategory([
          ...new Set(result.data.data.map((sweet) => sweet.category)),
        ]);
      }
    } catch (error) {
      console.log(error);
      console.error(error?.response?.data?.msg);
    }
  };

  useEffect(() => {
    fetchSweets();
  }, [fetchFlag]);

  // redirec to update page
  const goToUpdate = (sweetId) => {
    navigate(`/owner/update_sweet/${sweetId}`);
  };

  // delete sweet from db
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

  // setting up sort and filter options
  const handlesortFilterOptions = (field, value) => {
    console.log(field, value);
    setsortFilterOptions((prev) => ({ ...prev, [field]: value }));
  };

  // redirect to buy sweet page
  const goToBuy = (sweetId) => {
    navigate(`/user/buy_sweet/${sweetId}`);
  };

  // reset all filter
  const resetAllFilter = async () => {
    setsortFilterOptions({
      name: "",
      category: "",
      sortBy: "",
      sort: 0,
      minVal: 0,
      maxVal: 10000,
    });
    setFetchFlag((prev) => !prev);
  };

  // sort and filter sweets as per input 
  const sortAndFilterSweets = async () => {
    try {
      const result = await axios.post(`${BackendUrl}/sweets/sort-filter`, {
        sortFilterOptions,
      });
      if (result.status == 200) {
        setSweetData(result.data.data);
      }
    } catch (error) {}
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-center mb-8 text-blue-700">
          🍭 Welcome to the Sweet Shop App 🍬
        </h1>

        {/* Sort & Filter Section */}
        <div className="mb-8 bg-white p-6 rounded-xl shadow-lg border border-gray-300">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            🔎 Sort & Filter Sweets
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Search by Name"
              value={sortFilterOptions.name}
              onChange={(e) => handlesortFilterOptions("name", e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <select
              onChange={(e) =>
                handlesortFilterOptions("category", e.target.value)
              }
              value={sortFilterOptions.category}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select Category</option>
              {category.map((cVal, index) => (
                <option key={index} value={cVal}>
                  {cVal}
                </option>
              ))}
            </select>

            <select
              value={sortFilterOptions.sortBy}
              onChange={(e) =>
                handlesortFilterOptions("sortBy", e.target.value)
              }
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Sort By</option>
              <option value="price">Price</option>
              <option value="quantity">Quantity</option>
              <option value="name">Name</option>
            </select>

            <select
              value={sortFilterOptions.sort}
              onChange={(e) =>
                handlesortFilterOptions("sort", Number(e.target.value))
              }
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value={0}>Select Order</option>
              <option value={1}>Ascending</option>
              <option value={-1}>Descending</option>
            </select>

            <input
              type="number"
              placeholder="Min Price"
              value={sortFilterOptions.minVal}
              onChange={(e) =>
                handlesortFilterOptions("minVal", e.target.value)
              }
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <input
              type="number"
              placeholder="Max Price"
              value={sortFilterOptions.maxVal}
              onChange={(e) =>
                handlesortFilterOptions("maxVal", e.target.value)
              }
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <div className="col-span-full flex flex-col sm:flex-row gap-4 mt-4">
              <button
                onClick={sortAndFilterSweets}
                className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
              >
                Apply Filters
              </button>
              <button
                onClick={resetAllFilter}
                className="w-full sm:w-auto px-6 py-2 bg-gray-300 text-gray-800 font-semibold rounded-md hover:bg-gray-400 transition"
              >
                Clear All
              </button>
            </div>
          </div>
        </div>

        {/* Sweet Cards */}
        {sweetData && sweetData.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {sweetData.map((sweet, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-transform transform hover:-translate-y-1 duration-300"
              >
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    {sweet.name}
                  </h2>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>
                      <span className="font-semibold">Category:</span>{" "}
                      {sweet.category}
                    </p>
                    <p>
                      <span className="font-semibold">Price:</span> ₹
                      {Number(sweet.price).toLocaleString("en-IN")}/kg
                    </p>
                    <p>
                      <span className="font-semibold">Quantity:</span>{" "}
                      {sweet.quantity} kg
                    </p>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <button
                      onClick={() => goToUpdate(sweet._id)}
                      className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(sweet._id)}
                      className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                    >
                      Delete
                    </button>
                    {sweet.quantity > 0 && (
                      <button
                        onClick={() => goToBuy(sweet._id)}
                        className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                      >
                        Buy
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No sweets available yet.</p>
        )}
      </div>
    </div>
  );
}

export default Home;
