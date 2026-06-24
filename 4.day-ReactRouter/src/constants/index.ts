
interface BillType {
  type: string,
  name: string
}

interface BillTypeData {
  type: string,
  name: string,
  list: BillType[]
}

interface BillListData {
  pay: BillTypeData[]
  income: BillTypeData[]
}

export const billListData: BillListData = {
  pay: [
    {
      type: "food",
      name: "餐饮",
      list: [
        {
          type: "food",
          name: "餐饮"

        },
        {
          type: "drinks",
          name: "酒水饮料"

        }
      ]
    },
    {
      type: "entertainment",
      name: "娱乐",
      list: [
        {
          type: "travel",
          name: "旅游"

        }
      ]
    },
    {
      type: "normal",
      name: "日常支出",
      list: [
        {
          type: "cloth",
          name: "衣服"

        },
        {
          type: "house rent",
          name: "房租"

        },
        {
          type: "house debt",
          name: "房贷"

        }
      ]
    },
    {
      type: "interaction",
      name: "人情往来",
      list: [
        {
          type: "forward to others",
          name: "转账给别人"

        }
      ]
    },
    {
      type: "education",
      name: "教育",
      list: [
        {
          type: "learn",
          name: "学习"

        }
      ]
    }
  ],
  "income": [
    {
      type: "salary",
      name: "工资",
      list: [
        {
          type: "salary",
          name: "每月工资"

        },
        {
          type: "bonus",
          name: "奖金"

        }
      ]
    },
    {
      type: "interaction",
      name: "人情往来",
      list: [
        {
          type: "forward from others",
          name: "他人转账"

        }
      ]
    }
  ]
}