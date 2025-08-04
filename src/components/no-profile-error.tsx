import { Info } from "lucide-react";
import UserSettings from "./user-settings";

const NoProfileError = () => {
  return (
    <div className="fixed z-50 flex items-center justify-center gap-3 bg-destructive px-5 rounded-md py-3 top-5 left-[50%] translate-x-[-50%]">
      <Info className="size-5" />
      No Profile Found <UserSettings />
    </div>
  );
};

export default NoProfileError;
