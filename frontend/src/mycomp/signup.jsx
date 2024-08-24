import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {useState} from 'react';
import { Alert, AlertDescription, AlertTitle} from "@/components/ui/alert"
import { Link, useNavigate } from 'react-router-dom';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"



const Signup = ()=>{

    const [error,setError] = useState('')
    const navigation = useNavigate();


    const handleSubmit = async (event)=>{
        event.preventDefault();
        const username = event.target.username.value;
        const password = event.target.password.value;

        if(!username || !password){
            setError('Please enter username and password');
            return;
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

            const data = await response.json();

            if(response.ok){
                navigation('/login')
                console.log('Signed up',data);
            }
            else{
                console.log('Sign up failed')
            }
        }
        catch(error){
            console.log(error)
            setError('Signup failed')
        }
        

    }
    return(
        
        <div className="flex justify-center items-center flex-col">
        <Card >
        <CardHeader>
            <CardTitle>Signup</CardTitle>
            <CardDescription>To create a new account, please signup below</CardDescription>
        </CardHeader>
        <CardContent>
            <form onSubmit={handleSubmit}>
            <Input placeholder="Username" type="text" name="username"/>
            <br />
            <Input placeholder="Password" type="password" name = "password"/>
            <br />
            <Button type = "Submit"> Submit </Button>
            </form>
        </CardContent>
        <CardFooter>
        
        <p className="link">
         Have an account? 
         <Link to="/login"> Login</Link>
        </p>
        </CardFooter>
        {error &&<Alert>
        <AlertTitle>Oohoo!</AlertTitle>
        <AlertDescription>
            {error}
        </AlertDescription>
        </Alert>
        }
        
        </Card>
        
        </div>
       
    )

}

export default Signup;