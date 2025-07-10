import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router";
const Login=()=>{
    const navigate=useNavigate();
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const loginUser=(e)=>{
        e.preventDefault();
        const data={
            email:email,
            password:password
        };
        fetch('http://localhost:8000/user/login',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(data)
        }).then(response=>{
            if(response.ok)
            {
                return response.json();
            }
            else{
                alert('Login Failed');
            }
        }).then(data=>{
            if(data.message!=='Success')
            {
                alert('Invalid credentials');
                return;
            }
            console.log('Login Successful:',data);
            localStorage.setItem('token',data.token);
            localStorage.setItem('firstName',data.data);
            navigate('/home');
        }).catch(error=>{
            console.log('Error:',error);
            alert("An error occurred while logging in")
        })
    }
    return(
        <div className="container">
            <h1>Login</h1>
            <hr/>
            <form>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" onChange={(e)=>setEmail(e.target.value)} className="form-control" placeholder="Email"></input>
                </div>
                 <div className="form-group">
                    <label>Password</label>
                    <input type="password" onChange={(e)=>setPassword(e.target.value)}  className="form-control" placeholder="Password"></input>
                </div>
                 <button type="submit" className="btn btn-primary" onClick={loginUser}>Login</button>
            </form>

        </div>
    )
}
export default Login;