import { Link } from "react-router-dom";

export function Home(){
    return <>
    <div><Link to ='/student'  >Student</Link></div>
    <div><Link to ='/professor' >Professor</Link></div>
    
    </>
}