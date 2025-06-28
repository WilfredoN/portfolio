interface CustomNavLinkProps {
  onClick: () => void
  children: React.ReactNode
  isClicked: boolean
}

export const CustomNavLink = ({
  onClick,
  children,
  isClicked
}: CustomNavLinkProps) => (
  <button
    className={`text-5xl md:mr-8 mb-4 md:mb-0 p-4 outline-4 hover:outline rounded-full duration-75 ${
      isClicked
        ? 'unclickable pointer-events-none outline rounded-3xl duration-100'
        : ''
    }`}
    onClick={onClick}
    style={{ fontSize: '2.5rem' }}
  >
    {children}
  </button>
)
