import { motion } from "framer-motion";
import { Sidebar } from "./Sidebar";
import { ControlPanel } from "./ControlPanel";
import { VisualizationCanvas } from "./VisualizationCanvas";
import { InfoPanel } from "./InfoPanel";

export const AlgopediaLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <motion.div 
        className="flex h-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Left Sidebar */}
        <Sidebar />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Top Control Panel */}
          <ControlPanel />

          {/* Main Visualization Area */}
          <div className="flex-1 flex flex-col p-4 gap-4 overflow-hidden">
            {/* Visualization Canvas */}
            <VisualizationCanvas className="flex-[7]" />

            {/* Information Panel */}
            <InfoPanel className="flex-[3]" />
          </div>
        </div>
      </motion.div>
    </div>
  );
};