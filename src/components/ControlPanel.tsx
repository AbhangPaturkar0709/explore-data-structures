import { useState } from "react";
import { Play, Pause, SkipBack, SkipForward, RotateCcw, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { useVisualizationStore } from "@/store/visualizationStore";
import { cn } from "@/lib/utils";

const inputExamples = {
  'bubble-sort': '64, 34, 25, 12, 22, 11, 90',
  'array-insert': '1, 3, 5, 7, 9',
  'binary-search': '2, 5, 8, 12, 16, 23, 38, 45, 67, 78, 89, 99',
  'bst-insert': '50, 30, 70, 20, 40, 60, 80',
  'linear-search': '3, 7, 1, 9, 4, 6, 2, 8, 5'
};

const inputPlaceholders = {
  'bubble-sort': 'Enter numbers separated by commas (e.g., 64, 34, 25, 12)',
  'array-insert': 'Enter array elements (e.g., 1, 3, 5, 7, 9)',
  'binary-search': 'Enter sorted array elements (e.g., 2, 5, 8, 12, 16)',
  'bst-insert': 'Enter numbers to build BST (e.g., 50, 30, 70, 20)',
  'linear-search': 'Enter array elements and target (e.g., 3, 7, 1, 9 | target: 7)'
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
    
    // Generate mock animation steps based on the algorithm
    const mockSteps = generateMockSteps(selectedOperation, inputData);
    useVisualizationStore.getState().setAnimationSteps(mockSteps);
    
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

// Mock step generation for demonstration
function generateMockSteps(operation: string, data: string): any[] {
  const numbers = data.split(',').map(s => parseInt(s.trim())).filter(n => !isNaN(n));
  
  if (operation === 'bubble-sort') {
    const steps = [];
    const arr = [...numbers];
    
    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        steps.push({
          array: [...arr],
          comparing: [j, j + 1],
          explanation: `Comparing elements at positions ${j} and ${j + 1}: ${arr[j]} and ${arr[j + 1]}`,
          pseudoCodeLine: 2
        });
        
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          steps.push({
            array: [...arr],
            swapped: [j, j + 1],
            explanation: `Swapped ${arr[j + 1]} and ${arr[j]} because ${arr[j + 1]} > ${arr[j]}`,
            pseudoCodeLine: 3
          });
        }
      }
    }
    
    steps.push({
      array: [...arr],
      sorted: true,
      explanation: 'Array is now sorted!',
      pseudoCodeLine: -1
    });
    
    return steps;
  }
  
  // Default mock steps for other operations
  return [
    { 
      array: numbers, 
      explanation: `Starting ${operation} with input: ${numbers.join(', ')}`,
      pseudoCodeLine: 0 
    },
    { 
      array: numbers, 
      explanation: `Processing ${operation}...`,
      pseudoCodeLine: 1 
    },
    { 
      array: numbers, 
      explanation: `${operation} completed!`,
      pseudoCodeLine: -1 
    }
  ];
}