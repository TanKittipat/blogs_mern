import { format } from "date-fns";

const Post = ({ _id, title, summary, cover, author, createdAt }) => {
  const baseUrl = import.meta.env.VITE_BASE_PHOTO;
  return (
    <div class="bg-white border rounded-xl shadow-sm sm:flex">
      <div class="shrink-0 relative w-full rounded-t-xl overflow-hidden pt-[40%] sm:rounded-s-xl sm:max-w-60 md:rounded-se-none md:max-w-xs">
        <a href={`/post/${_id}`}>
          <img
            class="size-full absolute top-0 start-0 object-cover"
            src={`${baseUrl}/${cover}`}
            alt={title}
          />
        </a>
      </div>
      <div class="flex flex-wrap">
        <div class="p-4 flex flex-col h-full sm:p-7">
          <a href={`/post/${_id}`} class="text-lg font-bold text-gray-800">
            {title}
          </a>
          <p class="mt-1 text-gray-500">{summary}</p>
          <div class="mt-5 sm:mt-auto">
            <p class="text-xs text-gray-500">
              {author.username} : {format(createdAt, "dd MMMM yyyy HH:mm")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
