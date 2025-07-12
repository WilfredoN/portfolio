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
    className={`mb-4 rounded-full p-4 text-5xl outline-4 duration-75 hover:outline md:mb-0 md:mr-8 ${
      isClicked
        ? 'unclickable pointer-events-none rounded-3xl outline duration-100'
        : ''
    }`}
    style={{ fontSize: '2.5rem' }}
    onClick={onClick}
  >
    {children}
  </button>
)
