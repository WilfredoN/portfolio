import CustomNavLink from './CustomNavLink';

const Header = ({
  currentPage,
  onPageChange,
}: {
  currentPage: 'about' | 'projects';
  onPageChange: (page: 'about' | 'projects') => void;
}) => {
  return (
    <nav className="flex flex-row mb-8 mt-4">
      <CustomNavLink
        onClick={() => onPageChange('about')}
        isClicked={currentPage === 'about'}
      >
        About Me
      </CustomNavLink>
      <CustomNavLink
        onClick={() => onPageChange('projects')}
        isClicked={currentPage === 'projects'}
      >
        Projects
      </CustomNavLink>
    </nav>
  );
};

export default Header;
