import { useContext } from 'react';
import { ThemeContext } from '../ThemeContext';

interface MediaLinkProps {
  href: string;
  icon: React.ReactNode;
}

const MediaLink = ({ href, icon }: MediaLinkProps) => {
  const { theme } = useContext(ThemeContext);
  return (
    <a
      href={href}
      className={`rounded-xl p-2 hover:bg-${
        theme === 'dark' ? 'gray' : 'neutral'
      }-600 transition-colors duration-300 ease-in-out`}
    >
      {icon}
    </a>
  );
};

export default MediaLink;
