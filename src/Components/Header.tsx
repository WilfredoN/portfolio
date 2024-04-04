import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <nav className="flex flex-row">
      <Link className="text-5xl" to="/portfolio/about">
        About Me
      </Link>
      <Link className="text-5xl ml-6" to="/portfolio/projects">
        Projects
      </Link>
    </nav>
  );
};

export default Header;
