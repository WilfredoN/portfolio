import { lazy, Suspense } from 'react'
const ReactSwitch = lazy(() => import('react-switch'))

interface ThemeToggleProps {
  isDarkTheme: boolean
  toggleTheme: () => void
}

export const ThemeToggle = ({ toggleTheme, isDarkTheme }: ThemeToggleProps) => {
  return (
    <div className='theme-switch-wrapper flex items-center justify-center'>
      <label className='theme-switch' htmlFor='checkbox'>
        <Suspense
          fallback={
            <input
              aria-label='toggle theme'
              checked={isDarkTheme}
              className='h-6 w-12 cursor-pointer'
              id='checkbox'
              type='checkbox'
              onChange={toggleTheme}
            />
          }
        >
          <ReactSwitch
            activeBoxShadow='none'
            boxShadow='none'
            checked={isDarkTheme}
            checkedHandleIcon={
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
            }
            checkedIcon={false}
            handleDiameter={26}
            height={64}
            id='checkbox'
            offColor='#99ccff'
            offHandleColor='#00_'
            uncheckedHandleIcon={
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
            }
            uncheckedIcon={false}
            width={128}
            onChange={toggleTheme}
            onColor='#2196f3'
            onHandleColor='#00_'
          />
        </Suspense>
      </label>
    </div>
  )
}
