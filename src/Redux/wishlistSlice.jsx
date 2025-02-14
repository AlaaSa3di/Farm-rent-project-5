// import { createSlice } from '@reduxjs/toolkit';
// import axios from 'axios';

// const FIREBASE_URL = "https://rent-app-d50fb-default-rtdb.firebaseio.com";

// // تحديد هوية المستخدم
// const getUserId = () => {
//   return "user123"; // هذا مثال افتراضي
// };

// const wishlistSlice = createSlice({
//   name: 'wishlist',
//   initialState: {
//     wishlist: [],
//     loading: false,
//     error: null,
//   },
//   reducers: {
//     setLoading: (state, action) => {
//       state.loading = action.payload;
//     },
//     setWishlist: (state, action) => {
//       state.wishlist = action.payload;
//     },
//     addFarmToWishlist: (state, action) => {
//       state.wishlist.push(action.payload);
//     },
//     removeFarmFromWishlist: (state, action) => {
//       state.wishlist = state.wishlist.filter((farm) => farm.id !== action.payload);
//     },
//     softDeleteFarm: (state, action) => {
//       const farm = state.wishlist.find((f) => f.id === action.payload);
//       if (farm) {
//         farm.soft_delete = true;
//       }
//     },
//   },
// });

// export const { setLoading, setWishlist, addFarmToWishlist, removeFarmFromWishlist, softDeleteFarm } = wishlistSlice.actions;

// export default wishlistSlice.reducer;

// // إضافة مزرعة إلى Firebase
// export const addToWishlist = (farm) => {
//   return (dispatch) => {
//     const userId = getUserId();
//     axios
//       .post(`${FIREBASE_URL}/wishlist/${userId}/.json`, { ...farm, soft_delete: false })
//       .then((response) => {
//         const newFarm = { id: response.data.name, ...farm };
//         dispatch(addFarmToWishlist(newFarm));
//       })
//       .catch((error) => {
//         console.error("Error adding to wishlist:", error);
//       });
//   };
// };

// // إزالة مزرعة من المفضلة باستخدام soft delete
// export const removeFromWishlist = (id) => {
//   return (dispatch) => {
//     const userId = getUserId();
    
//     // التحديث في Firebase (نقوم فقط بتحديث الحقل soft_delete بدلاً من حذف العنصر)
//     axios
//       .patch(`${FIREBASE_URL}/wishlist/${userId}/${id}.json`, { soft_delete: true })
//       .then(() => {
//         // إذا تم التحديث بنجاح في Firebase، قم بتحديث الحالة المحلية في Redux
//         dispatch(softDeleteFarm(id));
//         console.log("Farm marked as deleted in Firebase.");
//       })
//       .catch((error) => {
//         console.error("Error marking farm as deleted in Firebase:", error);
//       });
//   };
// };

// // جلب قائمة المفضلات من Firebase لمستخدم معين
// export const fetchWishlist = () => {
//   return (dispatch) => {
//     const userId = getUserId();
//     dispatch(setLoading(true));
    
//     axios
//       .get(`${FIREBASE_URL}/wishlist/${userId}.json`)
//       .then((response) => {
//         const data = response.data
//           ? Object.entries(response.data)
//               .map(([key, value]) => ({ id: key, ...value }))
//               .filter(farm => !farm.soft_delete)  // لا تعرض المزارع المحذوفة
//           : [];
//         dispatch(setWishlist(data));
//         dispatch(setLoading(false));
//       })
//       .catch((error) => {
//         console.error("Error fetching wishlist:", error);
//         dispatch(setLoading(false));
//       });
//   };
// };



import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getAuth } from "firebase/auth";

const FIREBASE_URL = "https://rent-app-d50fb-default-rtdb.firebaseio.com";

// استرجاع معرف المستخدم الحالي من Firebase Auth
const getUserId = () => {
  const auth = getAuth();
  return auth.currentUser ? auth.currentUser.uid : null;
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    wishlist: [],
    loading: false,
    error: null,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setWishlist: (state, action) => {
      state.wishlist = action.payload;
    },
    addFarmToWishlist: (state, action) => {
      state.wishlist.push(action.payload);
    },
    removeFarmFromWishlist: (state, action) => {
      state.wishlist = state.wishlist.filter((farm) => farm.id !== action.payload);
    },
  },
});

export const { setLoading, setWishlist, addFarmToWishlist, removeFarmFromWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;

// 🔹 **إضافة مزرعة إلى المفضلة في Firebase**
export const addToWishlist = (farm) => {
  return (dispatch) => {
    const userId = getUserId();
    if (!userId) return;

    axios
      .post(`${FIREBASE_URL}/wishlist/${userId}.json`, farm)
      .then((response) => {
        const newFarm = { id: response.data.name, ...farm };
        dispatch(addFarmToWishlist(newFarm));
      })
      .catch((error) => console.error("Error adding to wishlist:", error));
  };
};

// 🔹 **جلب قائمة المفضلات من Firebase**
export const fetchWishlist = () => {
  return (dispatch) => {
    const userId = getUserId();
    if (!userId) return;

    dispatch(setLoading(true));
    
    axios
      .get(`${FIREBASE_URL}/wishlist/${userId}.json`)
      .then((response) => {
        const data = response.data
          ? Object.entries(response.data).map(([key, value]) => ({ id: key, ...value }))
          : [];
        dispatch(setWishlist(data));
      })
      .catch((error) => console.error("Error fetching wishlist:", error))
      .finally(() => dispatch(setLoading(false)));
  };
};

// 🔹 **إزالة مزرعة من المفضلة**
export const removeFromWishlist = (id) => {
  return (dispatch) => {
    const userId = getUserId();
    if (!userId) return;

    axios
      .delete(`${FIREBASE_URL}/wishlist/${userId}/${id}.json`)
      .then(() => dispatch(removeFarmFromWishlist(id)))
      .catch((error) => console.error("Error removing farm from wishlist:", error));
  };
};
