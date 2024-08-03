import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useUser } from "@/lib/useUser";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { UserCog } from "lucide-react";
// import { useToast } from "./ui/use-toast";

type Props = {};

const UserSettings = (props: Props) => {
  // const { toast } = useToast();

  // Access Zustand store
  const { name, username, profilePic, setName, setUsername, setProfilePic } =
    useUser();

  // Local state for form inputs
  const [tempName, setTempName] = useState(name);
  const [tempUsername, setTempUsername] = useState(username);
  const [tempProfilePic, setTempProfilePic] = useState(profilePic);

  useEffect(() => {
    setTempName(name);
    setTempUsername(username);
    setTempProfilePic(profilePic);
  }, [name, username, profilePic]);

  // Handle form submission
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Update Zustand store
    setName(tempName);
    setUsername(tempUsername);
    setProfilePic(tempProfilePic);

    // Save name, username, and profilePic to localStorage
    localStorage.setItem("name", tempName);
    localStorage.setItem("username", tempUsername);
    if (tempProfilePic) {
      localStorage.setItem("profilePic", tempProfilePic);
    }

    // toast({
    //   title: "Scheduled: Catch up",
    //   description: "Friday, February 10, 2023 at 5:57 PM",
    // });
  };

  // Handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempProfilePic(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"} size={"icon"} className="">
          <UserCog className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[725px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. (data is going to save in local
            storage for quick performance)
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                LinkedIn Username
              </Label>
              <Input
                id="username"
                value={tempUsername}
                onChange={(e) => setTempUsername(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="profilePic" className="text-right">
                Profile Picture
              </Label>
              <Input
                id="profilePic"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="col-span-3"
              />
            </div>
            <DialogDescription>
              Use low size image for lower size posts.
            </DialogDescription>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UserSettings;
