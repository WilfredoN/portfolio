import { Disclosure, Transition } from '@headlessui/react';
import { useContext } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import { ThemeContext } from '../ThemeContext';
import MotionImage from './ImageProjects';

const Gallery = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <Disclosure>
      {({ open }) => (
        <>
          <Disclosure.Button className="h-fit">
            {open ? (
              <div className="h-24 flex flex-col items-center justify-center ">
                <h1 className=" text-6xl underline">Gallery</h1>
              </div>
            ) : (
              <div className="h-24 flex flex-col items-center justify-center ">
                <h1 className=" text-6xl">Gallery</h1>
                <FaChevronDown className="text-4xl transition-transform animate-pulse" />
              </div>
            )}
          </Disclosure.Button>
          <Transition
            show={open}
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Disclosure.Panel static>
              <main
                className={`${theme} grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 place-items-center`}
              >
                <MotionImage src="https://i.ibb.co/vQmK2qX/chrome-zc-Fd-WLPGS8.png" />
                <MotionImage src="https://i.ibb.co/vs1LknZ/chrome-91-Mhvsv-SIU.png" />
                <MotionImage src="https://i.ibb.co/j5pYmQr/chrome-a-No0-Owk-J70.png" />
                <MotionImage src="https://i.ibb.co/WF0NCcS/chrome-3db-IAM3v4-H.png" />
                <MotionImage src="https://i.ibb.co/48PbSPp/chrome-jz-HSrz-E1-KB.png" />
              </main>
            </Disclosure.Panel>
          </Transition>
        </>
      )}
    </Disclosure>
  );
};

export default Gallery;
