import { useState, useEffect } from "react";
import { MdEmail, MdLock } from "react-icons/md";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { getLoginAdmin } from "../../redux/middlewares/admin/login_admin";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await dispatch(getLoginAdmin(formData));

    if (response.ok) {
      navigate("/admin/dashboard");
    }
  };
  useEffect(() => {
    if (Cookies.get("admin_apikey")) {
      navigate("/admin/dashboard");
    }
  }, []);
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4 },
    },
  };

  const logoVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
      },
    },
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative">
      {/* Background with overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 bg-cover"
        style={{
          backgroundImage: `url('https://res.cloudinary.com/dsm2g8fub/image/upload/v1741957329/adbbdbce-7602-418a-b7bb-cbf9b73e91bd.png')`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
      </motion.div>

      {/* Main content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-md w-full mx-4 relative"
      >
        {/* Logo and company name */}
        <motion.div variants={logoVariants} className="text-center mb-8">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white p-3 max-w-[12rem] overflow-hidden rounded-full inline-block mb-4"
          >
            <img
              className="w-full h-full object-cover rounded-full"
              src="https://res.cloudinary.com/dsm2g8fub/image/upload/v1741947116/482223428_632237039661846_9140837627383345726_n_py2gjv.jpg"
              alt=""
            />
          </motion.div>
          <motion.h2
            variants={itemVariants}
            className="text-3xl font-bold text-white mb-2"
          >
            Admin
          </motion.h2>
          <motion.p variants={itemVariants} className="text-gray-200">
            Đăng nhập quản lý hệ thống
          </motion.p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="bg-white/95 backdrop-blur-md p-8 rounded-2xl shadow-2xl space-y-6"
          whileHover={{ boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <motion.div variants={itemVariants}>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email address
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                  <MdEmail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  maxLength={100}
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full pl-10 px-3 py-2 border outline-none border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition transform focus:scale-[1.01] origin-center"
                  placeholder="Enter your email"
                />
              </div>
            </motion.div>

            {/* Password Field */}
            <motion.div variants={itemVariants}>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                  <MdLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  maxLength={25}
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full outline-none pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition transform focus:scale-[1.01] origin-center"
                  placeholder="Enter your password"
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center z-10"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <AiFillEyeInvisible className="h-5 w-5 text-gray-400 hover:text-gray-600 transition" />
                  ) : (
                    <AiFillEye className="h-5 w-5 text-gray-400 hover:text-gray-600 transition" />
                  )}
                </motion.button>
              </div>
            </motion.div>

            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600  transition duration-200 ease-in-out"
            >
              Đăng nhập
            </motion.button>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
}
