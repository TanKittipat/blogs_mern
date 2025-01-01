import { useEffect, useState } from "react";
import PostServices from "../services/post.service";
import Swal from "sweetalert2";
import Post from "../components/Post";

const Home = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await PostServices.getAllPosts();
        if (res.status === 200) {
          setPosts(res.data);
        }
      } catch (error) {
        Swal.fire({
          title: "Fetching posts",
          text: error?.response?.data?.message || "Fetching posts failed!",
          icon: "error",
          showConfirmButton: false,
          position: "center",
        });
      }
    };
    fetchData();
    console.log(posts);
  }, []);
  return (
    <div className="min-h-[87vh] flex items-center py-6 overflow-y-auto justify-center bg-gradient-to-r from-rose-500 via-violet-500 to-sky-500">
      <div className="w-full max-w-3xl space-y-4 px-4 py-8">
        {posts.length > 0 &&
          posts.map((post, index) => {
            return <Post key={index} {...post} />;
          })}
      </div>
    </div>
  );
};

export default Home;
