import { useState } from "react";
import { ChevronRight, ChevronDown, Database, GitBranch, Search, ArrowUpDown, Hash, Shuffle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useVisualizationStore } from "@/store/visualizationStore";
import { cn } from "@/lib/utils";

interface TopicNode {
  id: string;
  label: string;
  icon?: any;
  children?: TopicNode[];
  isOperation?: boolean;
}

const dsaTopics: TopicNode[] = [
  {
    id: "data-structures",
    label: "Data Structures",
    icon: Database,
    children: [
      {
        id: "linear",
        label: "Linear",
        children: [
          {
            id: "array",
            label: "Array",
            children: [
              { id: "array-access", label: "Access Element", isOperation: true },
              { id: "array-insert", label: "Insert Element", isOperation: true },
              { id: "array-delete", label: "Delete Element", isOperation: true },
            ]
          },
          {
            id: "linked-list",
            label: "Linked List",
            children: [
              { id: "ll-insert-head", label: "Insert at Head", isOperation: true },
              { id: "ll-insert-tail", label: "Insert at Tail", isOperation: true },
              { id: "ll-delete", label: "Delete Node", isOperation: true },
              { id: "ll-search", label: "Search", isOperation: true },
            ]
          },
          {
            id: "stack",
            label: "Stack",
            children: [
              { id: "stack-push", label: "Push", isOperation: true },
              { id: "stack-pop", label: "Pop", isOperation: true },
              { id: "stack-peek", label: "Peek", isOperation: true },
            ]
          },
          {
            id: "queue",
            label: "Queue",
            children: [
              { id: "queue-enqueue", label: "Enqueue", isOperation: true },
              { id: "queue-dequeue", label: "Dequeue", isOperation: true },
            ]
          }
        ]
      },
      {
        id: "non-linear",
        label: "Non-Linear",
        children: [
          {
            id: "binary-tree",
            label: "Binary Tree",
            children: [
              { id: "tree-insert", label: "Insert", isOperation: true },
              { id: "tree-search", label: "Search", isOperation: true },
              { id: "tree-delete", label: "Delete", isOperation: true },
              { id: "tree-traversal", label: "Traversal", isOperation: true },
            ]
          },
          {
            id: "bst",
            label: "Binary Search Tree",
            children: [
              { id: "bst-insert", label: "Insert", isOperation: true },
              { id: "bst-search", label: "Search", isOperation: true },
              { id: "bst-delete", label: "Delete", isOperation: true },
            ]
          }
        ]
      },
      {
        id: "hashing",
        label: "Hashing",
        icon: Hash,
        children: [
          {
            id: "hash-table",
            label: "Hash Table",
            children: [
              { id: "hash-insert", label: "Insert", isOperation: true },
              { id: "hash-search", label: "Search", isOperation: true },
              { id: "hash-delete", label: "Delete", isOperation: true },
            ]
          }
        ]
      }
    ]
  },
  {
    id: "algorithms",
    label: "Algorithms",
    icon: GitBranch,
    children: [
      {
        id: "sorting",
        label: "Sorting",
        icon: ArrowUpDown,
        children: [
          { id: "bubble-sort", label: "Bubble Sort", isOperation: true },
          { id: "selection-sort", label: "Selection Sort", isOperation: true },
          { id: "insertion-sort", label: "Insertion Sort", isOperation: true },
          { id: "merge-sort", label: "Merge Sort", isOperation: true },
          { id: "quick-sort", label: "Quick Sort", isOperation: true },
        ]
      },
      {
        id: "searching",
        label: "Searching",
        icon: Search,
        children: [
          { id: "linear-search", label: "Linear Search", isOperation: true },
          { id: "binary-search", label: "Binary Search", isOperation: true },
        ]
      },
      {
        id: "graph",
        label: "Graph",
        icon: Shuffle,
        children: [
          { id: "bfs", label: "Breadth-First Search", isOperation: true },
          { id: "dfs", label: "Depth-First Search", isOperation: true },
          { id: "dijkstra", label: "Dijkstra's Algorithm", isOperation: true },
        ]
      }
    ]
  }
];

interface TreeNodeProps {
  node: TopicNode;
  level: number;
  expandedNodes: Set<string>;
  onToggle: (nodeId: string) => void;
  onSelect: (nodeId: string, isOperation: boolean) => void;
  selectedTopic: string | null;
  selectedOperation: string | null;
}

const TreeNode: React.FC<TreeNodeProps> = ({ 
  node, 
  level, 
  expandedNodes, 
  onToggle, 
  onSelect,
  selectedTopic,
  selectedOperation 
}) => {
  const isExpanded = expandedNodes.has(node.id);
  const hasChildren = node.children && node.children.length > 0;
  const isSelected = node.isOperation 
    ? selectedOperation === node.id 
    : selectedTopic === node.id;

  const handleClick = () => {
    if (hasChildren) {
      onToggle(node.id);
    }
    if (node.isOperation) {
      onSelect(node.id, true);
    } else if (!hasChildren) {
      onSelect(node.id, false);
    }
  };

  const Icon = node.icon;

  return (
    <div>
      <motion.div
        className={cn(
          "flex items-center gap-2 px-2 py-1.5 cursor-pointer rounded-md transition-smooth",
          "hover:bg-nav-hover",
          isSelected && "bg-nav-active text-primary-foreground font-medium",
          level > 0 && "ml-4"
        )}
        style={{ paddingLeft: `${8 + level * 16}px` }}
        onClick={handleClick}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {hasChildren && (
          <motion.div
            animate={{ rotate: isExpanded ? 90 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronRight className="h-3 w-3 text-muted-foreground" />
          </motion.div>
        )}
        {!hasChildren && <div className="w-3" />}
        
        {Icon && <Icon className="h-4 w-4" />}
        
        <span className={cn(
          "text-sm",
          node.isOperation && "text-accent font-medium",
          level === 0 && "font-semibold"
        )}>
          {node.label}
        </span>
      </motion.div>

      <AnimatePresence>
        {hasChildren && isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            {node.children!.map((child) => (
              <TreeNode
                key={child.id}
                node={child}
                level={level + 1}
                expandedNodes={expandedNodes}
                onToggle={onToggle}
                onSelect={onSelect}
                selectedTopic={selectedTopic}
                selectedOperation={selectedOperation}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const Sidebar: React.FC = () => {
  const [expandedNodes, setExpandedNodes] = useState(new Set(["data-structures", "algorithms"]));
  const { selectedTopic, selectedOperation, setSelectedTopic, setSelectedOperation } = useVisualizationStore();

  const handleToggle = (nodeId: string) => {
    const newExpanded = new Set(expandedNodes);
    if (newExpanded.has(nodeId)) {
      newExpanded.delete(nodeId);
    } else {
      newExpanded.add(nodeId);
    }
    setExpandedNodes(newExpanded);
  };

  const handleSelect = (nodeId: string, isOperation: boolean) => {
    if (isOperation) {
      setSelectedOperation(nodeId);
    } else {
      setSelectedTopic(nodeId);
      setSelectedOperation(null);
    }
  };

  return (
    <motion.div 
      className="w-80 bg-nav-background border-r border-border shadow-nav p-4 overflow-y-auto"
      initial={{ x: -320 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="mb-6">
        <h2 className="text-xl font-bold gradient-primary bg-clip-text text-transparent">
          Algopedia
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Interactive DSA Encyclopedia
        </p>
      </div>

      <div className="space-y-1">
        {dsaTopics.map((topic) => (
          <TreeNode
            key={topic.id}
            node={topic}
            level={0}
            expandedNodes={expandedNodes}
            onToggle={handleToggle}
            onSelect={handleSelect}
            selectedTopic={selectedTopic}
            selectedOperation={selectedOperation}
          />
        ))}
      </div>
    </motion.div>
  );
};