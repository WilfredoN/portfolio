import { motion } from 'framer-motion';
import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';

interface MotionImageProps {
  src: string;
  delay: number;
}

const MotionImage: React.FC<MotionImageProps> = ({ src, delay }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <motion.img
        className="mt-8 rounded-3xl"
        initial={{ x: '-100vw', opacity: 0 }}
        animate={{ x: '0vw', opacity: 1 }}
        transition={{ delay: delay, type: 'spring', mass: 0.2, duration: 1 }}
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
            <img className="z-10 modal-content w-3/4 rounded-3xl" src={src} />
          </Transition.Child>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default MotionImage;
