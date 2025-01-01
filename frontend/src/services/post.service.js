import api from "./api";
const postUrl = import.meta.env.VITE_BASE_URL + "/posts";

const getAllPosts = async () => {
  return await api.get(postUrl);
};

const getPostById = async (id) => {
  return await api.get(postUrl + `/${id}`);
};

const createPost = async (post) => {
  return await api.post(postUrl, post, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

const editPost = async (id, post) => {
  return await api.put(postUrl + `/${id}`, post, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

const deletePost = async (id) => {
  return await api.delete(postUrl + `/${id}`);
};

const PostServices = {
  getAllPosts,
  getPostById,
  createPost,
  editPost,
  deletePost,
};

export default PostServices;
