import { useState } from "react";
import { Play, Pause, SkipBack, SkipForward, RotateCcw, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { useVisualizationStore } from "@/store/visualizationStore";
import { cn } from "@/lib/utils";
import { generateAlgorithmSteps } from "@/algorithms/algorithmGenerators";

const inputExamples: Record<string, string> = {
  'bubble-sort': '64, 34, 25, 12, 22, 11, 90',
  'selection-sort': '29, 10, 14, 37, 13',
  'insertion-sort': '12, 11, 13, 5, 6',
  'merge-sort': '38, 27, 43, 3, 9, 82, 10',
  'quick-sort': '10, 7, 8, 9, 1, 5',
  'heap-sort': '4, 10, 3, 5, 1',
  'array-insert': '1, 3, 5, 7, 9',
  'array-delete': '1, 2, 3, 4, 5, 6, 7',
  'array-access': '10, 20, 30, 40, 50',
  'linear-search': '3, 7, 1, 9, 4, 6, 2, 8, 5',
  'binary-search': '2, 5, 8, 12, 16, 23, 38, 45, 67, 78',
  'jump-search': '0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55',
  'stack-push': '5, 10, 15, 20',
  'stack-pop': '5, 10, 15, 20, 25',
  'stack-peek': '5, 10, 15, 20',
  'queue-enqueue': '1, 2, 3, 4',
  'queue-dequeue': '1, 2, 3, 4, 5',
  'll-insert-head': '10, 20, 30, 40',
  'll-insert-tail': '10, 20, 30, 40',
  'll-delete': '10, 20, 30, 40, 50',
  'll-search': '10, 20, 30, 40, 30',
  'bst-insert': '50, 30, 70, 20, 40, 60, 80',
  'bst-search': '50, 30, 70, 20, 40, 60, 80, 40',
  'bst-delete': '50, 30, 70, 20, 40, 60, 80',
  'tree-insert': '1, 2, 3, 4, 5, 6, 7',
  'tree-search': '1, 2, 3, 4, 5, 6, 7, 5',
  'tree-delete': '1, 2, 3, 4, 5, 6, 7',
  'tree-traversal': '1, 2, 3, 4, 5, 6, 7',
  'hash-insert': '15, 11, 27, 8, 12',
  'hash-search': '15, 11, 27, 8, 12, 27',
  'hash-delete': '15, 11, 27, 8, 12',
  'bfs': '1, 2, 3, 4, 5, 6',
  'dfs': '1, 2, 3, 4, 5, 6',
  'dijkstra': '0, 1, 2, 3, 4'
};

const inputPlaceholders: Record<string, string> = {
  'bubble-sort': 'Enter numbers separated by commas (e.g., 64, 34, 25)',
  'selection-sort': 'Enter numbers (e.g., 29, 10, 14, 37)',
  'insertion-sort': 'Enter numbers (e.g., 12, 11, 13, 5)',
  'merge-sort': 'Enter numbers (e.g., 38, 27, 43, 3)',
  'quick-sort': 'Enter numbers (e.g., 10, 7, 8, 9, 1)',
  'heap-sort': 'Enter numbers (e.g., 4, 10, 3, 5, 1)',
  'array-insert': 'Enter array elements (e.g., 1, 3, 5, 7)',
  'array-delete': 'Enter array elements (e.g., 1, 2, 3, 4)',
  'array-access': 'Enter array elements (e.g., 10, 20, 30)',
  'linear-search': 'Enter array, last element is target (e.g., 3, 7, 1, 9, 7)',
  'binary-search': 'Enter array, last is target (e.g., 2, 5, 8, 12, 8)',
  'jump-search': 'Enter sorted array, last is target (e.g., 0, 1, 1, 2, 3, 5, 8, 5)',
  'stack-push': 'Enter stack elements, last will be pushed (e.g., 5, 10, 15)',
  'stack-pop': 'Enter stack elements (e.g., 5, 10, 15, 20)',
  'stack-peek': 'Enter stack elements (e.g., 5, 10, 15)',
  'queue-enqueue': 'Enter queue, last will be enqueued (e.g., 1, 2, 3)',
  'queue-dequeue': 'Enter queue elements (e.g., 1, 2, 3, 4)',
  'll-insert-head': 'Enter list, last inserted at head (e.g., 10, 20, 30)',
  'll-insert-tail': 'Enter list, last inserted at tail (e.g., 10, 20, 30)',
  'll-delete': 'Enter linked list elements (e.g., 10, 20, 30, 40)',
  'll-search': 'Enter list, last is search target (e.g., 10, 20, 30, 20)',
  'bst-insert': 'Enter numbers to build BST (e.g., 50, 30, 70, 20)',
  'bst-search': 'Enter BST nodes, last is target (e.g., 50, 30, 70, 30)',
  'bst-delete': 'Enter BST nodes (e.g., 50, 30, 70, 20)',
  'tree-insert': 'Enter tree nodes (e.g., 1, 2, 3, 4, 5)',
  'tree-search': 'Enter tree, last is target (e.g., 1, 2, 3, 4, 3)',
  'tree-delete': 'Enter tree nodes (e.g., 1, 2, 3, 4, 5)',
  'tree-traversal': 'Enter tree nodes (e.g., 1, 2, 3, 4, 5, 6)',
  'hash-insert': 'Enter keys to hash (e.g., 15, 11, 27, 8)',
  'hash-search': 'Enter keys, last is target (e.g., 15, 11, 27, 11)',
  'hash-delete': 'Enter keys (e.g., 15, 11, 27, 8)',
  'bfs': 'Enter node values for graph (e.g., 1, 2, 3, 4, 5)',
  'dfs': 'Enter node values for graph (e.g., 1, 2, 3, 4, 5)',
  'dijkstra': 'Enter node values (e.g., 0, 1, 2, 3, 4)'
};

export const ControlPanel: React.FC = () => {
  const {
    isPlaying,
    currentStep,
    totalSteps,
    speed,
    selectedOperation,
    inputData,
    setPlaying,
    setCurrentStep,
    setSpeed,
    setInputData,
    nextStep,
    prevStep,
    reset
  } = useVisualizationStore();

  const [isProcessing, setIsProcessing] = useState(false);

  const handlePlay = () => {
    if (!isPlaying) {
      setPlaying(true);
      // Auto-advance steps based on speed
      const interval = setInterval(() => {
        const store = useVisualizationStore.getState();
        if (store.isPlaying && store.currentStep < store.totalSteps - 1) {
          store.nextStep();
        } else {
          store.setPlaying(false);
          clearInterval(interval);
        }
      }, 1000 / speed);
    } else {
      setPlaying(false);
    }
  };

  const handleVisualize = async () => {
    if (!selectedOperation || !inputData.trim()) return;
    
    setIsProcessing(true);
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Generate animation steps based on the algorithm
    const steps = generateAlgorithmSteps(selectedOperation, inputData);
    useVisualizationStore.getState().setAnimationSteps(steps);
    
    setIsProcessing(false);
  };

  const loadExample = () => {
    if (selectedOperation && inputExamples[selectedOperation as keyof typeof inputExamples]) {
      setInputData(inputExamples[selectedOperation as keyof typeof inputExamples]);
    }
  };

  const getPlaceholder = () => {
    return selectedOperation ? 
      inputPlaceholders[selectedOperation as keyof typeof inputPlaceholders] || 'Enter your input data...' :
      'Select an algorithm or data structure operation first...';
  };

  return (
    <motion.div 
      className="h-20 bg-card border-b border-border shadow-card px-6 py-3"
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
    >
      <div className="flex items-center gap-4 h-full">
        {/* Input Section */}
        <div className="flex-1 flex items-center gap-3">
          <div className="flex-1 relative">
            <Textarea
              value={inputData}
              onChange={(e) => setInputData(e.target.value)}
              placeholder={getPlaceholder()}
              disabled={!selectedOperation}
              className={cn(
                "min-h-[40px] max-h-[40px] resize-none transition-smooth",
                "focus:ring-2 focus:ring-primary/50",
                !selectedOperation && "opacity-50"
              )}
            />
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={loadExample}
            disabled={!selectedOperation}
            className="whitespace-nowrap"
          >
            Load Example
          </Button>
          
          <Button
            onClick={handleVisualize}
            disabled={!selectedOperation || !inputData.trim() || isProcessing}
            className={cn(
              "gradient-primary text-primary-foreground font-medium px-6",
              "hover:shadow-glow transition-smooth"
            )}
          >
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              'Visualize'
            )}
          </Button>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center gap-2 border-l border-border pl-4">
          <Button
            variant="outline"
            size="sm"
            onClick={prevStep}
            disabled={currentStep === 0 || totalSteps === 0}
          >
            <SkipBack className="h-4 w-4" />
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handlePlay}
            disabled={totalSteps === 0}
            className={cn(
              isPlaying && "bg-primary text-primary-foreground"
            )}
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={nextStep}
            disabled={currentStep === totalSteps - 1 || totalSteps === 0}
          >
            <SkipForward className="h-4 w-4" />
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={reset}
            disabled={totalSteps === 0}
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>

        {/* Speed Control */}
        <div className="flex items-center gap-2 border-l border-border pl-4 min-w-[120px]">
          <span className="text-sm text-muted-foreground">Speed:</span>
          <Slider
            value={[speed]}
            onValueChange={(value) => setSpeed(value[0])}
            max={3}
            min={0.1}
            step={0.1}
            className="flex-1"
          />
          <span className="text-xs text-muted-foreground w-8 text-center">
            {speed.toFixed(1)}x
          </span>
        </div>

        {/* Step Counter */}
        {totalSteps > 0 && (
          <div className="text-sm text-muted-foreground border-l border-border pl-4">
            Step {currentStep + 1} / {totalSteps}
          </div>
        )}
      </div>
    </motion.div>
  );
};