import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useVisualizationStore } from "@/store/visualizationStore";
import { cn } from "@/lib/utils";
import { algorithmInfo } from "@/data/algorithmInfo";

interface InfoPanelProps {
  className?: string;
}

export const InfoPanel: React.FC<InfoPanelProps> = ({ className }) => {
  const { selectedOperation, currentExplanation, currentCodeLine } = useVisualizationStore();

  const getAlgorithmInfo = () => {
    if (!selectedOperation) return null;
    return algorithmInfo[selectedOperation] || {
      title: selectedOperation.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
      description: 'Select an operation from the sidebar to see its details.',
      detailedNotes: 'Detailed notes for this operation will be available soon.',
      timeComplexity: { best: 'O(?)', average: 'O(?)', worst: 'O(?)' },
      spaceComplexity: 'O(?)',
      pseudoCode: ['// Implementation details']
    };
  };

  const info = getAlgorithmInfo();

  return (
    <motion.div 
      className={cn("h-80 border-t border-border bg-card", className)}
      initial={{ y: 320 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: 0.4 }}
    >
      <div className="h-full p-4">
        <Tabs defaultValue="description" className="h-full">
          <TabsList className="grid w-full grid-cols-5 mb-4">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="notes">Detailed Notes</TabsTrigger>
            <TabsTrigger value="explanation">Live Explanation</TabsTrigger>
            <TabsTrigger value="pseudocode">Pseudo-code</TabsTrigger>
            <TabsTrigger value="complexity">Complexity</TabsTrigger>
          </TabsList>

          <div className="h-[calc(100%-60px)]">
            <TabsContent value="description" className="h-full">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="gradient-primary bg-clip-text text-transparent">
                    {info?.title || 'Select an Algorithm'}
                  </CardTitle>
                  <CardDescription>
                    {info?.description || 'Choose an algorithm or data structure operation from the sidebar to see its description.'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {!selectedOperation ? (
                    <div className="flex items-center justify-center h-32 text-muted-foreground">
                      <p>Select an operation to view its description</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">Key Characteristics:</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• {info?.description}</li>
                          <li>• Space efficient: {info?.spaceComplexity}</li>
                          <li>• Implementation difficulty: Beginner to Intermediate</li>
                        </ul>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notes" className="h-full">
              <Card className="h-full overflow-y-auto">
                <CardHeader>
                  <CardTitle>Detailed Educational Notes</CardTitle>
                  <CardDescription>
                    Comprehensive explanation with use cases and applications
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {info?.detailedNotes ? (
                    <div className="prose prose-sm dark:prose-invert max-w-none">
                      {info.detailedNotes.split('\n\n').map((paragraph, index) => (
                        <p key={index} className="mb-3 text-sm leading-relaxed whitespace-pre-line">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-32 text-muted-foreground">
                      <p>Select an algorithm to view detailed notes</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="explanation" className="h-full">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Live Explanation</CardTitle>
                  <CardDescription>
                    Step-by-step explanation of what's happening in the current visualization
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-32 flex items-center justify-center">
                    {currentExplanation ? (
                      <motion.p 
                        className="text-center"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        key={currentExplanation}
                      >
                        {currentExplanation}
                      </motion.p>
                    ) : (
                      <p className="text-muted-foreground text-center">
                        Start a visualization to see step-by-step explanations here
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="pseudocode" className="h-full">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Pseudo-code</CardTitle>
                  <CardDescription>
                    Algorithm implementation with highlighted current execution
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="font-mono text-sm bg-muted/30 p-4 rounded-md h-32 overflow-y-auto">
                    {info?.pseudoCode.map((line, index) => (
                      <motion.div
                        key={index}
                        className={cn(
                          "py-0.5 px-2 rounded transition-smooth",
                          currentCodeLine === index && "bg-accent text-accent-foreground font-medium"
                        )}
                        animate={{
                          backgroundColor: currentCodeLine === index ? 'hsl(var(--accent))' : 'transparent'
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        <span className="text-muted-foreground mr-3">{index + 1}</span>
                        {line}
                      </motion.div>
                    )) || (
                      <p className="text-muted-foreground">Select an algorithm to see its pseudo-code</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="complexity" className="h-full">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Complexity Analysis</CardTitle>
                  <CardDescription>
                    Time and space complexity breakdown
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {info ? (
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-medium mb-3">Time Complexity</h4>
                        <div className="flex gap-4">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                              Best: {info.timeComplexity.best}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20">
                              Average: {info.timeComplexity.average}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20">
                              Worst: {info.timeComplexity.worst}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium mb-3">Space Complexity</h4>
                        <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20">
                          {info.spaceComplexity}
                        </Badge>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-32 text-muted-foreground">
                      <p>Select an algorithm to view complexity analysis</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </motion.div>
  );
};