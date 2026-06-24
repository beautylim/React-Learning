import { useState, useEffect } from "react"
import axios from 'axios'
export const useComments = () => {
  const [comments, setComments] = useState([])

  useEffect(() => {
    async function getList() {
      // axios请求数据
      console.log("use effect")
      const res = await axios.get('http://localhost:3004/list')
      setComments(res.data)
    }
    getList()
  }, [])
  return { comments, setComments }
}