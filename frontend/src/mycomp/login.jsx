import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Login = () => {
  const [error, setError] = useState("");
  const navigation = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    if (!username || !password) {
      setError("Please enter username and password");
      return;
    }
    try {
      const response = await fetch("http://localhost:3000/api/logIn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        console.log("token saved when login", data.token);
        localStorage.setItem("token", data.token);
        navigation("/", { state: { username: username, isLoggedIn: true } });
        console.log("Logged in", data);
      } else {
        console.log("Login failed");
        setError("Login Failed");
      }
    } catch (error) {
      console.log(error);
      setError("Login Failed");
    }
  };
  const handleInputChange = () => {
    setError(""); // Reset error when user starts typing
  };
  return (
    <>
    <div className="flex justify-center items-center flex-col">
      
      <Card>
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            To access your Expense Tracker account, please login below.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Input placeholder="Username" type="text" name="username" onChange={handleInputChange}/>
            <br></br>
            <Input placeholder=" Password" type="password" name="password"onChange={handleInputChange} />
            <br></br>
            <Button type="Submit"> Submit </Button>
          </form>
        </CardContent>
        <CardFooter>
          <p className="link">
            Do not have an account?
            <Link to="/signup"> Signup</Link>
          </p>
        </CardFooter>
        {error && (
          <Alert>
            <AlertTitle>Oohoo!</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </Card>
    </div>

    </>
  );
};

export default Login;
