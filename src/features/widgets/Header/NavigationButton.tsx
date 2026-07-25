import clsx from 'clsx'

interface NavigationLinkProps {
  children: React.ReactNode
  isClicked: boolean
  isProcessing?: boolean
  onClick: () => void
}

export const NavigationButton = ({
  onClick,
  children,
  isClicked,
  isProcessing = false
}: NavigationLinkProps) => (
  <button
    className={clsx(
      'mb-4 rounded-full p-4 text-5xl duration-75 md:mr-8 md:mb-0',
      isProcessing
        ? 'pointer-events-none cursor-default'
        : 'cursor-pointer hover:outline-4',
      isClicked &&
        'unclickable pointer-events-none rounded-3xl outline duration-100'
    )}
    disabled={isProcessing}
    style={{ fontSize: '2.5rem' }}
    onClick={isProcessing ? undefined : onClick}
  >
    {children}
  </button>
)
