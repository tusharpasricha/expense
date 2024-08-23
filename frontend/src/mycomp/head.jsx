import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"




function Head() {
    
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
                        <SheetTitle>Tushar Pasricha</SheetTitle>
                        <SheetDescription>
                            Switch Accounts
                        </SheetDescription>
                    </SheetHeader>
                </SheetContent>
            </Sheet>



        </div>

    )
}

export default Head;