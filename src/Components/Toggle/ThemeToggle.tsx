import { useContext } from 'react';
import { ThemeContext } from '../ThemeContext';
import './toggle.css';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="theme-switch-wrapper flex justify-center items-center">
      <label className="theme-switch" htmlFor="checkbox">
        <input
          type="checkbox"
          id="checkbox"
          onChange={toggleTheme}
          checked={theme === 'dark' ? true : false}
        />
        <div className="slider round"></div>
      </label>
    </div>
  );
};

export default ThemeToggle;
