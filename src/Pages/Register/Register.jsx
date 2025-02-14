import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signUpUser, signInUser, signInWithGoogle,  clearSuccessMessage } from "../../Redux/authSlice";
import { FaGoogle, FaExclamationCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, status, error, successMessage } = useSelector((state) => state.auth);
  const [isSignUp, setIsSignUp] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const [errorsSignUp, setErrorsSignUp] = useState({});
  const [errorsSignIn, setErrorsSignIn] = useState({});

  useEffect(() => {
    dispatch(clearSuccessMessage()); // مسح رسالة النجاح عند فتح صفحة التسجيل
  }, [dispatch]);
  
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        dispatch(clearSuccessMessage()); // مسح رسالة النجاح بعد 3 ثوانٍ
        navigate("/"); // توجيه المستخدم بعد 3 ثوانٍ
      }, 3000);
  
      return () => clearTimeout(timer); // تنظيف التايمر
    }
  }, [successMessage, navigate, dispatch]);
  

  const handleToggleForm = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsSignUp(!isSignUp);
      // تصفير الأخطاء عند التبديل بين النماذج
      if (isSignUp) {
        setErrorsSignUp({});
      } else {
        setErrorsSignIn({});
      }
      setIsAnimating(false);
    }, 400);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const form = e.target;
    const email = form.email?.value.trim() || "";
    const password = form.password?.value.trim() || "";
    const firstname = form.firstname?.value.trim() || "";
    const lastname = form.lastname?.value.trim() || "";
    const phoneNumber = form.phoneNumber?.value.trim() || "";
  
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    const phoneNumberPattern = /^07\d{8}$/;
  
    if (isSignUp) {
      let validationErrors = {};
  
      if (!emailPattern.test(email)) {
        validationErrors.email = "Please enter a valid email.";
      }
  
      if (!passwordPattern.test(password)) {
        validationErrors.password = "Please enter a strong password (must be at least 8 characters long and contain at least one number, one uppercase and one lowercase letter).";
      }
  
      if (!phoneNumberPattern.test(phoneNumber)) {
        validationErrors.phoneNumber = "Please enter a valid phone number (must be 10 digits and start with 07).";
      }
  
      if (!firstname) {
        validationErrors.firstname = "Please enter your first name.";
      }
  
      if (!lastname) {
        validationErrors.lastname = "Please enter your last name.";
      }
  
      if (Object.keys(validationErrors).length > 0) {
        setErrorsSignUp(validationErrors);
        return;
      }
      setErrorsSignUp({}); // ✅ مسح الأخطاء عند نجاح التحقق
  
      try {
        await dispatch(signUpUser({ email, password, firstname, lastname, phoneNumber }));
      } catch (error) {
        console.log("Error caught during sign-up:", error); // تحقق من محتوى الخطأ
  
        // تخصيص الرسائل عند حدوث أخطاء
        if (error.code === 'auth/email-already-in-use') {
          setErrorsSignUp(prevErrors => ({
            ...prevErrors,
            email: "This email is already registered. Please use another one."
          }));
        } else if (error.code === 'auth/invalid-email') {
          setErrorsSignUp(prevErrors => ({
            ...prevErrors,
            email: "Please enter a valid email address."
          }));
        } else {
          setErrorsSignUp(prevErrors => ({
            ...prevErrors,
            general: "An error occurred. Please try again later."
          }));
        }
      }
    } else {
      let validationErrors = {};
  
      if (!emailPattern.test(email)) {
        validationErrors.email = "Please enter a valid email.";
      }
  
      if (!password) {
        validationErrors.password = "Password is required.";
      }
  
      if (Object.keys(validationErrors).length > 0) {
        setErrorsSignIn(validationErrors);
        return;
      }
  
      try {
        await dispatch(signInUser({ email, password }));
      } catch (error) {
        console.log("Error caught during sign-in:", error);
  
        // تخصيص الرسائل عند حدوث أخطاء في تسجيل الدخول
        if (error.code === 'auth/user-not-found') {
          setErrorsSignIn(prevErrors => ({
            ...prevErrors,
            email: "No user found with this email. Please check and try again."
          }));
        } else if (error.code === 'auth/wrong-password') {
          setErrorsSignIn(prevErrors => ({
            ...prevErrors,
            password: "Incorrect password. Please try again."
          }));
        } else if (error.code === 'auth/invalid-email') {
          setErrorsSignIn(prevErrors => ({
            ...prevErrors,
            email: "Invalid email address. Please check and try again."
          }));
        } else {
          setErrorsSignIn(prevErrors => ({
            ...prevErrors,
            general: "An error occurred. Please try again later."
          }));
        }
      }
    }
  };
  
  const handleGoogleSignIn = async () => {
    await dispatch(signInWithGoogle());
  };

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <div
        className={`flex-1 flex flex-col justify-center items-center bg-white p-10 transition-all duration-1000 ease-in-out ${
          isSignUp && !isAnimating ? "" : "transform translate-x-full"
        }`}
      >
        {isSignUp ? (
          <SignupForm
            handleSubmit={handleSubmit}
            handleGoogleSignUp={handleGoogleSignIn}
            error={error}
            status={status}
            errors={errorsSignUp}
            setErrorsSignUp={setErrorsSignUp} 
          />
        ) : (
          <SigninForm
            handleSubmit={handleSubmit}
            handleGoogleSignIn={handleGoogleSignIn}
            error={error}
            status={status}
            errors={errorsSignIn}
            setErrorsSignIn={setErrorsSignIn} 
          />
        )}
      </div>
      <div
        className={`flex-1 flex flex-col justify-center items-center text-white p-10 transition-all duration-1000 ease-in-out ${
          isSignUp && !isAnimating ? "" : "transform -translate-x-full"
        }`}
        style={{
          backgroundImage:
            "url(https://mir-s3-cdn-cf.behance.net/project_modules/1400/4ce5aa143408545.627a3e505b0a4.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
        }}
      >
        <h2 className="text-2xl font-bold z-10">
          {isSignUp ? "Already have an account? Sign In" : "New here? Sign Up"}
        </h2>
        {isSignUp ? (
          <p className="mt-2 text-base text-white text-center">
            Welcome back! Sign in to enjoy exclusive offers and a unique stay experience.
          </p>
        ) : (
          <p className="mt-2 text-base text-white text-center">
            Join us today and explore the best rental experiences in our farms and chalets.
          </p>
        )}
        <button
          className="mt-4 px-6 py-2 border border-white rounded-full hover:bg-white hover:text-[#1A5319] transition-all duration-400 cursor-pointer"
          onClick={handleToggleForm}
        >
          {isSignUp ? "SIGN IN" : "SIGN UP"}
        </button>
      </div>
    </div>
  );
};

const SignupForm = ({ handleSubmit, handleGoogleSignUp, error, status, errors, setErrorsSignUp }) => (
  <form
    className="w-full max-w-md space-y-6 bg-white p-8 rounded-lg shadow-lg border border-gray-200"
    onSubmit={handleSubmit}
  >
    <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Sign up</h2>

    {status === "succeeded" && (
      <div className="text-green-500 text-center mb-4">Registration successful! You can now log in</div>
    )}

    {error && <div className="text-red-500 text-center mb-4">{error}</div>}

    <div className="flex gap-4">
  <InputField name="firstname" type="text" placeholder="First Name" error={errors.firstname} setErrors={setErrorsSignUp} className="flex-1" />
  <InputField name="lastname" type="text" placeholder="Last Name" error={errors.lastname} setErrors={setErrorsSignUp} className="flex-1" />
</div>

    <InputField name="email" type="email" placeholder="Email" error={errors.email} setErrors={setErrorsSignUp} />
    <InputField name="password" type="password" placeholder="Password" error={errors.password} setErrors={setErrorsSignUp} />
    <InputField name="phoneNumber" type="text" placeholder="Phone Number" error={errors.phoneNumber} setErrors={setErrorsSignUp} />

    <button
      className="w-full bg-[#1A5319] text-white py-2 rounded-md hover:bg-[#7DA87B] duration-400 cursor-pointer"
      type="submit"
    >
      Sign up
    </button>

    <button
      type="button"
      className="w-full px-6 py-2 border border-gray-700 rounded-full hover:bg-gray-700 hover:text-white transition-all duration-400 cursor-pointer"
      onClick={handleGoogleSignUp}
    >
      Or, Sign up with <FaGoogle className="inline ml-2" />
    </button>
  </form>
);

const SigninForm = ({ handleSubmit, handleGoogleSignIn, error, status, errors, setErrorsSignIn }) => (
  <form
    className="w-full max-w-md space-y-6 bg-white p-8 rounded-lg shadow-lg border border-gray-200"
    onSubmit={handleSubmit}
  >
    <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Sign in</h2>

    {error && <div className="text-red-500 text-center mb-4">{error}</div>}

    <InputField name="email" type="email" placeholder="Email" error={errors.email} setErrors={setErrorsSignIn} />
<InputField name="password" type="password" placeholder="Password" error={errors.password} setErrors={setErrorsSignIn} />

    <button
      className="w-full bg-[#1A5319] text-white py-2 rounded-md hover:bg-[#7DA87B] duration-400 cursor-pointer"
      type="submit"
    >
      Login
    </button>

    <button
      type="button"
      className="w-full px-6 py-2 border border-gray-700 rounded-full hover:bg-gray-700 hover:text-white transition-all duration-400 cursor-pointer"
      onClick={handleGoogleSignIn}
    >
      Or, Login with <FaGoogle className="inline ml-2" />
    </button>
  </form>
);

const InputField = ({ name, type, placeholder, error, className, setErrors }) => {
  const handleChange = (e) => {
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" })); // ✅ إزالة الخطأ عند الكتابة
  };

  return (
    <div className={`relative ${className}`}>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        className={`w-full p-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1A5319] ${error ? 'border-red-500 bg-red-50' : ''}`}
        onChange={handleChange} // ✅ إضافة الحدث هنا
      />
      {error && <div className="mt-1 text-red-500 text-sm">{error}</div>}
    </div>
  );
};

export default Register;