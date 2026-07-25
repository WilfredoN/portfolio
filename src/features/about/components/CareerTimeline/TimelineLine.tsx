export const TimelineLine = () => {
  return (
    <div
      className='pointer-events-none absolute top-4 bottom-4 left-8 w-1 sm:left-9'
      style={{
        maskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)',
        WebkitMaskImage:
          'linear-gradient(to bottom, black 85%, transparent 100%)'
      }}
    >
      <svg className='h-full w-full overflow-visible'>
        <line
          className='text-zinc-400/80 dark:text-zinc-600/80'
          stroke='currentColor'
          strokeDasharray='4 4'
          strokeWidth='2'
          x1='50%'
          x2='50%'
          y1='0%'
          y2='100%'
        />
      </svg>
    </div>
  )
}
