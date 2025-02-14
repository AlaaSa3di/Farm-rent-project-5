// import React, { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { setLoading, setWishlist, removeFarmFromWishlist } from '../../Redux/wishlistSlice';
// import axios from 'axios';
// import { Link } from 'react-router-dom';  // استيراد Link من react-router-dom

// const WishlistPage = () => {
//   const dispatch = useDispatch();
//   const { wishlist, loading } = useSelector((state) => state.wishlist);

//   // حالة لتخزين روابط الصور
//   const [imageUrls, setImageUrls] = useState({});

//   // جلب المفضلة من Firebase
//   useEffect(() => {
//     const fetchWishlist = async () => {
//       dispatch(setLoading(true));  // بدء التحميل
//       try {
//         const response = await axios.get(`https://rent-app-d50fb-default-rtdb.firebaseio.com/wishlist/${id}.json`);
//         const data = response.data ? Object.entries(response.data).map(([key, value]) => ({ id: key, ...value })) : [];
//         dispatch(setWishlist(data));  // تحديث المفضلة
        
//         // جلب رابط أول صورة من المزرعة
//         const images = {};
//         for (const farm of data) {
//           if (farm.images && farm.images.length > 0) {
//             images[farm.id] = farm.images[0];  // أول صورة من المزرعة
//           }
//         }
//         setImageUrls(images); // حفظ روابط الصور
//       } catch (error) {
//         console.error('Error fetching wishlist:', error);
//       } finally {
//         dispatch(setLoading(false));  // إيقاف التحميل بعد الانتهاء
//       }
//     };

//     fetchWishlist();
//   }, [dispatch]);

//   // إزالة مزرعة من المفضلة
//   const handleRemoveFromWishlist = (id) => {
//     axios.delete(`https://rent-app-d50fb-default-rtdb.firebaseio.com/wishlist/${id}.json`)
//       .then(() => {
//         dispatch(removeFarmFromWishlist(id));  // إزالة المزرعة من المفضلة
//       })
//       .catch((error) => {
//         console.error('Error removing farm from wishlist:', error);
//       });
//   };

//   return (
//     <div className="container mx-auto px-20 p-4">
//       <h1 className="text-4xl font-semibold text-center mb-4">Whishlist</h1>

//       {loading ? (
//         <p className="text-center text-lg"> Reloading...</p>
//       ) : wishlist.length === 0 ? (
//         <p className="text-center text-lg">There are no farms in the favorites list. Add some farms to return to.</p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {wishlist.map((farm) => (
//             <div key={farm.id} className="border rounded-lg p-4 shadow-md">
//               <h2 className="text-xl font-semibold">
//                 <Link to={`/properties/${farm.id}`}>{farm.name}</Link> {/* تعديل الرابط هنا */}
//               </h2>
//               {imageUrls[farm.id] && (
//                 <img src={imageUrls[farm.id]} alt={farm.name} className="w-full h-auto mt-2" />
//               )}
//               <p>{farm.description}</p>
//               <button
//                 className="mt-2 bg-red-500 text-white py-1 px-4 rounded"
//                 onClick={() => handleRemoveFromWishlist(farm.id)}
//               >
//                 Remove
//               </button>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default WishlistPage;



import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setLoading, setWishlist, removeFromWishlist } from "../../Redux/wishlistSlice";
import axios from "axios";
import { Link } from "react-router-dom";
import { getAuth } from "firebase/auth";

const FIREBASE_URL = "https://rent-app-d50fb-default-rtdb.firebaseio.com";

const WishlistPage = () => {
  const dispatch = useDispatch();
  const { wishlist, loading } = useSelector((state) => state.wishlist);
  const { user } = useSelector((state) => state.auth); // جلب المستخدم من الـ Redux store
  const [imageUrls, setImageUrls] = useState({});

  // **الحصول على معرف المستخدم من Firebase Auth إذا لم يكن موجودًا في Redux**
  useEffect(() => {
    if (!user) {
      const auth = getAuth();
      const currentUser = auth.currentUser;
      if (currentUser) {
        // إذا كان المستخدم موجودًا في Firebase Auth ولكنه ليس في الـ Redux
        dispatch(setUser({ uid: currentUser.uid, email: currentUser.email }));
      } else {
        console.log("لم يتم العثور على مستخدم مسجل الدخول");
      }
    }
  }, [user, dispatch]);

  // 🔹 **جلب المفضلة عند تغيير userId**
  useEffect(() => {
    if (!user?.uid) return;

    const fetchWishlist = async () => {
      dispatch(setLoading(true));
      try {
        const response = await axios.get(`${FIREBASE_URL}/wishlist/${user.uid}.json`);
        const data = response.data
          ? Object.entries(response.data).map(([key, value]) => ({ id: key, ...value }))
          : [];
        dispatch(setWishlist(data));

        // 🔹 **جلب الصور للمزارع**
        const images = {};
        for (const farm of data) {
          if (farm.image) {
            images[farm.id] = farm.image;
          }
        }
        setImageUrls(images);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchWishlist();
  }, [dispatch, user?.uid]);

  // 🔹 **إزالة مزرعة من المفضلة**
  const handleRemoveFromWishlist = (id) => {
    if (!user?.uid) return;
    dispatch(removeFromWishlist(id));
  };

  return (
    <div className="container mx-auto px-20 p-4">
      <h1 className="text-4xl font-semibold text-center mb-4">Wishlist</h1>

      {loading ? (
        <p className="text-center text-lg">Reloading...</p>
      ) : wishlist.length === 0 ? (
        <p className="text-center text-lg">There are no farms in the favorites list.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((farm) => (
            <div key={farm.id} className="border rounded-lg p-4 shadow-md">
              <h2 className="text-xl font-semibold">
                <Link to={`/properties/${farm.id}`}>{farm.name}</Link>
              </h2>
              {imageUrls[farm.id] && (
                <img src={imageUrls[farm.id]} alt={farm.name} className="w-full h-auto mt-2" />
              )}
              <button
                className="mt-2 bg-red-500 text-white py-1 px-4 rounded"
                onClick={() => handleRemoveFromWishlist(farm.id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
