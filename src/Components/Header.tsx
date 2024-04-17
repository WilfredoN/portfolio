import { useContext, useEffect, useState } from 'react';
import CustomNavLink from './CustomNavLink';
import { motion } from 'framer-motion';
import ThemeToggle from './Toggle/ThemeToggle';
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

  const totalScrollHeight =
    document.documentElement.scrollHeight - window.innerHeight;
  const scaleFactor =
    Math.max(0.85, 1 - scrollPosition / totalScrollHeight / 2) || 0.85;
  const handlePageChange = (page: 'about' | 'projects') => {
    onPageChange(page);
    setScrollPosition(0);
  };

  return (
    <motion.header
      className={`${theme} flex flex-col h-fit items-center mb-8 rounded-full ${
        scrollPosition > 0
          ? 'sticky top-5 z-10 px-8 py-4 transition-all duration-300 '
          : 'mt-5 px-12 py-6 transition-all duration-175 '
      }`}
      style={{
        transform: `scale(${scaleFactor})`,
      }}
      whileHover={{ transform: `scale(${scaleFactor * 1.1})` }}
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
