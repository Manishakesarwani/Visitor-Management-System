import React, { useEffect, useRef, useState } from 'react'
import {UseAddVisitor} from '../hooks/UseAddVisitor'
import { UseAuthorizationContext } from "../hooks/UseAuthorizationContext";
import { UseGetVisitors } from '../hooks/UseGetVisitors';
import { UseRemoveVisitor } from '../hooks/UseRemoveVisitor';
import SearchVisistors from '../Components/SearchVisistors';

const Visitors = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [number, setNumber] = useState("");
    // const [numberCode, setNumberCode] = useState("");
    const [photoUrl, setPhotoUrl] = useState(null);
    const [isRemoveEligible, setIsRemoveEligible] = useState(false);
    const [removingVisID, setRemovingVisID] = useState(null);

    const PhotoRef = useRef(null);

    const {error, isLoading, visitorAppointment, isSuccess} = UseAddVisitor();
    const {user} = UseAuthorizationContext();
    const {visitors, isEligible, visError, getAllVisitor} = UseGetVisitors();
    const {isRemoving, removeError, removeVis} = UseRemoveVisitor();


    useEffect(()=>{
        if(user){
            getAllVisitor();
        }

        if(user.Role==="admin"){
            setIsRemoveEligible(true);
        }
        else{
            setIsRemoveEligible(false);
        }


        //eslint-disable-next-line react-hooks/exhaustive-deps
    },[user]);

    const handleRemove = async(id) => {

        const confirm_del = window.confirm("This will remove all the information related to this visitor. Are you sure?");

        if(confirm_del){
            setRemovingVisID(id)
            const removed = await removeVis(id);
            // console.log(removed);
            if(removed){
                await getAllVisitor();
                setRemovingVisID(null);
            }
        }
    }

    const handleAppointment = async (e) => {
        e.preventDefault();
        
        // let combined = `+${numberCode}${number}`

        const success = await visitorAppointment(name, email, number, photoUrl);
        // console.log(success);
        if(success){
            await getAllVisitor();
        }

        setName("");
        setEmail("");
        setNumber("");
        // setNumberCode("");
        setPhotoUrl(null);

        //Clear the input tag also.
        PhotoRef.current.value="";
    }

    


  return (
    <div className={isEligible ? 'VisitorPage' : 'VisitorPageExtra'}>
        <div className='Visitor_profile'>
            {!visError && visitors && <SearchVisistors />}
            {visError && <h3>{visError}</h3>}
               {!visError && visitors && visitors.map((v)=>(
                    <div key={v._id} className='vis'>
                        <div>
                            <img src={`${process.env.REACT_APP_RENDER_URL}/${v.Photo.replace(/\\/g, '/')}`} width="80" alt='Visitor Profile' onLoad={(e)=>e.target.classList.add("loaded")} className='visitor-img' />
                            <h4 className='visitor_name'>{v.Name}</h4>
                            <div className='visitors_info'>{v.Username}</div>
                            <div className='visitors_info'>+91 - {v.PhoneNumber}</div>
                        </div>
                        {isRemoveEligible && (
                            <div className='vis_remove' onClick={()=>handleRemove(v._id)}>
                                {removeError && removingVisID===v._id && <div className='error'>{removeError}</div>}
                                <div>{isRemoving && removingVisID===v._id ? "Removing..." : (<i className="bi bi-person-dash"></i>)}</div>
                            </div>
                        )}
                    </div>
                ))} 
        </div>
        {isEligible && (<div className='visitorsForm'>
            <form onSubmit={handleAppointment}>
            <h3>Visitor's Form</h3>
            {error && <div className='error'>{error}</div>}
            {isSuccess && <div className='success'>Visitor Added Successfully!</div>}
            <div>
                <label htmlFor='Name'>Name</label>
                <input type='text' value={name} onChange={(e)=> setName(e.target.value)} name='Name' id='Name' placeholder='e.g. John Cotton'/>
            </div>
            <div>
                <label htmlFor='Username'>Email</label>
                <input type='email' value={email} onChange={(e)=> setEmail(e.target.value)} name='Username' id='Username' placeholder='e.g. example@test.com'/>
            </div>
            <div>
                <label htmlFor='PhoneNumber'>Phone Number </label>
                {/* <input type='text' value={numberCode} onChange={(e)=>setNumberCode(e.target.value)} placeholder='91' /> */}
                <input type='tel' value={number} onChange={(e) => setNumber(e.target.value)} name='PhoneNumber' id='PhoneNumber' placeholder='e.g. 9999999999'/>
            </div>
            <div>
                <label htmlFor='Photo'>Photo</label>
                <input type='file' accept='image/*' ref={PhotoRef} id='Photo' onChange={(e) => setPhotoUrl(e.target.files[0])} name="Photo"/>
            </div>
            <div>
                <button type='submit' disabled={isLoading}>{isLoading ? "Adding..." : "Add Visitor"}</button>
            </div>
            </form>
        </div>)}
        
    </div>
  )
}

export default Visitors