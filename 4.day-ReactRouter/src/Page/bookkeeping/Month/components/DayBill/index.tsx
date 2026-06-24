
import classNames from 'classnames'
import './index.scss'
import type { Bill } from '../../../../../store/modules/billStore'
import { useMemo, useState } from 'react'
import _ from "lodash"
import Icon from '../../../../../components/Icon'

interface Props {
  date: string,
  billList: Bill[]
}


export const DailyBill = (props: Props) => {
  const { date, billList } = props

  const dayResult = useMemo(() => {
    // 统计每天支出 / 收入 / 结余
    const pay = billList.filter(item => item.type === "pay").reduce((a, c) => a + c.money, 0)
    const income = billList.filter(item => item.type === "income").reduce((a, c) => a + c.money, 0)
    return { pay, income, total: income + pay }
  }, [billList])

  const [visible, setVisible] = useState(false)
  return (
    <div className={classNames('dailyBill')} onClick={() => setVisible(!visible)}>
      <div className='dayHeader'>
        <div className="dateIcon">
          <span className="date">{date}</span>
          <span className={classNames('arrow', visible && "expand")}></span>
        </div>
        <div className="oneLineOverview">
          <div className="pay">
            <span className="type">支出</span>
            <span className="money">{dayResult.pay}</span>
          </div>
          <div className="income">
            <span className="type">收入</span>
            <span className="money">{dayResult.income}</span>
          </div>
          <div className="balance">
            <span className="money">{dayResult.total}</span>
            <span className="type">元</span>
          </div>
        </div>
      </div>
      <div className="billList" style={{ display: visible ? "block" : "none" }}>
        {billList.map(item => {
          return (
            <div className="bill" key={item.date}>
              <div className="detail">
                <div className="billType"> <Icon type={item.useFor} /> {item.useFor}</div>
              </div>
              <div className={classNames('money', item.type)}>
                {item.money.toFixed(2)}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

