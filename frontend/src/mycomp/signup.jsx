import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {useState} from 'react';
import { Alert, AlertDescription, AlertTitle} from "@/components/ui/alert"
import { Link, useNavigate } from 'react-router-dom';



const Signup = ()=>{

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
            const response = await fetch('http://localhost:3000/api/signUp',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    username:username,
                    password:password
                })
            })

            const data = await response.json;

            if(response.ok){
                navigation('/',{ state: { username: username ,isLoggedIn: true } })
                console.log('Signed up',data);
            }
            else{
                console.log('Sign up failed')
            }
        }
        catch(error){
            console.log(error)
        }
        

    }
    return(
        <>
        <div>SignUp</div>
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
         Have an account? 
         <Link to="/login">LogIn</Link>
        </p>
        

        </>
    )

}

export default Signup;