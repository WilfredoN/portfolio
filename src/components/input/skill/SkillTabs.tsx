import clsx from 'clsx'

export interface SkillTabsProps {
  activeTab: 'programming' | 'technologies'
  setActiveTab: (tab: 'programming' | 'technologies') => void
}

export const SkillTabs = ({ activeTab, setActiveTab }: SkillTabsProps) => (
  <div className='flex space-x-1 rounded-lg bg-[var(--color-bg)] border border-[var(--color-border)] p-1 mb-4'>
    <button
      type='button'
      onClick={() => setActiveTab('programming')}
      className={clsx(
        'flex-1 rounded-md py-2 px-3 text-sm font-medium transition-all duration-200',
        activeTab === 'programming' ? 'tab-active' : 'tab-inactive'
      )}
    >
      Programming Languages
    </button>
    <button
      type='button'
      onClick={() => setActiveTab('technologies')}
      className={clsx(
        'flex-1 rounded-md py-2 px-3 text-sm font-medium transition-all duration-200',
        activeTab === 'technologies' ? 'tab-active' : 'tab-inactive'
      )}
    >
      Technologies & Libraries
    </button>
  </div>
)

export default SkillTabs
