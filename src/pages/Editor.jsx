import React from "react";
import Sidebar from "../Components/Sidebar";
import OutputPost from "../Components/OutputPost";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/Components/ui/resizable";

const Editor = () => {
  return (
    <div className="bg-background print:h-auto h-screen">
      <ResizablePanelGroup direction="horizontal" className="h-screen">
        <ResizablePanel
          className="hideOnPrint"
          defaultSize={25}
          minSize={25}
          maxSize={45}
        >
          <div className="">
            <Sidebar />
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle className="hideOnPrint" />
        <ResizablePanel defaultSize={75}>
          <div className="print:h-auto h-screen print:overflow-visible overflow-y-scroll flex justify-center">
            <OutputPost />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default Editor;
