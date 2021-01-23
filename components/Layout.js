import Link from "next/link";
import { useContext } from "react";
import UserContext from "~/lib/UserContext";
import { addChannel } from "~/lib/Store";

export default function Layout(props) {
  const { signOut } = useContext(UserContext);

  const slugify = (text) => {
    return text
      .toString()
      .toLowerCase()
      .replace(/\s+/g, "-") // Replace spaces with -
      .replace(/[^\w-]+/g, "") // Remove all non-word chars
      .replace(/--+/g, "-") // Replace multiple - with single -
      .replace(/^-+/, "") // Trim - from start of text
      .replace(/-+$/, ""); // Trim - from end of text
  };

  const newChannel = async () => {
    const slug = prompt("Please enter your name");
    if (slug) {
      addChannel(slugify(slug));
    }
  };

  return (
    <main className="main flex h-screen w-screen overflow-hidden">
      {/* Sidebar */}
      <nav
        className="w-64 bg-gray-900 text-gray-100 overflow-scroll "
        style={{ maxWidth: "20%", minWidth: 150, maxHeight: "100vh" }}
      >
        <div className="p-2 ">
          <div className="p-2">
            <button
              className="bg-blue-900 hover:bg-blue-800 text-white py-2 px-4 rounded w-full transition duration-150"
              onClick={() => newChannel()}
            >
              New Channel
            </button>
          </div>
          <hr className="m-2" />
          <div className="p-2">
            <button
              className="bg-blue-900 hover:bg-blue-800 text-white py-2 px-4 rounded w-full transition duration-150"
              onClick={() => signOut()}
            >
              Log out
            </button>
          </div>
          <hr className="m-2" />
          <h4 className="font-bold">Channels</h4>
          <ul className="channel-list">
            {props.channels.map((x) => (
              <SidebarItem
                channel={x}
                key={x.id}
                isActiveChannel={x.id === props.activeChannelId}
              />
            ))}
          </ul>
        </div>
        <div className="absolute flex items-center border-b border-t border-teal-500 py-2 px-4 bottom-0 w-64">
            <button
            class="flex items-center flex-shrink-0 border-transparent border-4 text-teal-500 text-sm py-1 px-2 rounded"
            type="button"
            onClick={() => newChannel()}
          >
            <svg
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="15"
      fill="none"
      viewBox="0 0 15 15"
      className="mr-1"
    >
      <path
        fill="#38B2AC"
        fillRule="evenodd"
        d="M7.5 13.5a6 6 0 100-12 6 6 0 000 12zm.75-8.25a.75.75 0 00-1.5 0v1.5h-1.5a.75.75 0 000 1.5h1.5v1.5a.75.75 0 101.5 0v-1.5h1.5a.75.75 0 100-1.5h-1.5v-1.5z"
        clipRule="evenodd"
      ></path>
    </svg>
            New channel
          </button>
          <button
            class="flex items-center flex-shrink-0 border-transparent border-4 text-teal-500 text-sm py-1 px-2 rounded"
            type="button"
            onClick={() => signOut()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              fill="none"
              viewBox="0 0 15 15"
              className="mr-1"
            >
              <path
                fill="#38b2ac"
                d="M2.25 2.25A.75.75 0 001.5 3v9A.75.75 0 103 12V3a.75.75 0 00-.75-.75zm7.72 6.97a.75.75 0 001.06 1.06l2.25-2.25a.75.75 0 000-1.06l-2.25-2.25a.749.749 0 10-1.06 1.06l.97.97H5.25a.75.75 0 000 1.5h5.69l-.97.97z"
              ></path>
            </svg>
            Logout
          </button>
        </div>
      </nav>

      {/* Messages */}
      <div className="flex-1 bg-gray-800 h-screen">{props.children}</div>
    </main>
  );
}

const SidebarItem = ({ channel, isActiveChannel }) => (
  <>
    <li>
      <Link href="/channels/[id]" as={`/channels/${channel.id}`}>
        <a className={isActiveChannel ? "font-bold" : ""}>{channel.slug}</a>
      </Link>
    </li>
  </>
);
