import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { useNavigate, useLocation } from "react-router-dom";







function Head() {
   

    const navigate = useNavigate();
    const location = useLocation();
    const username = location?.state?.username;
    const handleLogout = () => {
      // Clear the token from local storage
      localStorage.removeItem('token');
      
      // Redirect to login page
      navigate('/login');
    };
    
    return (
        <div className="ml-20 mr-10 flex text-7xl justify-between items-center">
            Expense Tracker


            <Sheet>
                <SheetTrigger>
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>{username}</SheetTitle>
                        <SheetDescription>
                            Switch Accounts
                        </SheetDescription>
                    </SheetHeader>
                    <div className="mt-4">
            <Button variant="destructive" onClick={handleLogout}>
              Logout
            </Button>
          </div>
                </SheetContent>
            </Sheet>



        </div>

    )
}

export default Head;