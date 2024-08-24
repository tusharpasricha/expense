import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {useState} from 'react';
import { Alert, AlertDescription, AlertTitle} from "@/components/ui/alert"
import { Link, useNavigate } from 'react-router-dom';



const Login = ()=>{

    const [error,setError] = useState('')
    const navigation = useNavigate();


    const handleSubmit = async (event)=>{
        event.preventDefault();
        const username = event.target.username.value;
        const password = event.target.password.value;

        if(!username || !password){
            setError('Please enter username and password');
        }
        try{
            const response = await fetch('http://localhost:3000/api/logIn',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    username:username,
                    password:password
                })
            })

            const data = await response.json();
            console.log(data);

            if(response.ok){
                console.log('token saved when login',data.token);
                localStorage.setItem('token', data.token);
                navigation('/',{ state: { username: username ,isLoggedIn: true } })
                console.log('Logged in',data);
            }
            else{
                console.log('Login failed')
            }
        }
        catch(error){
            console.log(error)
        }
        

    }
    return(
        <>
        <div>Login</div>
        <form onSubmit={handleSubmit}>
        <Input type="text" name="username"/>
        <Input type="password" name = "password"/>
        <Button type = "Submit"> Submit </Button>
        </form>
        {error &&<Alert>
        <AlertTitle>Attention!</AlertTitle>
        <AlertDescription>
            {error}
        </AlertDescription>
        </Alert>
        }
        <p className="link">
         Do not have an account? 
         <Link to="/signup">Signup</Link>
        </p>
        

        </>
    )

}

export default Login;