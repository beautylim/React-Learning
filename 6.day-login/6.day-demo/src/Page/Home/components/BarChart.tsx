import * as echarts from 'echarts';
import { useEffect, useRef } from 'react';

interface Props {
  title?: string,
  data: string[],
  value: number[]
}


const BarChart = (props: Props) => {
  const { title, data, value } = props
  var chartRef = useRef(null);

  useEffect(() => {
    var chartDom = chartRef.current;
    var myChart = echarts.init(chartDom);
    var option = {
      title: {
        text: title
      },
      xAxis: {
        type: 'category',
        data: data
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: value,
          type: 'bar'
        }
      ]
    };

    option && myChart.setOption(option);

  }, [])
  return (
    <div ref={chartRef} style={{ width: '500px', height: '400px' }}></div>
  )
}

export default BarChart