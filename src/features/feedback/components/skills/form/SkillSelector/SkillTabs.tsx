import clsx from 'clsx'

export interface SkillTabsProps {
  activeTab: 'programming' | 'technologies'
  setActiveTab: (tab: 'programming' | 'technologies') => void
}

export const SkillTabs = ({ activeTab, setActiveTab }: SkillTabsProps) => (
  <div className='mb-4 flex space-x-1 rounded-lg border border-[#99ccff] p-1'>
    <button
      className={clsx(
        'flex-1 rounded-md px-3 py-2 text-sm font-medium transition-all duration-200',
        activeTab === 'programming'
          ? 'border border-[#99ccff] bg-white text-[#0056b3] shadow-[0_1px_4px_0_rgba(0,86,179,0.06)]'
          : 'border-none bg-transparent text-[var(--color-text)] hover:bg-[var(--color-nav)] hover:text-[var(--color-accent)] focus-visible:bg-[var(--color-nav)] focus-visible:text-[var(--color-accent)]'
      )}
      type='button'
      onClick={() => setActiveTab('programming')}
    >
      Programming Languages
    </button>
    <button
      className={clsx(
        'flex-1 rounded-md px-3 py-2 text-sm font-medium transition-all duration-200',
        activeTab === 'technologies'
          ? 'border border-[#99ccff] bg-white text-[#0056b3] shadow-[0_1px_4px_0_rgba(0,86,179,0.06)]'
          : 'border-none bg-transparent text-[var(--color-text)] hover:bg-[var(--color-nav)] hover:text-[var(--color-accent)] focus-visible:bg-[var(--color-nav)] focus-visible:text-[var(--color-accent)]'
      )}
      type='button'
      onClick={() => setActiveTab('technologies')}
    >
      Technologies & Libraries
    </button>
  </div>
)

export default SkillTabs
