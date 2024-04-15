const CustomNavLink = ({
  onClick,
  children,
  isClicked,
}: {
  onClick: () => void;
  children: React.ReactNode;
  isClicked: boolean;
}) => (
  <button
    className={`text-5xl md:mr-8 p-4 outline-4 hover:outline rounded-full duration-75 ${
      isClicked
        ? 'unclickable pointer-events-none outline rounded-3xl duration-100'
        : ''
    }`}
    onClick={onClick}
    style={{ fontSize: '2.5rem' }}
  >
    {children}
  </button>
);

export default CustomNavLink;
