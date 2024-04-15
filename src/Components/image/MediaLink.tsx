interface MediaLinkProps {
  href: string;
  icon: React.ReactNode;
}

const MediaLink = ({ href, icon }: MediaLinkProps) => {
  return (
    <a
      href={href}
      className="rounded-xl p-2 hover:bg-gray-600 transition-colors duration-300 ease-in-out"
    >
      {icon}
    </a>
  );
};

export default MediaLink;
