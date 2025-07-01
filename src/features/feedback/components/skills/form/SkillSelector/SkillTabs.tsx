import clsx from 'clsx'

export interface SkillTabsProps {
  activeTab: 'programming' | 'technologies'
  setActiveTab: (tab: 'programming' | 'technologies') => void
}

export const SkillTabs = ({ activeTab, setActiveTab }: SkillTabsProps) => (
  <div className='flex space-x-1 rounded-lg border border-[#99ccff] p-1 mb-4'>
    <button
      className={clsx(
        'rounded-md py-2 px-3 text-sm font-medium transition-all duration-200',
        activeTab === 'programming' ? 'tab-active' : 'tab-inactive',
        'flex-1'
      )}
      type='button'
      onClick={() => setActiveTab('programming')}
    >
      Programming Languages
    </button>
    <button
      className={clsx(
        'rounded-md py-2 px-3 text-sm font-medium transition-all duration-200',
        activeTab === 'technologies' ? 'tab-active' : 'tab-inactive',
        'flex-1'
      )}
      type='button'
      onClick={() => setActiveTab('technologies')}
    >
      Technologies & Libraries
    </button>
  </div>
)

export default SkillTabs
