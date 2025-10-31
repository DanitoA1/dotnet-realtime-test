import { useState } from "react";
import { Tab } from "@headlessui/react";
import Dashboard from "./Dashboard";
import TreeView from "./TreeView";
import DataTable from "./DataTable";
import DetailPanel from "./DetailPanel";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const SclViewer: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<any>(null);
  const [selectedType, setSelectedType] = useState<string>("");

  const handleNodeSelect = (node: any, type: string) => {
    setSelectedNode(node);
    setSelectedType(type);
  };

  return (
    <div className="space-y-6">
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
          <Tab
            className={({ selected }) =>
              classNames(
                "w-full rounded-lg py-2.5 text-sm font-medium leading-5",
                "ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                selected
                  ? "bg-white text-blue-700 shadow"
                  : "text-blue-900 hover:bg-white/[0.12] hover:text-blue-800"
              )
            }
          >
            Dashboard
          </Tab>
          <Tab
            className={({ selected }) =>
              classNames(
                "w-full rounded-lg py-2.5 text-sm font-medium leading-5",
                "ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                selected
                  ? "bg-white text-blue-700 shadow"
                  : "text-blue-900 hover:bg-white/[0.12] hover:text-blue-800"
              )
            }
          >
            Structure
          </Tab>
          <Tab
            className={({ selected }) =>
              classNames(
                "w-full rounded-lg py-2.5 text-sm font-medium leading-5",
                "ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                selected
                  ? "bg-white text-blue-700 shadow"
                  : "text-blue-900 hover:bg-white/[0.12] hover:text-blue-800"
              )
            }
          >
            Data Tables
          </Tab>
        </Tab.List>
        <Tab.Panels className="mt-6">
          <Tab.Panel>
            <Dashboard />
          </Tab.Panel>
          <Tab.Panel>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <TreeView onNodeSelect={handleNodeSelect} />
              <DetailPanel
                selectedNode={selectedNode}
                selectedType={selectedType}
              />
            </div>
          </Tab.Panel>
          <Tab.Panel>
            <DataTable />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default SclViewer;
