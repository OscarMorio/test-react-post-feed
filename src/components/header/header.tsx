import Link from "next/link";
import MainMenu from "../main-menu/main-menu";

const Header = () => {
  return (
    <header>
      <div className="flex-row">
        <Link href="/">
          <h1 className="logo">Front Test</h1>
        </Link>
        <div>
          <MainMenu />
        </div>
      </div>
    </header>
  );
};

export default Header;
