import { useContext } from 'react';
import Switch from 'react-switch';
import { ThemeContext } from '../ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="theme-switch-wrapper flex justify-center items-center">
      <label className="theme-switch" htmlFor="checkbox">
        <Switch
          onChange={toggleTheme}
          checked={theme === 'dark'}
          id="checkbox"
          offColor="#99ccff"
          onColor="#2196f3"
          offHandleColor="#99ccff"
          onHandleColor="#2196f3"
          uncheckedIcon={false}
          uncheckedHandleIcon={
            <div
              style={{
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '2em',
                top: '-10px',
              }}
            >
              ☀️
            </div>
          }
          checkedIcon={false}
          checkedHandleIcon={
            <div
              style={{
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '2em',
                top: '-10px',
              }}
            >
              🌙
            </div>
          }
          height={64}
          width={128}
          handleDiameter={26}
        />
      </label>
    </div>
  );
};

export default ThemeToggle;
