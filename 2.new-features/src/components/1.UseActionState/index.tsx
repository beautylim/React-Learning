
import { useActionState } from "react"
import { useFormStatus } from "react-dom";

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms)); // Promise 处理异步操作的对象
}

const SubmitButton = () => {
  const { pending, data, method } = useFormStatus()
  console.log("SubmitButton, data: ", data)
  console.log("SubmitButton, method: ", method)
  return (
    <button type="submit">{pending ? "Submitting..." : "Submit"}</button>
  )
}

export const FormAction = () => {
  const handleAction = async (previousState: any, formData: FormData) => { // previousState存上一次返回的结果，用于比如分页等功能, formData 表单提交的数据
    console.log(...formData.keys())
    console.log(...formData.values())
    await delay(1000)
    return { result: "success" }
  }

  const [state, submitAction, isPending] = useActionState(handleAction, null)

  console.log('~ FormAction ~ state: ', state)
  console.log('~ FormAction ~ isPending: ', isPending)
  return (
    <form action={submitAction}>
      <label>
        UserName:
        <input type="text" name="username"></input>
      </label>
      <label>
        Password:
        <input type="password" name="password"></input>
      </label>
      {/* 深层状态，用context 而不是props */}
      <SubmitButton></SubmitButton>
    </form>
  )
}