interface MediaLinkProps {
  href: string
  icon: React.ReactNode
}

export const Link = ({ href, icon }: MediaLinkProps) => {
  return (
    <a
      className='rounded-xl p-2 transition-colors duration-150 ease-in-out hover:bg-neutral-600 hover:text-white'
      href={href}
      rel='noopener noreferrer'
      target='_blank'
    >
      {icon}
    </a>
  )
}
