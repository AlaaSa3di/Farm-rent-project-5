import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { auth, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, database, ref, set, get } from "../firebaseConfig";

// تسجيل مستخدم جديد
export const signUpUser = createAsyncThunk("auth/signUpUser", async ({ email, password, firstname, lastname, phoneNumber }, { rejectWithValue }) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        const userData = { uid: user.uid, firstname, lastname, email, phoneNumber };
        await set(ref(database, `users/${user.uid}`), userData);

        return userData; // إرجاع بيانات المستخدم فقط
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

// تسجيل الدخول بالبريد وكلمة المرور
export const signInUser = createAsyncThunk("auth/signInUser", async ({ email, password }, { rejectWithValue }) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        const userRef = ref(database, `users/${user.uid}`);
        const snapshot = await get(userRef);

        if (!snapshot.exists()) {
            throw new Error("لم يتم العثور على بيانات المستخدم في قاعدة البيانات.");
        }

        const userData = { ...snapshot.val(), uid: user.uid };

        return userData; // إرجاع بيانات المستخدم فقط
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

// تسجيل الدخول باستخدام جوجل
export const signInWithGoogle = createAsyncThunk("auth/signInWithGoogle", async (_, { rejectWithValue }) => {
    const provider = new GoogleAuthProvider();
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;

        let firstname = "User";
        let lastname = "";

        if (user.displayName) {
            const nameParts = user.displayName.split(" ");
            firstname = nameParts[0];
            lastname = nameParts.length > 1 ? nameParts.slice(1).join(" ") : "";
        }

        const userRef = ref(database, `users/${user.uid}`);
        const snapshot = await get(userRef);

        let userData;
        if (!snapshot.exists()) {
            userData = {
                uid: user.uid,
                firstname,
                lastname,
                email: user.email,
            };
            await set(userRef, userData);
        } else {
            userData = { ...snapshot.val(), uid: user.uid };
        }

        console.log("User Data in signInWithGoogle:", userData); // تتبع البيانات

        return userData;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});


const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: JSON.parse(localStorage.getItem("user")) || null, // تأكد من أنك تتحقق من وجود المستخدم في localStorage
    status: "idle",
    error: null,
    successMessage: "",
  },
  reducers: {
    setUser: (state, action) => {
        state.user = action.payload;
        localStorage.setItem('user', JSON.stringify(action.payload)); // حفظ البيانات في localStorage
    },
    clearUser: (state) => {
        state.user = null;
        localStorage.removeItem("user"); // حذف البيانات من localStorage عند الخروج
    },
    logout: (state) => {
        state.user = null;
        localStorage.removeItem("user");
    },
    clearError: (state) => {
        state.error = null;
    },
    clearSuccessMessage: (state) => {
        state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
        .addCase(signUpUser.fulfilled, (state, action) => {
            state.user = action.payload;
            state.status = "succeeded";
            state.successMessage = "Registration successful! You can now log in.";
            localStorage.setItem("user", JSON.stringify(action.payload)); // حفظ البيانات في localStorage
        })
        .addCase(signInUser.fulfilled, (state, action) => {
            state.user = action.payload;
            state.status = "succeeded";
            state.successMessage = "Login successful!";
            localStorage.setItem("user", JSON.stringify(action.payload)); // حفظ البيانات في localStorage
        })
        .addCase(signInWithGoogle.fulfilled, (state, action) => {
            state.user = action.payload; // البيانات كاملة بما في ذلك firstname و lastname
            state.status = "succeeded";
            state.successMessage = "Login successful with Google!";
            localStorage.setItem("user", JSON.stringify(action.payload)); // حفظ البيانات في localStorage
        })    
        .addCase(signUpUser.rejected, (state, action) => {
            state.error = action.payload;
            state.status = "failed";
        })
        .addCase(signInUser.rejected, (state, action) => {
            state.error = action.payload;
            state.status = "failed";
        })
        .addCase(signInWithGoogle.rejected, (state, action) => {
            state.error = action.payload;
            state.status = "failed";
        });
  },
});

export const { setUser, clearUser, logout, clearError, clearSuccessMessage } = authSlice.actions;
export default authSlice.reducer;
