import Sidebar from "./Sidebar";
import OutputPost from "./OutputPost";
const Test = () => {
  return (
    <div className="print:block flex lg:flex-row flex-col bg-black overflow-hidden">
      <Sidebar />
      <OutputPost />
    </div>
  );
};

export default Test;
