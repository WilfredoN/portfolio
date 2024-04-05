import { NavLink } from 'react-router-dom';

const CustomNavLink = ({
  to,
  onClick,
  children,
  isClicked,
}: {
  to: string;
  onClick: () => void;
  children: React.ReactNode;
  isClicked: boolean;
}) => (
  <NavLink
    className={`text-5xl mr-8 p-2 outline-4 hover:outline rounded-xl duration-75 ${
      isClicked
        ? 'unclickable pointer-events-none outline rounded-3xl duration-100'
        : ''
    }`}
    to={to}
    onClick={onClick}
  >
    {children}
  </NavLink>
);

export default CustomNavLink;
