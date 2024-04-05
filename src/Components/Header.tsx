import { useEffect, useState } from 'react';
import CustomNavLink from './CustomNavLink';

const Header = () => {
  const [isClicked, setIsClicked] = useState({ about: false, projects: false });
  useEffect(() => {
    if (window.location.pathname === '/portfolio/about') {
      setIsClicked({ about: true, projects: false });
    }
    if (window.location.pathname === '/portfolio/projects') {
      setIsClicked({ about: false, projects: true });
    }
  }, []);

  const handleClick = (link: string) => {
    if (link === 'about') {
      setIsClicked({ about: true, projects: false });
    }
    if (link === 'projects') {
      setIsClicked({ about: false, projects: true });
    }
  };

  return (
    <nav className="flex flex-row mb-8 mt-4">
      <CustomNavLink
        to="/"
        onClick={() => handleClick('about')}
        isClicked={isClicked.about}
      >
        About Me
      </CustomNavLink>
      <CustomNavLink
        to="/projects"
        onClick={() => handleClick('projects')}
        isClicked={isClicked.projects}
      >
        Projects
      </CustomNavLink>
    </nav>
  );
};

export default Header;
