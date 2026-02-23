import { useState } from 'react';
import { UseGetAppointments } from '../hooks/UseGetAppointments'
import { UseCreatePass } from '../hooks/UseCreatePass';

const PassForm = () => {

  const {appointments} = UseGetAppointments();
  const [aid, setAid] = useState(null);

  const {isError, isLoading, isSuccess, createPass} = UseCreatePass();

  const handlePassCreation = async(e)=>{
    e.preventDefault();

    await createPass(aid);
    setAid("");
  }


  return (
    <div className='pass_form'>
      <h3>Pass Form</h3>
      <form onSubmit={handlePassCreation}>
        {isError && (<div className='error'>{isError}</div>)}
        {isSuccess && (<div className='success'>Pass Created Successfully!</div>)}
        <label htmlFor='ID'>Select Appointment</label>
        <select id='ID' value={aid} onChange={(e) => setAid(e.target.value)}>
          <option value="">Please Select</option>
          {appointments && appointments.map((a)=>(
            a.Status === "approve" && (<option key={a._id} value={a._id}>{a.VisitorId.Name}</option>)
          ))}
        </select>
        <button type='submit' disabled={isLoading}>{isLoading ? "Creating..." : "Create Pass"}</button>
      </form>
    </div>
  )
}

export default PassForm