import { lazy, Suspense } from "react"

const Child = lazy(() => import("./Child"))

export const SuspenseDemo = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Child />
      </Suspense>

    </div>
  )
}