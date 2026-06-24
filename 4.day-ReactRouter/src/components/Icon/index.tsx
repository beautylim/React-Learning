
interface Props {
  type: string
}

const Icon = (props: Props) => {
  const { type } = props
  return (
    <span
      style={{
        width: 28,
        height: 28
      }}
    >
      {type === 'food' && '🍜'}
      {type === 'drinks' && '🥤'}
      {type === 'salary' && '💰'}
      {type === 'cloth' && '🛍️'}
      {type === 'travel' && '🏞️'}
      {type === 'learn' && '📖'}
      {type === 'house rent' && '🏠'}
      {type === 'house debt' && '🏡'}
      {type === 'bonus' && '🧧'}
      {type === 'forward from others' && '🪙'}
      {type === 'forward to others' && '💸'}
      {type === 'calendar' && '📅'}

    </span>
  )
}

export default Icon