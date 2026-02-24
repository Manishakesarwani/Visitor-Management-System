import { useRef, useState } from "react";
import {UseSelfAddVisitor} from "../hooks/UseSelfAddVisitor";

const SelfVisitorRegistration = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [number, setNumber] = useState("");
    const [photoUrl, setPhotoUrl] = useState(null);
    const PhotoRef = useRef(null);

    const [createdVis, setCreatedVis] = useState(null);


    const {error, isLoading, visitorAppointment, isSuccess} = UseSelfAddVisitor();

    const handleAppointment = async (e) => {
        e.preventDefault();
        

        const success = await visitorAppointment(name, email, number, photoUrl);
        // console.log(success);
        if(success){
            setCreatedVis(success);
        }

        setName("");
        setEmail("");
        setNumber("");
        setPhotoUrl(null);

        //Clear the input tag also.
        PhotoRef.current.value="";
    }

  return (
    <div className="selfvis">
        {createdVis && (
            <div className="visitorPass">
                <h1>Digital Pass</h1>
                <img src={`${process.env.REACT_APP_RENDER_URL}/${createdVis.Photo.replace(/\\/g, '/')}`} width="80" alt='Visitor Profile' onLoad={(e)=>e.target.classList.add("loaded")} className='visitor-img' />
                <h4 className='visitor_name'>{createdVis.Name}</h4>
                <div className='visitors_info'>{createdVis.Username}</div>
                <div className='visitors_info'>+91 - {createdVis.PhoneNumber}</div>
            </div>
        )}
        <div className='selfvisitorsForm'>
            <form onSubmit={handleAppointment}>
            <h3>Visitor's Form</h3>
            {error && <div className='error'>{error}</div>}
            {isSuccess && <div className='success'>Added Successfully!</div>}
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
                <button type='submit' disabled={isLoading}>{isLoading ? "Adding..." : "Add"}</button>
            </div>
            </form>
        </div>
    </div>
  )
}

export default SelfVisitorRegistration