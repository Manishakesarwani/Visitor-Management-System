import { UseAuthorizationContext } from '../hooks/UseAuthorizationContext'
import AdminDashboard from './AdminDashboard';
import EmployeeDashboard from './EmployeeDashboard';
import SecurityDashboard from './SecurityDashboard';

const Dashboard = () => {

    const {user} = UseAuthorizationContext();

   
  return (
    <div>
      <div className='dashboard'>
        {user.Role === "admin" && (<AdminDashboard />)}
        {user.Role === "employee" && (<EmployeeDashboard />)}
        {user.Role === "security" && (<SecurityDashboard />)}
      </div>
      
    </div>
  )
}

export default Dashboard