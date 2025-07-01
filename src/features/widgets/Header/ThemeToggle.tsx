import Switch from 'react-switch'

interface ThemeToggleProps {
  isDarkTheme: boolean
  toggleTheme: () => void
}

export const ThemeToggle = ({ toggleTheme, isDarkTheme }: ThemeToggleProps) => {
  return (
    <div className="theme-switch-wrapper flex justify-center items-center">
      <label
        className="theme-switch"
        htmlFor="checkbox"
      >
        <Switch
          activeBoxShadow="none"
          boxShadow="none"
          checked={isDarkTheme}
          checkedHandleIcon={(
            <div
              style={{
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '2em',
                top: '-10px'
              }}
            >
              🌙
            </div>
          )}
          checkedIcon={false}
          handleDiameter={26}
          height={64}
          id="checkbox"
          offColor="#99ccff"
          offHandleColor="#00_"
          uncheckedHandleIcon={(
            <div
              style={{
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '2em',
                top: '-10px'
              }}
            >
              ☀️
            </div>
          )}
          uncheckedIcon={false}
          width={128}
          onChange={toggleTheme}
          onColor="#2196f3"
          onHandleColor="#00_"
        />
      </label>
    </div>
  )
}
