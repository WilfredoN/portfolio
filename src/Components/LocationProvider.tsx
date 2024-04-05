import { AnimatePresence } from 'framer-motion';

const LocationProvider = ({ children }: { children: React.ReactNode }) => {
  return <AnimatePresence>{children}</AnimatePresence>;
};

export default LocationProvider;
