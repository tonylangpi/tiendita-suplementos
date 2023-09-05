import dynamic from 'next/dynamic';
import Spin from '../../components/Spinner';
//import LogCard from '../../components/Login';
const LogCard = dynamic(() => import('../../components/Login'), { ssr: false, loading: () => <Spin/> })

const Login = () => {
  return(
  <>
  <LogCard/>
  </>
  )
}

export default Login