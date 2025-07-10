import { useContext } from "react";
import LocationContext from "./locationcontext";

function Home()
{
    const {location,updateLocation}=useContext(LocationContext);
    return(
        <div>
            <h1>Welcome To Movies App</h1>
            <p>Location: {location}</p>
            <select onChange={(e)=>updateLocation(e.target.value)}>
                <option value="bangalore">Bangalore</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Dubai">Dubai</option>
                 <option value="London">London</option>
            </select>
            <button onClick={()=>updateLocation('New york')}>Click Me....</button>
        </div>
    )
}
export default Home;