export const TimelineLine = () => {
  return (
    <div className='pointer-events-none absolute top-4 bottom-4 left-8 w-1 sm:left-12'>
      <svg className='h-full w-full overflow-visible'>
        <line
          className='text-zinc-700/60'
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
