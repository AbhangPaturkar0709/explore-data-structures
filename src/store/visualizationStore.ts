import { create } from 'zustand';

export interface VisualizationState {
  isPlaying: boolean;
  currentStep: number;
  totalSteps: number;
  speed: number;
  selectedTopic: string | null;
  selectedOperation: string | null;
  inputData: string;
  animationSteps: any[];
  currentExplanation: string;
  pseudoCode: string[];
  currentCodeLine: number;
}

interface VisualizationActions {
  setPlaying: (playing: boolean) => void;
  setCurrentStep: (step: number) => void;
  setSpeed: (speed: number) => void;
  setSelectedTopic: (topic: string) => void;
  setSelectedOperation: (operation: string) => void;
  setInputData: (data: string) => void;
  setAnimationSteps: (steps: any[]) => void;
  setCurrentExplanation: (explanation: string) => void;
  setPseudoCode: (code: string[]) => void;
  setCurrentCodeLine: (line: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  reset: () => void;
}

export type VisualizationStore = VisualizationState & VisualizationActions;

export const useVisualizationStore = create<VisualizationStore>((set, get) => ({
  // State
  isPlaying: false,
  currentStep: 0,
  totalSteps: 0,
  speed: 1,
  selectedTopic: null,
  selectedOperation: null,
  inputData: '',
  animationSteps: [],
  currentExplanation: '',
  pseudoCode: [],
  currentCodeLine: -1,

  // Actions
  setPlaying: (playing) => set({ isPlaying: playing }),
  setCurrentStep: (step) => {
    const state = get();
    set({
      currentStep: Math.max(0, Math.min(step, state.totalSteps - 1))
    });
  },
  setSpeed: (speed) => set({ speed: Math.max(0.1, Math.min(speed, 3)) }),
  setSelectedTopic: (topic) => set({ selectedTopic: topic }),
  setSelectedOperation: (operation) => set({ selectedOperation: operation }),
  setInputData: (data) => set({ inputData: data }),
  setAnimationSteps: (steps) => set({ 
    animationSteps: steps, 
    totalSteps: steps.length,
    currentStep: 0
  }),
  setCurrentExplanation: (explanation) => set({ currentExplanation: explanation }),
  setPseudoCode: (code) => set({ pseudoCode: code }),
  setCurrentCodeLine: (line) => set({ currentCodeLine: line }),
  nextStep: () => {
    const state = get();
    if (state.currentStep < state.totalSteps - 1) {
      set({ currentStep: state.currentStep + 1 });
    }
  },
  prevStep: () => {
    const state = get();
    if (state.currentStep > 0) {
      set({ currentStep: state.currentStep - 1 });
    }
  },
  reset: () => set({ 
    currentStep: 0, 
    isPlaying: false,
    currentExplanation: '',
    currentCodeLine: -1
  }),
}));