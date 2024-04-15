import { useEffect, useState } from 'react';
import CustomNavLink from './CustomNavLink';

const Header = ({
  currentPage,
  onPageChange,
}: {
  currentPage: 'about' | 'projects';
  onPageChange: (page: 'about' | 'projects') => void;
}) => {
  const [scrollPosition, setScrollPosition] = useState(0);

  const checkScrollTop = () => {
    setScrollPosition(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', checkScrollTop);
    return () => window.removeEventListener('scroll', checkScrollTop);
  }, []);

  const totalScrollHeight =
    document.documentElement.scrollHeight - window.innerHeight;
  const scaleFactor = Math.max(
    0.85,
    1 - scrollPosition / totalScrollHeight / 2,
  );
  const handlePageChange = (page: 'about' | 'projects') => {
    onPageChange(page);
    setScrollPosition(0);
  };

  return (
    <header
      className={`flex flex-col items-center flex-grow mb-8 rounded-full
      ${
        scrollPosition > 0
          ? 'sticky top-0 z-10 px-8 py-4 hover:scale-125 transition-all duration-300 ease-in-out transform bg-gray-800'
          : 'px-12 py-6 transition-all duration-150 ease-in-out transform bg-gray-800'
      }`}
      style={{ transform: `scale(${scaleFactor})`, backgroundColor: '#242424' }}
    >
      <nav className="w-full flex md:flex-row flex-col justify-center">
        <CustomNavLink
          onClick={() => handlePageChange('about')}
          isClicked={currentPage === 'about'}
        >
          About Me
        </CustomNavLink>
        <CustomNavLink
          onClick={() => handlePageChange('projects')}
          isClicked={currentPage === 'projects'}
        >
          Projects
        </CustomNavLink>
      </nav>
    </header>
  );
};

export default Header;
