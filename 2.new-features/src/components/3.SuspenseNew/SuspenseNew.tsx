import { Suspense, use } from "react"

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms)); // Promise 处理异步操作的对象
}

const fetchMessage = async () => { //模拟API 请求
  await delay(1000)
  return "Hello world"
}

interface MessageProps {
  messagePromise: Promise<string>
}

const Message = (props: MessageProps) => {

  const message = use(props.messagePromise) //数据异步use Hook

  return (
    <div>
      {message}
    </div>
  )
}

export const SuspenseNew = () => {
  const messagePromise = fetchMessage()
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>  
        <Message messagePromise={messagePromise} />
      </Suspense>
    </div>
  )
}