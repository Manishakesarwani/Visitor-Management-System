import React, { useEffect } from 'react'
import { UseGetAllPasses } from '../hooks/UseGetAllPasses';
import { UseGetAppointments } from '../hooks/UseGetAppointments';
import { UseGetVisitors } from '../hooks/UseGetVisitors';
import { format } from 'date-fns';
import { CheckPass } from './CheckPass';
import { UseAuthorizationContext } from '../hooks/UseAuthorizationContext';
import { UsePassContext } from '../hooks/UsePassContext';

const GetAllPasses = () => {

    const {isLoading, getPasses} = UseGetAllPasses();
    const {passes} = UsePassContext();
    const {getAllAppointments} = UseGetAppointments();
    const {getAllVisitor} = UseGetVisitors();
    const {user} = UseAuthorizationContext();


    useEffect(()=>{
        if(user){
            getAllVisitor();
            getAllAppointments();
            getPasses();
        }
                
    }, [user]);


  return (
    <div className='allPass'>
        {isLoading && <h3>Loading...</h3>}
        {!isLoading && passes.length===0 && <h3>No Pass found!</h3>}
        {!isLoading && passes.length>0 && passes.map((p)=>(
            <div key={p._id} className='pass_l'>
                <div className='p_check'>
                    <div>
                        <div className='p_info'>
                            <div className='v_info'>
                                {p.VisitorId && (
                                    <img src={`${process.env.RENDER_URL}/${p.VisitorId.Photo}`} width="80" alt='Visitor Profile' />
                                )}
                                {p.VisitorId && (<div><strong>{p.VisitorId.Name}</strong></div>)}
                                {p.VisitorId && (<div><strong>{p.VisitorId.PhoneNumber}</strong></div>)}
                            </div>
                            <div className='v_qr'>
                                <img src={p.QrCode} width="80" alt='' /><br />
                            </div>
                        </div>
                
                        Validity - {format(new Date(p.AcceptableFrom), "MM/dd/yyyy")} to {format(new Date(p.AcceptableTill), "MM/dd/yyyy")}<br />
                        Pdf File - <a href={`${process.env.RENDER_URL}/${p.PdfFile}`} target='_blank' rel='noopener noreferrer' download>Download Visitor Pass</a>
                    </div>
                        <div className='check'>
                            <CheckPass p_id={p._id} /> 
                        </div>
                </div>
            </div>
        ))}
    </div>
  )
}

export default GetAllPasses