interface TextProps {
  children: React.ReactNode
  className?: string
}

export const Text = ({ children, ...props }: TextProps) => {
  return <p {...props}>{children}</p>
}
