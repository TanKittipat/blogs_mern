import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import PostServices from "../services/post.service";
import Swal from "sweetalert2";
import { format } from "date-fns";
import { useAuthContext } from "../contexts/auth.context";

const PostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthContext();

  const [post, setPost] = useState(null);

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Delete post",
      text: "Do you want to delete this post?",
      icon: "question",
      showCancelButton: true,
      cancelButtonText: "No",
      confirmButtonText: "Yes",
      confirmButtonColor: "#ff0054",
      cancelButtonColor: "#8d99ae",
    }).then((result) => {
      if (result.isConfirmed) {
        PostServices.deletePost(id);
        Swal.fire({
          title: "Delete post",
          text: "Delete post successfully!",
          icon: "success",
        }).then(() => {
          navigate("/");
        });
      }
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await PostServices.getPostById(id);
        if (res.status === 200) {
          setPost(res.data);
        }
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: error?.response?.data?.message || "Fetching post failed!",
          icon: "error",
          showConfirmButton: false,
          position: "center",
        }).then(() => {
          navigate("/");
        });
      }
    };

    fetchData();
  }, [id, navigate]);

  useEffect(() => {
    console.log(post);
  }, [post]);

  if (!post) {
    return (
      <div className="text-center mt-8">
        <p>No post found.</p>
      </div>
    );
  }
  return (
    <div className="min-h-[87vh] flex items-center py-6 overflow-y-auto justify-center bg-gradient-to-r from-rose-500 via-violet-500 to-sky-500">
      <div className="max-w-4xl  items-center justify-center mx-auto bg-white shadow-md rounded-lg p-6 mt-8 w-5/6">
        <div className="mb-4 text-center">
          <h1 className="text-3xl font-bold mb-4 text-gray-800">
            {post.title}
          </h1>
          <div className="text-grey-600 mb-4">
            <p className="block mb-2">
              {format(post.createdAt, "dd MMMM yyyy HH:mm")}
            </p>
            <div className="mb-2">
              <span className="font-semibold">
                By <a className="text-sky-600">@{post.author.username}</a>
              </span>
            </div>
            {user && user.id === post.author._id && (
              <div className="space-x-2">
                <a
                  href={`/edit/${post._id}`}
                  class="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-yellow-500 text-yellow-500 hover:border-yellow-400 focus:outline-none focus:border-yellow-400 focus:text-yellow-400 disabled:opacity-50 disabled:pointer-events-none"
                >
                  Edit
                </a>
                <button
                  onClick={() => handleDelete(post._id)}
                  class="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent text-red-500 hover:bg-red-100 focus:outline-none focus:bg-red-100 hover:text-red-800 disabled:opacity-50 disabled:pointer-events-none dark:hover:bg-red-800/30 dark:hover:text-red-400 dark:focus:bg-red-800/30 dark:focus:text-red-400"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
          <div
            className="text-gray-700"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </div>
    </div>
  );
};

export default PostPage;
