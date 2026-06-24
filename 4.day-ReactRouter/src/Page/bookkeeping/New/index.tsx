import { Button, DatePicker, Input, NavBar, type InputRef } from 'antd-mobile'
import Icon from '../../../components/Icon'
import './index.scss'
import classNames from 'classnames'
import { billListData } from '../../../constants/index'
import { useNavigate } from 'react-router-dom'
import { useRef, useState } from 'react'
import { postBillList, type Bill } from '../../../store/modules/billStore'
import { useAppDispatch } from '../../../store/hook'
import dayjs from "dayjs"
import { set } from 'lodash'

export const New = () => {
  const navigate = useNavigate()
  type BillType = "pay" | "income";
  const [billType, setBillType] = useState<BillType>("pay")
  const [datePickVisible, setDatePickVisible] = useState(false)
  const [usedFor, setUsedFor] = useState("")
  const [money, setMoney] = useState("0")
  const [billDate, setBillDate] = useState("")
  const moneyChange = (value: string) => {
    setMoney(value)
  }
  const inputRef = useRef<InputRef>(null)
  const dispatch = useAppDispatch()
  const saveMoney = () => {
    const data: Bill = {
      id: Date.now().toString(),  // 或使用 uuid
      type: billType,
      useFor: usedFor,
      date: billDate.length > 0 ? billDate : dayjs(new Date()).format("YYYY-MM-DD HH:MM:ss"),
      money: billType === "pay" ? -Number(money) : Number(money)
    }
    dispatch(postBillList(data))
    if (inputRef.current) {
      inputRef.current
      inputRef.current.focus()
    }
    setUsedFor("")
    setMoney("0")
    setBillDate("")

  }

  const isToday = () => {
    return billDate.length == 0 || dayjs(billDate).format("YYYY-MM-DD") === dayjs(new Date()).format("YYYY-MM-DD")
  }

  const getDay = () => {
    return dayjs(billDate.length > 0 ? billDate : new Date()).format("YYYY-MM-DD")
  }
  const onConfirm = (date: Date) => {
    const selectedDate = dayjs(date).format("YYYY-MM-DD HH:MM:ss")
    setBillDate(selectedDate)
    setDatePickVisible(false)
  }
  return (
    <div className="keepAccounts">
      <NavBar className="nav" onBack={() => navigate(-1)}>
        记一笔
      </NavBar>

      <div className="newHeader">
        <div className="kaType">
          <Button
            shape="rounded"
            className={classNames(billType === "pay" && 'selected')}
            onClick={() => setBillType("pay")}
          >
            支出
          </Button>
          <Button
            className={classNames(billType === "income" && 'selected')}
            shape="rounded"
            onClick={() => setBillType("income")}

          >
            收入
          </Button>
        </div>
      </div>

      <div className="kaForm">
        <div className="date" onClick={() => { setDatePickVisible(true) }}>
          <span className="text">📅{isToday() && `今天`} | {getDay()} </span>
          <DatePicker
            visible={datePickVisible}
            className="kaDate"
            title="记账日期"
            max={new Date()}
            onCancel={() => { setDatePickVisible(false) }}
            onConfirm={onConfirm}
          />
        </div>

        <div className="kaInput">
          <Input
            className="input"
            placeholder="0.00"
            type="number"
            value={money}
            ref={inputRef}
            onChange={moneyChange}
          />
          <span className="iconYuan">￥</span>
        </div>
      </div>

      <div className="kaTypeList">
        {billListData[billType].map(item => {
          return (
            <div className="kaType" key={item.type}>
              <div className="title">{item.name}</div>
              <div className="list">
                {item.list.map(subItem => {
                  return (
                    <div
                      className={classNames('item', usedFor === subItem.type && "selected")}
                      key={subItem.type}
                      onClick={() => setUsedFor(subItem.type)}
                    >
                      <div className="icon">
                        <Icon type={subItem.type} />
                      </div>
                      <div className="text">{subItem.name}</div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      <div className="saveBtn">
        <Button
          block
          color="primary"
          shape="rounded"
          onClick={saveMoney}
        >
          保存
        </Button>
      </div>
    </div>
  )
}

export default New