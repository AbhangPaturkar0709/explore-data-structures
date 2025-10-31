import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useVisualizationStore } from "@/store/visualizationStore";
import { cn } from "@/lib/utils";
import {
  SortingVisualization,
  ArrayVisualization,
  StackVisualization,
  QueueVisualization,
  LinkedListVisualization,
  TreeVisualization,
  HashTableVisualization,
  GraphVisualization,
  GenericVisualization
} from "./visualizations";

interface CanvasProps {
  className?: string;
}

export const VisualizationCanvas: React.FC<CanvasProps> = ({ className }) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const { 
    animationSteps, 
    currentStep, 
    selectedOperation, 
    setCurrentExplanation,
    setCurrentCodeLine 
  } = useVisualizationStore();

  const currentStepData = animationSteps[currentStep] || null;

  useEffect(() => {
    if (currentStepData) {
      setCurrentExplanation(currentStepData.explanation || '');
      setCurrentCodeLine(currentStepData.pseudoCodeLine || -1);
    }
  }, [currentStep, currentStepData, setCurrentExplanation, setCurrentCodeLine]);

  const renderVisualization = () => {
    if (!currentStepData || !selectedOperation) {
      return (
        <motion.div 
          className="flex flex-col items-center justify-center h-full text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-24 h-24 rounded-full gradient-primary opacity-20 mb-6 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-background"></div>
          </div>
          <h3 className="text-xl font-semibold text-muted-foreground mb-2">
            Ready to Visualize
          </h3>
          <p className="text-muted-foreground max-w-md">
            Select an algorithm or data structure operation from the sidebar, 
            enter your input data, and click "Visualize" to see it in action.
          </p>
        </motion.div>
      );
    }

    // Route to appropriate visualization based on operation type
    if (selectedOperation.includes('sort')) {
      return <SortingVisualization data={currentStepData} />;
    }
    
    if (selectedOperation.includes('search') && !selectedOperation.includes('hash')) {
      return <ArrayVisualization data={currentStepData} />;
    }
    
    if (selectedOperation.startsWith('array-')) {
      return <ArrayVisualization data={currentStepData} />;
    }
    
    if (selectedOperation.startsWith('stack-')) {
      return <StackVisualization data={currentStepData} />;
    }
    
    if (selectedOperation.startsWith('queue-')) {
      return <QueueVisualization data={currentStepData} />;
    }
    
    if (selectedOperation.startsWith('ll-')) {
      return <LinkedListVisualization data={currentStepData} />;
    }
    
    if (selectedOperation.startsWith('bst-') || selectedOperation.startsWith('tree-')) {
      return <TreeVisualization data={currentStepData} />;
    }
    
    if (selectedOperation.startsWith('hash-')) {
      return <HashTableVisualization data={currentStepData} />;
    }
    
    if (['bfs', 'dfs', 'dijkstra'].includes(selectedOperation)) {
      return <GraphVisualization data={currentStepData} />;
    }

    return <GenericVisualization data={currentStepData} />;
  };

  return (
    <div 
      ref={canvasRef}
      className={cn(
        "flex-1 bg-canvas border border-border rounded-lg canvas-grid overflow-hidden",
        className
      )}
    >
      <div className="h-full p-8">
        {renderVisualization()}
      </div>
    </div>
  );
};

// Sorting algorithms visualization
const SortingVisualization: React.FC<{ data: any }> = ({ data }) => {
  const { array, comparing = [], swapped = [], sorted = false } = data;

  if (!array) return null;

  const maxValue = Math.max(...array);
  const barWidth = Math.min(60, 400 / array.length);
  const containerWidth = array.length * (barWidth + 4) - 4;

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <motion.div 
        className="flex items-end gap-1 mb-8"
        style={{ width: containerWidth }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {array.map((value: number, index: number) => {
          const height = (value / maxValue) * 200 + 20;
          let backgroundColor = 'bg-primary';
          
          if (sorted) {
            backgroundColor = 'bg-success';
          } else if (comparing.includes(index)) {
            backgroundColor = 'bg-warning';
          } else if (swapped.includes(index)) {
            backgroundColor = 'bg-destructive';
          }

          return (
            <motion.div
              key={index}
              className={cn(
                "rounded-t-md flex items-end justify-center text-white text-sm font-medium transition-smooth",
                backgroundColor
              )}
              style={{ 
                width: barWidth, 
                height: height,
                minHeight: '30px'
              }}
              initial={{ height: 0 }}
              animate={{ height: height }}
              transition={{ 
                duration: 0.3, 
                delay: index * 0.05,
                type: "spring",
                stiffness: 100 
              }}
              whileHover={{ scale: 1.05, zIndex: 10 }}
            >
              <span className="pb-2">{value}</span>
            </motion.div>
          );
        })}
      </motion.div>

      {comparing.length > 0 && (
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p className="text-sm text-warning">
            Comparing: {comparing.map(i => array[i]).join(' and ')}
          </p>
        </motion.div>
      )}
    </div>
  );
};

// Array operations visualization
const ArrayVisualization: React.FC<{ data: any }> = ({ data }) => {
  const { array, highlighting = [], operation } = data;

  if (!array) return null;

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <motion.div 
        className="flex gap-2 mb-8"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {array.map((value: any, index: number) => (
          <motion.div
            key={index}
            className={cn(
              "w-16 h-16 border-2 border-primary rounded-lg flex items-center justify-center font-bold",
              "bg-card text-card-foreground transition-smooth",
              highlighting.includes(index) && "bg-accent text-accent-foreground shadow-glow"
            )}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
          >
            {value}
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <p className="text-sm text-muted-foreground">
          Array indices: {array.map((_: any, i: number) => i).join(', ')}
        </p>
      </motion.div>
    </div>
  );
};

// Generic visualization for other data structures
const GenericVisualization: React.FC<{ data: any }> = ({ data }) => {
  return (
    <motion.div 
      className="flex items-center justify-center h-full"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center">
        <div className="w-32 h-32 rounded-full gradient-primary opacity-80 mb-6 flex items-center justify-center mx-auto">
          <div className="text-2xl font-bold text-primary-foreground">
            {JSON.stringify(data).length > 50 ? '...' : JSON.stringify(data)}
          </div>
        </div>
        <p className="text-muted-foreground">
          Generic visualization - More specific renderers coming soon!
        </p>
      </div>
    </motion.div>
  );
};