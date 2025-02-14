// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";

// function Property() {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // جلب الداتا
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(
//           "https://test-2810a-default-rtdb.firebaseio.com/properties.json"
//         );
//         const properties = response.data
//           ? Object.keys(response.data).map((key) => ({
//               id: key,
//               ...response.data[key],
//             }))
//           : [];

//         setData(properties);
//         setLoading(false);
//       } catch (err) {
//         setError(err.message);
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   // وضع ال id في لينك الصفحه عند الضغط على زر ال details
//   const handlePropertyClick = (propertyId) => {
//     // Update URL without page reload
//     window.history.pushState({}, "", `/properties/${propertyId}`);
//     // You can also use this if you want the page to reload:
//     // window.location.href = `/property/${propertyId}`;
//   };

//   // loading
//   if (loading)
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="animate-spin w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full"></div>
//       </div>
//     );

//   // error
//   if (error)
//     return <div className="text-red-500 text-center mt-5">Error: {error}</div>;

//   // فلتر لجلب الداتا الغير محذوفه و يوجد عليها عروض موسمية
//   const properties = data.filter(
//     (property) => !property.soft_delete && property.seasonal_offers
//   );

//   if (properties.length === 0) {
//     return <p>Loading...</p>;
//   }
//   return (
//     <>
//       <div>
//         <img
//           className="min-w-full h-100 bg-no-repeat bg-center bg-cover"
//           src="https://img.freepik.com/premium-photo/swimming-pool-with-lounge-chairs-palm-trees_662214-344213.jpg?w=1380"
//           alt="heroSection"
//         />
//       </div>
//       <div className="flex flex-col items-center justify-center my-20 ">
//         <div className="my-10 flex-wrap flex items-center justify-center w-[100%]">
//           {properties.map((property) => (
//             <div key={property.id} className="p-4">
//               <div className="rounded overflow-hidden w-[370px] flex flex-col justify-between min-h-120 shadow-lg p-4">
//                 <img
//                   className="w-full h-48 object-cover"
//                   src={property.images[0]}
//                   alt={property.name}
//                 />
//                 <div className="py-4">
//                   <h2 className="font-bold text-xl">{property.name}</h2>
//                   <p className="text-gray-700 text-base">
//                     {property.short_description}
//                   </p>
//                   <p className="text-lg">
//                     ${property.price_12_hours}
//                   </p>
//                   <p className="text-yellow-500">{property.rating} ★</p>
//                   <p className="text-[#ff4d00]">
//                     🔥{property.seasonal_offers[1].offer}
//                   </p>
//                   <Link
//                     to={`/properties/${property.id}`}
//                     className="flex items-center space-x-2 logo-swing"
//                   >
//                     <button
//                       onClick={() => handlePropertyClick(property.id)}
//                       className="hover:cursor-pointer bg-white shadow-lg border mt-2 border-gray-50 text-center w-48 rounded-2xl h-14 relative text-black text-xl font-semibold group"
//                       type="button"
//                     >
//                       <div className="bg-[#508D4E] rounded-xl h-12 w-1/4 flex items-center justify-center absolute left-1 top-[4px] group-hover:w-[184px] z-10 duration-500">
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           viewBox="0 0 1024 1024"
//                           height="25px"
//                           width="25px"
//                         >
//                           <path
//                             d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
//                             fill="#fff"
//                           />
//                           <path
//                             d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
//                             fill="#fff"
//                           />
//                         </svg>
//                       </div>
//                       <p className="translate-x-2">Details</p>
//                     </button>
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// }

// export default Property;
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";

// function Property() {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [priceFilter, setPriceFilter] = useState(0);
//   const [ratingFilter, setRatingFilter] = useState(0);
//   const [availabilityFilter, setAvailabilityFilter] = useState("all");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(
//           "https://test-2810a-default-rtdb.firebaseio.com/properties.json"
//         );
//         const properties = response.data
//           ? Object.keys(response.data).map((key) => ({
//               id: key,
//               ...response.data[key],
//             }))
//           : [];

//         setData(properties);
//         setLoading(false);
//       } catch (err) {
//         setError(err.message);
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   if (loading)
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="animate-spin w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full"></div>
//       </div>
//     );

//   if (error)
//     return <div className="text-red-500 text-center mt-5">Error: {error}</div>;

//   const filteredProperties = data.filter(
//     (property) =>
//       !property.soft_delete &&
//       property.seasonal_offers &&
//       (priceFilter === 0 || property.price_12_hours <= priceFilter) &&
//       (ratingFilter === 0 || property.rating >= ratingFilter) &&
//       (availabilityFilter === "all" || property.availability === availabilityFilter)
//   );

//   return (
//     <>
//       <div>
//         <img
//           className="min-w-full h-100 bg-no-repeat bg-center bg-cover"
//           src="https://img.freepik.com/premium-photo/swimming-pool-with-lounge-chairs-palm-trees_662214-344213.jpg?w=1380"
//           alt="heroSection"
//         />
//       </div>
//       <div className="flex flex-col items-center justify-center my-20">
//         <div className="flex space-x-4 mb-6">
//           <select
//             onChange={(e) => setPriceFilter(Number(e.target.value))}
//             className="border p-2 rounded"
//           >
//             <option value={0}>All Prices</option>
//             <option value={100}>Under $100</option>
//             <option value={150}>Under $150</option>
//             <option value={200}>Under $200</option>
//           </select>
//           <select
//             onChange={(e) => setRatingFilter(Number(e.target.value))}
//             className="border p-2 rounded"
//           >
//             <option value={0}>All Ratings</option>
//             <option value={3}>3+ Stars</option>
//             <option value={4}>4+ Stars</option>
//             <option value={5}>5 Stars</option>
//           </select>
//           <select
//             onChange={(e) => setAvailabilityFilter(e.target.value)}
//             className="border p-2 rounded"
//           >
//             <option value="all">All Availability</option>
//             <option value="false">Available</option>
//             <option value="true">Unavailable</option>
//           </select>
//         </div>

//         <div className="my-10 flex-wrap flex items-center justify-center w-[100%]">
//           {filteredProperties.map((property) => (
//             <div key={property.id} className="p-4">
//               <div className="rounded overflow-hidden w-[370px] flex flex-col justify-between min-h-120 shadow-lg p-4">
//                 <img
//                   className="w-full h-48 object-cover"
//                   src={property.images[0]}
//                   alt={property.name}
//                 />
//                 <div className="py-4">
//                   <h2 className="font-bold text-xl">{property.name}</h2>
//                   <p className="text-gray-700 text-base">
//                     {property.short_description}
//                   </p>
//                   <p className="text-lg">${property.price_12_hours}</p>
//                   <p className="text-yellow-500">{property.rating} ★</p>
//                   <p className="text-[#ff4d00]">
//                     🔥{property.seasonal_offers[1].offer}
//                   </p>
//                   <Link
//                     to={`/properties/${property.id}`}
//                     className="flex items-center space-x-2 logo-swing"
//                   >
//                     <button
//                       className="hover:cursor-pointer bg-white shadow-lg border mt-2 border-gray-50 text-center w-48 rounded-2xl h-14 relative text-black text-xl font-semibold group"
//                       type="button"
//                     >
//                       <div className="bg-[#508D4E] rounded-xl h-12 w-1/4 flex items-center justify-center absolute left-1 top-[4px] group-hover:w-[184px] z-10 duration-500">
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           viewBox="0 0 1024 1024"
//                           height="25px"
//                           width="25px"
//                         >
//                           <path
//                             d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
//                             fill="#fff"
//                           />
//                           <path
//                             d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
//                             fill="#fff"
//                           />
//                         </svg>
//                       </div>
//                       <p className="translate-x-2">Details</p>
//                     </button>
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// }

// export default Property;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import HeroSection from "../../Components/HeroSection";

function Property() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [priceFilter, setPriceFilter] = useState(0);
  const [ratingFilter, setRatingFilter] = useState(0);
  const [roomsFilter, setRoomsFilter] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://rent-app-d50fb-default-rtdb.firebaseio.com/properties.json"
        );
        const properties = response.data
          ? Object.keys(response.data).map((key) => ({
              id: key,
              ...response.data[key],
            }))
          : [];

        setData(properties);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
    );

  if (error)
    return <div className="text-red-500 text-center mt-5">Error: {error}</div>;

  const filteredProperties = data
    .filter(
      (property) =>
        !property.soft_delete &&
        property.seasonal_offers &&
        (priceFilter === 0 || property.price <= priceFilter) &&
        (ratingFilter === 0 || property.rating >= ratingFilter) &&
        (roomsFilter === 0 || property.rooms == roomsFilter)
    )
    .filter((property) =>
      property.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <>
      {/* Hero Section */}
      <HeroSection />

      {/* Property Cards */}
      <div className="flex flex-col items-center justify-center my-20">
        <div className="flex flex-wrap w-full justify-center items-center space-x-4 gap-3">
          <select
            onChange={(e) => setPriceFilter(Number(e.target.value))}
            className="border text-green-700 border-green-500 p-2 rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            <option value={0}>All Prices</option>
            <option value={100}>Under $100</option>
            <option value={150}>Under $150</option>
            <option value={200}>Under $200</option>
          </select>
          <select
            onChange={(e) => setRatingFilter(Number(e.target.value))}
            className="border text-green-700 border-green-500 p-2 rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            <option value={0}>All Ratings</option>
            <option value={3}>3+ Stars</option>
            <option value={4}>4+ Stars</option>
            <option value={5}>5 Stars</option>
          </select>
          <select
            onChange={(e) => setRoomsFilter(Number(e.target.value))}
            className="border text-green-700 border-green-500 p-2 rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            <option value={0}>All Rooms</option>
            <option value={1}>1+ Room</option>
            <option value={2}>2+ Rooms</option>
            <option value={3}>3+ Rooms</option>
            <option value={4}>4+ Rooms</option>
            <option value={5}>5+ Rooms</option>
          </select>
          <div className="relative w-1/2 flex items-center">
            <input
              type="text"
              className="w-full px-4 text-green-700 placeholder:text-green-700 py-2 border rounded-lg border-green-500 focus:ring-2 focus:ring-green-400 transition-all duration-300 ease-in-out"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="my-10 flex-wrap flex items-center justify-center w-[100%]">
          {filteredProperties.map((property) => (
            <div key={property.id} className="p-4">
              <div className="rounded-lg overflow-hidden w-[370px] flex flex-col justify-between min-h-120 shadow-lg p-4 bg-white hover:shadow-2xl transition-all duration-300 ease-in-out">
                <img
                  className="w-full h-48 object-cover"
                  src={
                    property.images && property.images[0]
                      ? property.images[1]
                      : "https://via.placeholder.com/400"
                  }
                  alt={property.name || "Property Image"}
                />
                <div className="py-4">
                  <h2 className="font-bold text-xl text-gray-800">
                    {property.name}
                  </h2>
                  <p className="text-gray-600 text-base">
                    {property.short_description}
                  </p>
                  <p className="text-lg text-green-600">
                    ${property.price_12_hours}
                  </p>
                  <p className="text-yellow-500">{property.rating} ★</p>
                  <p className="text-[#ff4d00]">
                    🔥 {property.seasonal_offers[0]}
                  </p>
                  <Link
                    to={`/properties/${property.id}`}
                    className="flex items-center space-x-2 logo-swing"
                  >
                    <button
                      className="hover:cursor-pointer bg-gradient-to-r  shadow-lg border mt-2 border-gray-50 text-center w-48 rounded-2xl h-14 relative  text-xl font-semibold group"
                      type="button"
                    >
                      <div className="bg-[#508D4E] rounded-xl h-12 w-1/4 flex items-center justify-center absolute left-1 top-[4px] group-hover:w-[184px] z-10 duration-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 1024 1024"
                          height="25px"
                          width="25px"
                        >
                          <path
                            d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
                            fill="#fff"
                          />
                          <path
                            d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
                            fill="#fff"
                          />
                        </svg>
                      </div>
                      <p className="translate-x-2">Details</p>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Property;
