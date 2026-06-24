import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { decrement, increment, addToNum } from "../../store/modules/counterStore"
import { useEffect } from "react"
import { fetchChannelList } from "../../store/modules/channelStore"

export const Redux = () => {
  const { count } = useAppSelector(state => state.counter)
  const { channelList } = useAppSelector(state => state.channel)
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchChannelList())
  }, [dispatch])
  return (
    <div>
      <button onClick={() => dispatch(decrement())}>-</button>
      {count}
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(addToNum(10))}>add to 10</button>
      <button onClick={() => dispatch(addToNum(20))}>add to 20</button>
      <ul>
        {channelList.map(item => <li key={item}> {item}</li>)}
      </ul>
    </div>
  )

}