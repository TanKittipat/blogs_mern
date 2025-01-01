import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import PostServices from "../services/post.service";
import Editor from "../components/Editor";
import { useNavigate, useParams } from "react-router";
import { useAuthContext } from "../contexts/auth.context";

const EditPage = () => {
  const { id } = useParams();
  const { user: loggedInUser } = useAuthContext();
  useEffect(() => {
    if (!loggedInUser) {
      navigate("/login");
    }
  }, [loggedInUser]);
  const [post, setPost] = useState({
    title: "",
    summary: "",
    content: "",
    file: null,
  });

  useEffect(() => {
    if (loggedInUser) {
      const fetchData = async () => {
        try {
          const res = await PostServices.getPostById(id);
          if (res.status === 200) {
            if (loggedInUser.id !== res.data.author._id) {
              navigate("/");
            }
            const { title, summary, content } = res.data;
            setPost({
              title: title,
              summary: summary,
              content: content,
            });
            setContent(content);
          }
        } catch (error) {
          navigate("/");
        }
      };
      fetchData();
    }
  }, [id, loggedInUser]);

  const [content, setContent] = useState("");

  const navigate = useNavigate();

  const editorRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name == "file") {
      setPost((post) => ({ ...post, [name]: e.target.files[0] }));
    } else {
      setPost((post) => ({ ...post, [name]: value }));
    }
  };

  const handleContentChange = (value) => {
    setContent(value);
    setPost((post) => ({ ...post, content: content }));
  };

  const handleSubmit = async () => {
    try {
      const data = new FormData();
      data.set("title", post.title);
      data.set("summary", post.summary);
      data.set("content", post.content);
      data.set("file", post.file);
      const res = await PostServices.editPost(id, data);
      console.log(res);
      if (res.status === 200) {
        Swal.fire({
          title: "Edit post",
          text: res.data.message,
          showConfirmButton: false,
          icon: "success",
          position: "center",
        }).then(() => {
          setContent("");
          setPost({ title: "", summary: "", content: "", file: null });
          navigate(`/post/${id}`);
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Edit post",
        text: error?.response?.data?.message,
        showConfirmButton: false,
        icon: "error",
        position: "center",
      });
    }
  };

  return (
    <div className="flex items-center py-6 justify-center min-h-[87vh] bg-gradient-to-r from-rose-500 via-violet-500 to-sky-500">
      <div className="max-w-3xl w-full space-y-6 bg-white rounded-lg px-8 py-10 shadow-lg">
        <h1 className="text-center text-3xl text-gray-700 mb-8 font-bold">
          Edit Post
        </h1>

        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-2">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={post.title}
            onChange={handleChange}
            required
            className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Title of your post"
          />
        </div>

        {/* Summary */}
        <div>
          <label htmlFor="summary" className="block text-sm font-medium mb-2">
            Summary
          </label>
          <input
            type="text"
            name="summary"
            value={post.summary}
            onChange={handleChange}
            required
            className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Summary of your post"
          />
        </div>

        {/* Content (Editor) */}
        <div className="pt-1">
          <Editor
            value={content}
            onChange={handleContentChange}
            ref={editorRef}
          />
        </div>

        {/* File Input */}
        <div className="max-w-sm">
          <form>
            <label className="block">
              <span className="sr-only">Choose cover photo</span>
              <input
                type="file"
                name="file"
                onChange={handleChange}
                required
                className="block w-full text-sm text-gray-500 file:me-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
              />
            </label>
          </form>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 flex gap-2 justify-end">
          <button
            onClick={() => {
              setPost({ title: "", summary: "", content: "", file: null });
              setContent("");
              navigate(`/post/${id}`);
            }}
            type="button"
            className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            type="button"
            className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-teal-500 text-white hover:bg-teal-600 focus:outline-none focus:bg-teal-600"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPage;
