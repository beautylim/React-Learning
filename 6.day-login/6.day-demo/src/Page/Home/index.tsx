
import BarChart from './components/BarChart';
import "./index.scss"
const Home = () => {

  return (
    <div className='home-content'>
      <BarChart title='三大框架满意度' data={['Vue', 'React', 'Angluar']} value={[180, 150, 100]} />
      <BarChart title='三大框架使用度' data={['Vue', 'React', 'Angluar']} value={[120, 200, 150]} />
    </div>
  )
}

export default Home