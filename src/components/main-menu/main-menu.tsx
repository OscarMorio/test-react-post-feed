import Link from "next/link";

const MainMenu = () => {
  return (
    <ul className="main-menu">
      <li>
        <Link href="/">Home</Link>
      </li>
      <li>
        <Link href="/posts">Posts</Link>
      </li>
    </ul>
  );
};

export default MainMenu;
