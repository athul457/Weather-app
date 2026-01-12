import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Home() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-10%] left-[20%] w-96 h-96 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-5xl w-full z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <motion.div
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.8 }}
          variants={fadeInUp}
          className="text-center lg:text-left"
        >
          <motion.h1
            className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-white"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Weather, <br /> Reimagined.
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-blue-200 mb-8 leading-relaxed max-w-lg mx-auto lg:mx-0"
            variants={fadeInUp}
            transition={{ delay: 0.4 }}
          >
            Experience the future of forecasting with real-time analytics,
            interactive maps, and a stunning dashboard designed for you.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            variants={fadeInUp}
            transition={{ delay: 0.6 }}
          >
            <Link
              to="/dashboard"
              className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-bold text-lg transition shadow-lg hover:shadow-blue-500/50 transform hover:-translate-y-1"
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white rounded-full font-bold text-lg transition transform hover:-translate-y-1"
            >
              Log In
            </Link>
          </motion.div>
        </motion.div>

        {/* Right Content - Cards/Visuals */}
        <motion.div
          className="grid grid-cols-2 gap-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          {/* Card 1 */}
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-6 rounded-2xl shadow-xl transform translate-y-8">
            <h3 className="text-xl font-bold text-yellow-400 mb-2">Real-Time</h3>
            <p className="text-sm text-gray-300">
              Live updates from across the globe instantly.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-6 rounded-2xl shadow-xl">
            <h3 className="text-xl font-bold text-blue-400 mb-2">
              Analytics
            </h3>
            <p className="text-sm text-gray-300">
              Deep insights into trends and historical data.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-6 rounded-2xl shadow-xl">
            <h3 className="text-xl font-bold text-pink-400 mb-2">Secure</h3>
            <p className="text-sm text-gray-300">
              Enterprise-grade security and user privacy.
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-6 rounded-2xl shadow-xl transform -translate-y-8">
            <h3 className="text-xl font-bold text-green-400 mb-2">Global</h3>
            <p className="text-sm text-gray-300">
              Weather data for any city, anytime.
            </p>
          </div>
        </motion.div>
      </div>

      <motion.p
        className="absolute bottom-6 text-sm text-gray-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        © 2025 Smart Weather App. All rights reserved.
      </motion.p>
    </div>
  );
}

export default Home;
