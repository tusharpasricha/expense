import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import PropTypes from "prop-types";

function Income({ onIncomeSaved }) {
  const [date, setDate] = useState();
  const [sources, setSources] = useState([]);
  const [selectedSource, setSelectedSource] = useState("");
  const [amount, setAmount] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:3000/api/getAllSources", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setSources(data.allSources);
      })
      .catch((error) => console.error("Error fetching sources:", error));
  }, []);

  const handleSave = () => {
    const token = localStorage.getItem("token");
    if (!selectedSource || !amount || !date) {
      setErrorMsg("Fill out all the fields");
      return;
    }
    setErrorMsg("");

    if (selectedSource && amount && date) {
      fetch("http://localhost:3000/api/addIncome", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          sourceId: selectedSource,
          amount: amount,
          date: date,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            console.log("Income added successfully:", data.savedIncome);
            onIncomeSaved(data.savedIncome); // Call the callback function
          } else {
            console.error("Error adding income:", data.errors);
          }
        })
        .catch((error) => console.error("Error adding income:", error));
    }
  };

  return (
    <Card className="dark">
      <CardHeader>
        <CardTitle>ADD Income</CardTitle>
        <CardDescription>Click on Save after Changes</CardDescription>
      </CardHeader>
      <CardContent>
        <Select onValueChange={(value) => setSelectedSource(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Source" />
          </SelectTrigger>
          <SelectContent>
            {sources.map((source) => (
              <SelectItem key={source._id} value={source._id}>
                {source.source}
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
        <Input
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </CardContent>
      <CardContent>
        <p className="text-red-600">{errorMsg}</p>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSave}>Save</Button>
      </CardFooter>
    </Card>
  );
}
Income.propTypes = {
  onIncomeSaved: PropTypes.func.isRequired,
};

export default Income;
