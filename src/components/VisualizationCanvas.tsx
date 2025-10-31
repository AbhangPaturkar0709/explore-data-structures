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
