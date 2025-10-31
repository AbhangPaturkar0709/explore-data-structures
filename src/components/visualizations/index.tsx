import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// ========== SORTING VISUALIZATION ==========
export const SortingVisualization: React.FC<{ data: any }> = ({ data }) => {
  const { array, comparing = [], swapped = [], sorted = false, highlighting = [] } = data;

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
          } else if (highlighting.includes(index)) {
            backgroundColor = 'bg-accent';
          }

          return (
            <motion.div
              key={index}
              className={cn(
                "rounded-t-md flex items-end justify-center text-white text-sm font-medium transition-smooth",
                backgroundColor
              )}
              style={{ width: barWidth, height: height, minHeight: '30px' }}
              initial={{ height: 0 }}
              animate={{ height: height }}
              transition={{ duration: 0.3, delay: index * 0.05, type: "spring", stiffness: 100 }}
              whileHover={{ scale: 1.05, zIndex: 10 }}
            >
              <span className="pb-2">{value}</span>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

// ========== ARRAY VISUALIZATION ==========
export const ArrayVisualization: React.FC<{ data: any }> = ({ data }) => {
  const { array, highlighting = [], searchRange = [], found } = data;

  if (!array) return null;

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <motion.div className="flex gap-2 mb-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        {array.map((value: any, index: number) => {
          const isHighlighted = highlighting.includes(index);
          const isInRange = searchRange.length === 0 || (index >= searchRange[0] && index <= searchRange[1]);
          const isFound = found === index;

          return (
            <motion.div
              key={index}
              className={cn(
                "w-16 h-16 border-2 rounded-lg flex items-center justify-center font-bold transition-smooth",
                isFound ? "bg-success text-success-foreground border-success shadow-glow" :
                isHighlighted ? "bg-accent text-accent-foreground border-accent shadow-glow" :
                isInRange ? "bg-card text-card-foreground border-primary" :
                "bg-muted text-muted-foreground border-muted opacity-40"
              )}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              {value}
            </motion.div>
          );
        })}
      </motion.div>
      <div className="text-sm text-muted-foreground flex gap-4">
        {array.map((_: any, i: number) => (
          <span key={i} className="w-16 text-center">{i}</span>
        ))}
      </div>
    </div>
  );
};

// ========== STACK VISUALIZATION ==========
export const StackVisualization: React.FC<{ data: any }> = ({ data }) => {
  const { stack, highlighting = [] } = data;

  if (!stack) return null;

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="flex flex-col-reverse gap-2 mb-4">
        {stack.map((value: any, index: number) => (
          <motion.div
            key={index}
            className={cn(
              "w-32 h-16 border-2 border-primary rounded-lg flex items-center justify-center font-bold text-xl",
              "bg-card text-card-foreground transition-smooth",
              highlighting.includes(index) && "bg-accent text-accent-foreground shadow-glow"
            )}
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
          >
            {value}
          </motion.div>
        ))}
      </div>
      <div className="text-sm text-muted-foreground">
        {stack.length > 0 && `Top → ${stack[stack.length - 1]}`}
      </div>
    </div>
  );
};

// ========== QUEUE VISUALIZATION ==========
export const QueueVisualization: React.FC<{ data: any }> = ({ data }) => {
  const { queue, highlighting = [] } = data;

  if (!queue) return null;

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <motion.div className="flex gap-2 mb-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        {queue.map((value: any, index: number) => (
          <motion.div
            key={index}
            className={cn(
              "w-20 h-20 border-2 border-primary rounded-lg flex items-center justify-center font-bold text-xl",
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
      <div className="flex justify-between w-full max-w-md text-sm text-muted-foreground">
        <span>Front →</span>
        <span>← Rear</span>
      </div>
    </div>
  );
};

// ========== LINKED LIST VISUALIZATION ==========
export const LinkedListVisualization: React.FC<{ data: any }> = ({ data }) => {
  const { linkedList, highlighting = [], found } = data;

  if (!linkedList) return null;

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="flex items-center gap-2">
        {linkedList.map((node: any, index: number) => {
          const isHighlighted = highlighting.includes(index);
          const isFound = found === index;

          return (
            <motion.div key={index} className="flex items-center gap-2">
              <motion.div
                className={cn(
                  "w-20 h-20 border-2 rounded-lg flex flex-col items-center justify-center font-bold",
                  "bg-card text-card-foreground transition-smooth",
                  isFound ? "bg-success text-success-foreground border-success shadow-glow" :
                  isHighlighted ? "bg-accent text-accent-foreground border-accent shadow-glow" :
                  "border-primary"
                )}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.15 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-lg">{node.value}</div>
                <div className="text-xs text-muted-foreground">Node {index}</div>
              </motion.div>
              {node.next !== null && (
                <div className="text-primary text-2xl">→</div>
              )}
            </motion.div>
          );
        })}
      </div>
      <div className="mt-4 text-sm text-muted-foreground">
        Singly Linked List
      </div>
    </div>
  );
};

// ========== TREE VISUALIZATION ==========
export const TreeVisualization: React.FC<{ data: any }> = ({ data }) => {
  const { tree, highlighting = [], found } = data;

  if (!tree || !tree.nodes) return null;

  const levels = Math.ceil(Math.log2(tree.nodes.length + 1));
  const nodeSize = 40;
  const horizontalSpacing = 80;
  const verticalSpacing = 80;

  return (
    <div className="flex flex-col items-center justify-center h-full relative">
      <svg className="absolute inset-0" style={{ width: '100%', height: '100%' }}>
        {tree.edges?.map((edge: any, idx: number) => {
          const fromNode = tree.nodes[edge.from];
          const toNode = tree.nodes[edge.to];
          if (!fromNode || !toNode) return null;

          const fromLevel = Math.floor(Math.log2(edge.from + 1));
          const toLevel = Math.floor(Math.log2(edge.to + 1));
          
          const fromX = 400 + (edge.from - (Math.pow(2, fromLevel) - 1)) * (horizontalSpacing * (4 - fromLevel));
          const fromY = 80 + fromLevel * verticalSpacing;
          const toX = 400 + (edge.to - (Math.pow(2, toLevel) - 1)) * (horizontalSpacing * (4 - toLevel));
          const toY = 80 + toLevel * verticalSpacing;

          return (
            <line
              key={idx}
              x1={fromX}
              y1={fromY}
              x2={toX}
              y2={toY}
              stroke="hsl(var(--primary))"
              strokeWidth="2"
              opacity="0.5"
            />
          );
        })}
      </svg>

      {tree.nodes.map((node: any, index: number) => {
        const level = Math.floor(Math.log2(index + 1));
        const positionInLevel = index - (Math.pow(2, level) - 1);
        const x = 400 + positionInLevel * (horizontalSpacing * (4 - level));
        const y = 80 + level * verticalSpacing;

        const isHighlighted = highlighting.includes(index);
        const isFound = found === index;

        return (
          <motion.div
            key={index}
            className={cn(
              "absolute rounded-full border-2 flex items-center justify-center font-bold",
              "bg-card text-card-foreground transition-smooth",
              isFound ? "bg-success text-success-foreground border-success shadow-glow" :
              isHighlighted ? "bg-accent text-accent-foreground border-accent shadow-glow" :
              "border-primary"
            )}
            style={{
              width: nodeSize,
              height: nodeSize,
              left: x - nodeSize / 2,
              top: y - nodeSize / 2
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.1 }}
          >
            {node.value}
          </motion.div>
        );
      })}
    </div>
  );
};

// ========== HASH TABLE VISUALIZATION ==========
export const HashTableVisualization: React.FC<{ data: any }> = ({ data }) => {
  const { hashTable, highlighting = [], found } = data;

  if (!hashTable) return null;

  return (
    <div className="flex flex-col items-center justify-center h-full gap-2">
      {hashTable.map((bucket: any[], index: number) => {
        const isHighlighted = highlighting.includes(index);
        const isFound = found === index;

        return (
          <div key={index} className="flex items-center gap-2 w-full max-w-2xl">
            <div className="w-12 text-sm font-medium text-muted-foreground text-right">
              [{index}]
            </div>
            <motion.div
              className={cn(
                "flex-1 min-h-12 border-2 rounded-lg p-2 flex items-center gap-2 transition-smooth",
                isFound ? "bg-success/10 border-success" :
                isHighlighted ? "bg-accent/10 border-accent shadow-glow" :
                "bg-card border-primary/30"
              )}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              {bucket.length === 0 ? (
                <span className="text-muted-foreground text-sm">empty</span>
              ) : (
                bucket.map((value: any, idx: number) => (
                  <div
                    key={idx}
                    className="px-3 py-1 bg-primary/20 border border-primary rounded text-sm font-medium"
                  >
                    {value}
                  </div>
                ))
              )}
            </motion.div>
          </div>
        );
      })}
    </div>
  );
};

// ========== GRAPH VISUALIZATION ==========
export const GraphVisualization: React.FC<{ data: any }> = ({ data }) => {
  const { graph, visited = [], queue = [], highlighting = [] } = data;

  if (!graph || !graph.nodes) return null;

  const positions: Record<number, { x: number; y: number }> = {};
  const radius = 150;
  const centerX = 400;
  const centerY = 250;

  graph.nodes.forEach((node: any, index: number) => {
    const angle = (2 * Math.PI * index) / graph.nodes.length - Math.PI / 2;
    positions[node.id] = {
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle)
    };
  });

  return (
    <div className="flex flex-col items-center justify-center h-full relative">
      <svg className="absolute inset-0" style={{ width: '100%', height: '100%' }}>
        {graph.edges?.map((edge: any, idx: number) => {
          const fromPos = positions[edge.from];
          const toPos = positions[edge.to];
          if (!fromPos || !toPos) return null;

          return (
            <g key={idx}>
              <line
                x1={fromPos.x}
                y1={fromPos.y}
                x2={toPos.x}
                y2={toPos.y}
                stroke="hsl(var(--primary))"
                strokeWidth="2"
                opacity="0.4"
              />
              {edge.weight && (
                <text
                  x={(fromPos.x + toPos.x) / 2}
                  y={(fromPos.y + toPos.y) / 2}
                  fill="hsl(var(--accent))"
                  fontSize="14"
                  fontWeight="bold"
                >
                  {edge.weight}
                </text>
              )}
            </g>
          );
        })}
      </svg>

      {graph.nodes.map((node: any) => {
        const pos = positions[node.id];
        if (!pos) return null;

        const isVisited = visited.includes(node.id);
        const isInQueue = queue.includes(node.id);
        const isHighlighted = highlighting.includes(node.id);

        return (
          <motion.div
            key={node.id}
            className={cn(
              "absolute w-16 h-16 rounded-full border-2 flex flex-col items-center justify-center font-bold transition-smooth",
              isHighlighted ? "bg-accent text-accent-foreground border-accent shadow-glow" :
              isVisited ? "bg-success text-success-foreground border-success" :
              isInQueue ? "bg-warning text-warning-foreground border-warning" :
              "bg-card text-card-foreground border-primary"
            )}
            style={{ left: pos.x - 32, top: pos.y - 32 }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: node.id * 0.1 }}
            whileHover={{ scale: 1.1 }}
          >
            <div className="text-lg">{node.value}</div>
            {node.distance !== undefined && node.distance !== Infinity && (
              <div className="text-xs">d:{node.distance}</div>
            )}
          </motion.div>
        );
      })}

      {queue.length > 0 && (
        <div className="absolute bottom-4 left-4 bg-card border border-border rounded-lg p-2">
          <div className="text-xs text-muted-foreground mb-1">Queue:</div>
          <div className="flex gap-1">
            {queue.map((nodeId: number) => (
              <div key={nodeId} className="px-2 py-1 bg-warning/20 border border-warning rounded text-xs">
                {graph.nodes[nodeId]?.value}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// ========== DEFAULT/GENERIC VISUALIZATION ==========
export const GenericVisualization: React.FC<{ data: any }> = ({ data }) => {
  return (
    <motion.div 
      className="flex items-center justify-center h-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="text-center">
        <div className="w-32 h-32 rounded-full gradient-primary opacity-20 mb-6 flex items-center justify-center mx-auto">
          <div className="text-2xl font-bold">DSA</div>
        </div>
        <p className="text-muted-foreground">
          Select an algorithm to see its visualization
        </p>
      </div>
    </motion.div>
  );
};
