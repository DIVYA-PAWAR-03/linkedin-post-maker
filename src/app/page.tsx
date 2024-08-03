import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="">
      <Header />
      <div className="flex justify-center items-center mt-10 gap-5">
        <Link href={"/explore"}>
          <Button variant="outline">Explore Posts</Button>
        </Link>
        <Link href={"/post-editor"}>
          <Button>Create New Post</Button>
        </Link>
      </div>
    </main>
  );
}
