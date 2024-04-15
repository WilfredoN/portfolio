import { Dialog, Transition } from '@headlessui/react';
import { motion } from 'framer-motion';
import { Fragment, useState } from 'react';

interface MotionImageProps {
  src: string;
  delay?: number;
}

const MotionImage: React.FC<MotionImageProps> = ({ src, delay }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <motion.img
        className="mb-6 rounded-3xl cursor-pointer w-11/12"
        initial={{ transform: 'scale(0)', opacity: 0 }}
        animate={{ transform: 'scale(1)', opacity: 1 }}
        whileHover={{ transform: 'scale(1.05)' }}
        transition={{
          delay: delay,
          type: 'spring',
          mass: 0.2,
          duration: 0.2,
          stiffness: 200,
          damping: 10,
        }}
        src={src}
        style={{ outline: '#26627d 4px solid' }}
        onClick={() => setIsOpen(true)}
      />
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog
          open={isOpen}
          onClose={() => setIsOpen(false)}
          className="fixed inset-0 z-10 overflow-y-auto flex justify-center items-center"
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="z-0 fixed inset-0 bg-black opacity-30" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <img className="z-10 modal-content rounded-3xl w-2/3" src={src} />
          </Transition.Child>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default MotionImage;
