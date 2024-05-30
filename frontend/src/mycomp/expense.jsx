import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

import { Input } from "@/components/ui/input"
  import { Button } from "@/components/ui/button"
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

  import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"

  import { Calendar } from "@/components/ui/calendar"
  import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"

import { useState, useEffect } from "react"






function Expense(){
    const [date, setDate] = useState()
    const [categories, setCategories] = useState([]);
    const [sources, setSources] = useState([]);
    useEffect(() => {
      // Fetch sources from the backend
      fetch('http://localhost:3000/api/getAllSources')
        .then(response => response.json())
        .then(data => {
          setSources(data.allSources);
        })
        .catch(error => console.error('Error fetching sources:', error));
    }, []);


      useEffect(() => {
        // Fetch data from the backend when the component mounts
        fetch("http://localhost:3000/api/getAllCategories")
          .then((response) => response.json())
          .then((data) => {
            console.log(data.allCategories);
            setCategories(data.allCategories);
          })
          .catch((error) => console.error("Error fetching data:", error));
      }, []);
    return(<>
        <Card className='dark'>
            <CardHeader>
                <CardTitle>ADD Expense</CardTitle>
                <CardDescription>Click on Save after Changes</CardDescription>
            </CardHeader>
            <CardContent>
            <Select>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Source" />
                </SelectTrigger>
                <SelectContent>
                {sources.map((source) => (
                  <SelectItem
                  key={source._id}
                  value={source._id}
                  
                
                >
                  {source.source}
                </SelectItem>
                ))}
              </SelectContent>
                </Select>

            </CardContent>
            <CardContent>
            <Select>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                {categories.map((category) => (
                <SelectItem key={category._id} value={category._id}>
                  {category.category}
                </SelectItem>
              ))}
            </SelectContent>
                </Select>

            </CardContent>
            <CardContent>
            <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  
            </CardContent>
            <CardContent>
                        <Input placeholder="Amount"/> 
            </CardContent>

            <CardFooter>
                <Button >Save</Button>
            </CardFooter>
            </Card>
    </>)
}

export default Expense