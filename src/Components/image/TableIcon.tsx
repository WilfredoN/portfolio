// Icon.tsx
import React from 'react';

interface IconProps {
  iconName: string;
  alt?: string;
}

const Icon: React.FC<IconProps> = ({ iconName, alt }) => {
  const src = `https://raw.githubusercontent.com/devicons/devicon/6910f0503efdd315c8f9b858234310c06e04d9c0/icons/${iconName}/${iconName}-original.svg`;
  return <img className="ml-2 w-8" src={src} alt={alt} />;
};

export default Icon;
