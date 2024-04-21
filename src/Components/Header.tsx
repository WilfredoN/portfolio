import { useContext, useEffect, useState } from 'react';
import CustomNavLink from './CustomNavLink';
import { motion } from 'framer-motion';
import ThemeToggle from './Input/ThemeToggle';
import { ThemeContext } from './ThemeContext';

const Header = ({
  currentPage,
  onPageChange,
}: {
  currentPage: 'about' | 'projects';
  onPageChange: (page: 'about' | 'projects') => void;
}) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const { theme } = useContext(ThemeContext);
  const checkScrollTop = () => {
    setScrollPosition(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', checkScrollTop);
    return () => window.removeEventListener('scroll', checkScrollTop);
  }, []);

  const isMobile = window.innerWidth <= 640;

  const totalScrollHeight = isMobile
    ? 0
    : document.documentElement.scrollHeight - window.innerHeight;
  const scaleFactor = isMobile
    ? 1
    : Math.max(0.85, 1 - scrollPosition / totalScrollHeight / 2) || 0.85;
  const handlePageChange = (page: 'about' | 'projects') => {
    onPageChange(page);
    if (!isMobile) {
      setScrollPosition(0);
    }
  };

  return (
    <motion.header
      className={`${theme} flex flex-col h-fit w-full md:w-fit items-center mb-8 rounded-3xl md:rounded-full ${
        !isMobile && scrollPosition > 0
          ? 'sticky top-5 z-10 px-8 py-4 transition-all duration-300 '
          : 'mt-5 px-12 py-6 transition-all duration-175 '
      }`}
      style={{
        transform: isMobile ? 'none' : `scale(${scaleFactor})`,
      }}
      whileHover={isMobile ? {} : { transform: `scale(${scaleFactor * 1.1})` }}
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
        <ThemeToggle />
      </nav>
    </motion.header>
  );
};

export default Header;
