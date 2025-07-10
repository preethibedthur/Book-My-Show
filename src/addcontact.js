import { useContext } from "react";
import LocationContext from "./locationcontext";
function Contact()
{
    const {location,updateLocation}=useContext(LocationContext)
    return(
        <div>
            <h1>Movie Contacts</h1>
            {location}
        </div>
    )
}
export default Contact;