import { DatePicker, NavBar } from "antd-mobile"
import "./index.scss"
import { useEffect, useMemo, useState } from "react"
import classNames from "classnames"
import dayjs from "dayjs"
import { useAppSelector } from "../../../store/hook"
import _ from "lodash"
import type { Bill } from "../../../store/modules/billStore"
import { DailyBill } from "./components/DayBill"

export const Month = () => {
  const billList: Bill[] = useAppSelector(state => state.bill.billList)
  const monthGroup = useMemo(() => { //只有billList有变化的时候才会重新执行分组
    if (billList) {
      return _.groupBy(billList, (item) => dayjs(item.date).format("YYYY | MM"))
    } else {
      return null
    }
  }, [billList])
  const [dateVisible, setDateVisible] = useState(false)
  const [currentMonth, setCurrentMonth] = useState(() => dayjs(new Date()).format("YYYY | MM"))
  const [currentMonthList, setCurrentMonthList] = useState<Bill[]>([])
  useEffect(() => {
    if (monthGroup) {
      const monthList = monthGroup[dayjs().format("YYYY | MM")]
      if (monthList) {
        setCurrentMonthList(monthList)
      }
    }
  }, [monthGroup])

  const monthResult = useMemo(() => {
    // 统计支出 / 收入 / 结余
    if (currentMonthList) {
      const pay = currentMonthList.filter(item => item.type === "pay").reduce((a, c) => a + c.money, 0)
      const income = currentMonthList.filter(item => item.type === "income").reduce((a, c) => a + c.money, 0)
      return { pay, income, total: income + pay }
    } else {
      return { pay: 0, income: 0, total: 0 }
    }

  }, [currentMonthList])

  const dayGroup = useMemo(() => { //只有currentMonthList有变化的时候才会重新执行分组
    const groupData = _.groupBy(currentMonthList, (item) => dayjs(item.date).format("MM月DD日"))
    const keys = Object.keys(groupData)
    return { groupData, keys }
  }, [currentMonthList])

  const onConfirm = (date: Date) => {
    const selectedDate = dayjs(date).format("YYYY | MM")
    setCurrentMonth(selectedDate)
    setCurrentMonthList(monthGroup ? monthGroup[selectedDate] : [])
  }

  return (
    <div className="monthlyBill">
      <NavBar className="nav" back={null}>
        月度收支
      </NavBar>
      <div className="content">
        <div className="header">
          {/* 时间切换区域 */}
          <div className="date" onClick={() => setDateVisible(true)}>
            <span className="text">
              {currentMonth}月账单
            </span>
            <span className={classNames('arrow', dateVisible && 'expand')}></span>
          </div>
          {/* 统计区域 */}
          <div className="twoLineOverview">
            <div className="item">
              <span className="money">{monthResult.pay}</span>
              <span className="type">支出</span>
            </div>
            <div className="item">
              <span className="money">{monthResult.income}</span>
              <span className="type">收入</span>
            </div>
            <div className="item">
              <span className="money">{monthResult.total}</span>
              <span className="type">结余</span>
            </div>
          </div>
          {/* 时间选择器 */}
          <DatePicker
            className="kaDate"
            title="记账日期"
            precision="month"
            visible={dateVisible}
            max={new Date()}
            onCancel={() => setDateVisible(false)}
            onConfirm={onConfirm}
            onClose={() => setDateVisible(false)}

          />
        </div>
        {
          dayGroup.keys.map(key => {
            return <DailyBill key={key} date={key} billList={dayGroup.groupData[key]} />
          })
        }
      </div>

    </div >)
}