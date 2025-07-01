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
    className={`text-5xl md:mr-8 mb-4 md:mb-0 p-4 outline-4 hover:outline rounded-full duration-75 ${
      isClicked
        ? 'unclickable pointer-events-none outline rounded-3xl duration-100'
        : ''
    }`}
    style={{ fontSize: '2.5rem' }}
    onClick={onClick}
  >
    {children}
  </button>
)
