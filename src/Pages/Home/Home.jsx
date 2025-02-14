import PropertyCarousel from "../../Components/PropertySlider";
import {
  Search,
  Star,
  Tent,
  Camera,
  Map,
  CreditCard,
  Bell,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Chatbot from "../../Components/Chatbot";

function Home() {
  const [activeSlide, setActiveSlide] = useState(0);

  // معلومات لل Feature Card
  const features = [
    {
      icon: Search,
      title: "Advanced Search",
    },
    {
      icon: Star,
      title: "Featured Farms & Chalets",
    },
    {
      icon: Tent,
      title: "Property Categories",
    },
    {
      icon: Camera,
      title: "Virtual Tour",
    },
    {
      icon: Map,
      title: "Interactive Map View",
    },
    {
      icon: CreditCard,
      title: "Secure Booking & Online Payment",
    },
    {
      icon: Star,
      title: "User Reviews & Ratings",
    },
    {
      icon: Bell,
      title: "Instant Notifications",
    },
  ];

  // ديزاين لل Feature Card
  const FeatureCard = ({ icon: Icon, title }) => (
    <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center gap-4 hover:shadow-lg transition-shadow">
      <div className="text-gray-600">
        <Icon size={24} />
      </div>
      <h3 className="text-sm text-gray-600 text-center">{title}</h3>
    </div>
  );

  
  const carouselItems = [
    {
      image:
        "https://img.freepik.com/premium-photo/swimming-pool-with-lounge-chairs-palm-trees_662214-344213.jpg?w=1380",
      title: "Find Your Perfect Getaway!",
      description:
        "Escape to the most beautiful farms & chalets for a relaxing and unforgettable stay.",
    },
    {
      image:
        "https://img.freepik.com/premium-photo/pool-house-are-designed-by-architect_1151108-39384.jpg?w=1380",
      title: "Escape to Serenity!",
      description:
        "Discover the best farms & chalets for a peaceful and unforgettable retreat.",
    },
    {
      image:
        "https://img.freepik.com/free-photo/swimming-pool_74190-7325.jpg?t=st=1739290973~exp=1739294573~hmac=ef10868121ff2fb1aa22644d055c57507d48bd8f62e3988eaad2e0deaa10a268&w=996",
      title: "Your Perfect Getaway Awaits!",
      description:
        "Browse stunning farms & chalets, book with ease, and enjoy a stress-free vacation.",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev === carouselItems.length - 1 ? 0 : prev + 1));
    }, 3000);

    return () => clearInterval(interval);
  }, [carouselItems.length]);

  return (
    <>
      {/* Hero Section */}
      <div className="relative w-full">
      <div className="relative h-[500px] overflow-hidden">
        {carouselItems.map((item, index) => (
          <div
            key={index}
            className={`absolute w-full h-full transition-opacity duration-500 ${
              index === activeSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
            <div className="flex flex-col justify-center items-center absolute bottom-0 left-0 right-0 p-8 text-white bg-[#00000030]">
              <h5 className="text-2xl font-bold">{item.title}</h5>
              <p className="text-lg">{item.description}</p>
              <Link
                  to="/property"
                  className="flex items-center space-x-2 logo-swing"
                >
                  <button className="bg-[#a4cfa7] px-6 py-3 hover:cursor-pointer text-white relative overflow-hidden z-30 group hover:bg-[#5dab79] transition-all duration-500 rounded mt-4 tracking-wider font-semibold">
                    Git Started
                    <svg
                      className="absolute inset-0 left-0 top-0 fill-[#a9cfa7] -z-30 opacity-0 group-hover:opacity-100 group-hover:duration-300 group-hover:transition-all group-active:fill-[#407b44]"
                      preserveAspectRatio="xMidYMid meet"
                      viewBox="0 0 204.000000 113.000000"
                      xmlns="http://www.w3.org/2000/svg"
                      version={1.0}
                    >
                      <g
                        stroke="none"
                        transform="translate(0.000000,113.000000) scale(0.100000,-0.100000)"
                      >
                        <path
                          d="M850 1069 c-23 -48 -27 -66 -19 -85 5 -14 9 -40 9 -57 0 -18 4 -38 9
          -46 9 -14 19 36 19 99 1 44 7 71 17 78 9 6 35 56 35 67 0 3 -9 5 -20 5 -15 0 -28 -16 -50 -61z"
                        />
                        <path d="M1662 1099 c-24 -17 -40 -34 -38 -37 3 -3 14 2 24 11 10 10 22 17 25 17 4 0 16 9 27 20 30 30 9 24 -38 -11z" />
                        <path d="M101 1104 c0 -11 3 -14 6 -6 3 7 2 16 -1 19 -3 4 -6 -2 -5 -13z" />
                        <path d="M1090 1070 c0 -6 7 -10 15 -10 8 0 15 2 15 4 0 2 -7 6 -15 10 -8 3 -15 1 -15 -4z" />
                        <path d="M1 1023 c1 -53 6 -49 11 10 2 20 0 37 -4 37 -4 0 -8 -21 -7 -47z" />
                        <path d="M1121 1024 c0 -11 3 -14 6 -6 3 7 2 16 -1 19 -3 4 -6 -2 -5 -13z" />
                        <path d="M101 984 c0 -11 3 -14 6 -6 3 7 2 16 -1 19 -3 4 -6 -2 -5 -13z" />
                        <path d="M1140 958 c0 -9 5 -20 10 -23 13 -8 13 5 0 25 -8 13 -10 13 -10 -2z" />
                        <path d="M1286 955 c4 -8 8 -15 10 -15 2 0 4 7 4 15 0 8 -4 15 -10 15 -5 0 -7 -7 -4 -15z" />
                        <path d="M1647 930 c-13 -15 -14 -20 -3 -20 7 0 16 9 19 20 3 11 4 20 3 20 -1 0 -9 -9 -19 -20z" />
                        <path d="M1171 925 c1 -19 18 -51 18 -35 0 8 -4 22 -9 30 -5 8 -9 11 -9 5z" />
                        <path
                          d="M8 875 c6 -11 22 -33 36 -49 27 -30 33 -60 16 -71 -6 -4 -19 -24 -30 -45 l-20 -39 43 -32 c23 -18 43 -34 45 -34 1 -1 4 -60 7 -131 4 -121 6 -130 30 -153 19 -20 25 -22 25 -9 0 8 -7 21 -15 28 -14 12 -15 23 -14 177 1 8 -13
            116 -66 129 -29 7 -35 44 -10 64 8 7 15 19 15 27 0 7 6 16 14 19 27 10 -11 78 -68 124 -18 14 -18 14 -8 -5z"
                        />
                        <path d="M862 830 c-12 -27 -26 -52 -31 -54 -5 -3 -2 -26 7 -51 14 -44 14 -46 -13 -85 -22 -32 -27 -47 -22 -77 11 -63 29 -65 21 -2 -6 52 -5 58 21 82 26 24 27 27 17 69 -9 34 -8 47 3 65 16 25 36 103 26 103 -3 0 -16 -22 -29 -50z" />
                        <path d="M1200 872 c0 -16 67 -89 74 -81 3 3 -12 25 -34 49 -22 24 -40 38 -40 32z" />
                        <path d="M1567 826 c-4 -10 -1 -13 8 -9 8 3 12 9 9 14 -7 12 -11 11 -17 -5z" />
                        <path d="M1536 773 c-6 -14 -5 -15 5 -6 7 7 10 15 7 18 -3 3 -9 -2 -12 -12z" />
                        <path d="M1270 770 c0 -5 7 -10 15 -10 8 0 15 -7 15 -15 0 -8 4 -15 9 -15 5 0 11 -10 14 -22 4 -12 9 -19 12 -16 14 13 -9 60 -36 74 -17 8 -29 10 -29 4z" />
                        <path d="M1344 672 c-19 -12 -29 -109 -24 -236 5 -142 18 -135 17 9 -2 156 2 188 26 216 17 19 4 27 -19 11z" />
                        <path d="M1398 673 c6 -2 18 -2 25 0 6 3 1 5 -13 5 -14 0 -19 -2 -12 -5z" />
                        <path d="M1463 673 c9 -2 25 -2 35 0 9 3 1 5 -18 5 -19 0 -27 -2 -17 -5z" />
                        <path d="M848 433 c2 -36 5 -63 7 -61 1 2 6 28 9 59 5 42 4 58 -6 61 -10 4 -12 -9 -10 -59z" />
                        <path d="M1698 403 c6 -2 18 -2 25 0 6 3 1 5 -13 5 -14 0 -19 -2 -12 -5z" />
                        <path d="M872 345 c0 -16 2 -22 5 -12 2 9 2 23 0 30 -3 6 -5 -1 -5 -18z" />
                        <path d="M1810 345 c0 -10 40 -45 53 -45 6 0 8 1 6 3 -2 1 -16 13 -31 26 -16 14 -28 21 -28 16z" />
                      </g>
                    </svg>
                  </button>
                </Link>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={() =>
          setActiveSlide((prev) => (prev === 0 ? carouselItems.length - 1 : prev - 1))
        }
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-[#eeeeee3b] text-white p-2 rounded-full"
      >
        ←
      </button>
      <button
        onClick={() =>
          setActiveSlide((prev) => (prev === carouselItems.length - 1 ? 0 : prev + 1))
        }
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-[#eeeeee3b] text-white p-2 rounded-full"
      >
        →
      </button>
    </div>

      {/* Features */}
      <div className="max-w-6xl mt-20 mx-auto p-6">
        <h2 className="text-4xl text-emerald-600 text-center mb-8">
          Unique Features
        </h2>
        <div className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
            />
          ))}
        </div>
      </div>

      {/* Property Carousel*/}
      <PropertyCarousel />

      {/* First Section */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex flex-col md:flex-row gap-8 bg-white rounded-lg overflow-hidden shadow-lg">
          {/* Image */}
          <div className="md:w-1/2">
            <img
              src="https://img.freepik.com/free-photo/beautiful-view-blue-lake-captured-from-inside-villa_181624-10734.jpg?ga=GA1.1.908539965.1736962294&semt=ais_hybrid"
              alt="Life Valley Project"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Text Content */}
          <div className="md:w-1/2 p-6 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                About Our Platform
              </h2>
              <div className="space-y-4">
                <p className="text-gray-600">
                  Discover the perfect farm & chalet for your next getaway! Our
                  platform makes it easy to browse, book, and enjoy unique
                  vacation spots with just a few clicks.
                </p>
                <p className="text-gray-600">
                  ✅ Wide Selection – Explore a variety of farms & chalets
                  tailored to your needs.
                </p>
                <p className="text-gray-600">
                  ✅ Virtual Tours – Experience properties online before
                  booking.
                </p>
                <p className="text-gray-600">
                  ✅ Secure Payments – Book with confidence using our trusted
                  payment system.
                </p>
                <p className="text-gray-600">
                  ✅ User Reviews – Read honest feedback from previous guests.
                  booking.
                </p>
                <p className="text-gray-600">
                  -- Start your journey today and find your dream retreat! --
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* First Section */}
      <div className="max-w-7xl my-20 mx-auto p-6">
        <div className="flex flex-col md:flex-row-reverse gap-8 bg-white rounded-lg overflow-hidden shadow-lg">
          {/* Image */}
          <div className="md:w-1/2">
            <img
              src="https://img.freepik.com/premium-photo/large-villa-with-large-pool-large-house-background_861622-800.jpg?ga=GA1.1.908539965.1736962294&semt=ais_hybrid"
              alt="Life Valley Project"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Text Content */}
          <div className="md:w-1/2 p-6 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Why Choose Us?
              </h2>
              <div className="space-y-4">
                <p className="text-gray-600">
                  We make finding and booking the perfect farm or chalet simple
                  and hassle-free! Here’s why users love our platform:
                </p>
                <p className="text-gray-600">
                  ✅ Easy & Fast Booking – Browse, select, and book in just a
                  few clicks. tailored to your needs.
                </p>
                <p className="text-gray-600">
                  ✅ Verified Properties – Only trusted farms & chalets for a
                  worry-free stay.
                </p>
                <p className="text-gray-600">
                  ✅ Flexible Filters – Find properties based on location,
                  price, and amenities.
                </p>
                <p className="text-gray-600">
                  ✅ 24/7 Support – Our team is always here to help with any
                  questions.
                </p>
                <p className="text-gray-600">
                  -- Your dream getaway is just one click away! --
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chatbot */}
      <Chatbot />
    </>
  );
}

export default Home;