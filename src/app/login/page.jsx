import dynamic from 'next/dynamic';
//import LogCard from '../../components/Login';
import Spin from '../../components/Spinner'
const LogCard = dynamic(() => import('../../components/Login'), { ssr: false})

const Login = () => {
  return(
  <>
    <LogCard/>
  </>
  )
}

export default Login