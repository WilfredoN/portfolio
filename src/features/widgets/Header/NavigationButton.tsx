import clsx from 'clsx'

interface NavigationLinkProps {
  children: React.ReactNode
  isClicked: boolean
  onClick: () => void
}

export const NavigationButton = ({
  onClick,
  children,
  isClicked
}: NavigationLinkProps) => (
  <button
    className={clsx(
      'mb-4 cursor-pointer rounded-full p-4 text-5xl duration-75 hover:outline-4 md:mr-8 md:mb-0',
      isClicked
        ? 'unclickable pointer-events-none rounded-3xl outline duration-100'
        : ''
    )}
    style={{ fontSize: '2.5rem' }}
    onClick={onClick}
  >
    {children}
  </button>
)
