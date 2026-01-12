import ForecastTable from "../../components/dashboard/ForecastTable";
import { motion } from "framer-motion";

function Forecast() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-black">Weather Forecast</h1>
          <span className="text-sm text-blue-800">7-day detailed forecast</span>
        </div>
      </div>

      {/* Forecast Table */}
      <div className="rounded-xl backdrop-blur-md p-6 shadow-lg border border-white/20">
        <ForecastTable paginated={true} />
      </div>
    </motion.div>
  );
}

export default Forecast;
