import Toggle from './Toggle'
import { cx } from 'class-variance-authority'

export interface IndiciesToggleProps {
  className?: string
  indices: Record<string, any>
  onToggle: (_key: string, _checked: boolean) => void
}

export default function IndiciesToggle({
  className = '',
  indices,
  onToggle,
}: IndiciesToggleProps) {
  return (
    <div
      className={cx(
        className,
        'flex w-full max-w-80 grid-cols-2 flex-col justify-evenly gap-x-4 gap-y-2 lg:grid lg:p-4 lg:max-2xl:max-w-[800px] 2xl:grid-cols-1',
      )}
    >
      {Object.keys(indices).map(key => (
        <Toggle
          checked={indices[key].visible}
          icon={indices[key].icon}
          key={key}
          onChange={checked => onToggle(key, checked)}
          title={indices[key].title}
          type={key}
          variant={indices[key].variant}
        />
      ))}
    </div>
  )
}
