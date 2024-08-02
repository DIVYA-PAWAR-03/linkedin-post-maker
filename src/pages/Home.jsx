import { Link } from "react-router-dom";
import { Button } from "../Components/ui/button";
import Header from "../Components/Header";

const Home = () => {
  return (
    <div className="bg-black min-h-screen text-white">
      <Header />
      <div className="flex items-center mt-5 justify-center gap-4">
        <Link to={"/post-editor"}>
          <Button variant="outline">Explore Posts</Button>
        </Link>
        <Link to={"/post-editor"}>
          <Button>Create new post</Button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
