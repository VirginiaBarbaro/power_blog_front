import { AuthorInfo } from "../types/user";

function InfoUserAuthor({ authorInfo }: AuthorInfo) {
  return (
    <div className="border ">
      <figure className="flex flex-col items-center justify-center p-8 text-center bg-white border-b border-gray-200 rounded-t-lg md:rounded-t-none md:rounded-tl-lg md:border-r dark:bg-gray-800 dark:border-gray-700">
        <figcaption className="flex justify-center space-x-3">
          <img
            className="rounded-full w-20 h-20"
            src={`${import.meta.env.VITE_APP_API_URL}/${authorInfo.avatar}`}
            alt="profile picture"
          />
          <div className="font-medium dark:text-white text-left">
            <div>
              {authorInfo.firstname} {authorInfo.lastname}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {authorInfo.username}
            </div>
            <p className="mt-4">{authorInfo.bio}</p>
          </div>
        </figcaption>
      </figure>
    </div>
  );
}

export default InfoUserAuthor;
