import { useState,useEffect,useContext } from "react";
import LocationContext from "./locationcontext";

const Events=()=>
{
    const {location,updateLocation}=useContext(LocationContext);
    const[eventtypes, setEventTypes]=useState(['sports','music','conference']);
    const[eventType, setEventType]=useState('Sports');
    const[eventName, setEventName]=useState('Cricket');
    const[eventDesc, setEventDesc]=useState('Test Match');
    const handleEventTypeChange=()=>{
        setEventType('Conference');
    }
    const handleEventNameChange=()=>{
        setEventName('React');
    }
    const handleEventDescChange=()=>{
        setEventDesc('Demo Class');
    }
    useEffect(()=>{
        console.log("Triggered useeffect");
    },[]);
 return(
    <div className="container">
        <h1>MyEvents</h1>
        <hr/>
         {location}
        <div className="rows">
            
        </div>
        <p>List of events will be displayed here. </p>
        <h3>{eventType}</h3>
        <h3>{eventName}</h3>
        <h3>{eventDesc}</h3>
        <button onClick={handleEventTypeChange}>Change Event Type</button>
        <button onClick={handleEventNameChange}>Change Event Name</button>
        <button onClick={handleEventDescChange}>Change Event Desc</button>
       
        
                 <form>
                    Event Name: <input type="text"></input><br></br>
                    Event Type: <input type="text"></input><br></br>
                    Event Desc: <input type="text"></input><br></br>
                    <button></button>
           </form>
        
       
    </div>
 )
}
 export default Events;

