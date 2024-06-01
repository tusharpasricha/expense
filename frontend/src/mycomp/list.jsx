import { ScrollArea } from "@/components/ui/scroll-area"
import { format } from 'date-fns';

import { useEffect , useState } from "react";
import PropTypes from "prop-types";


import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

  

function List({ incomes }){
    // const [incomes, setIncomes] = useState([]);

    // useEffect(() => {
    //   // Fetch income data from the backend
    //   fetch("http://localhost:3000/api/getAllIncomes")
    //     .then((response) => response.json())
    //     .then((data) => {
    //       setIncomes(data.allIncomes);
    //     })
    //     .catch((error) => console.error("Error fetching incomes:", error));
    // }, []);
    
    return(<>
   <ScrollArea className="h-72 w-480 rounded-md border">
   <Table>
      <TableCaption>A list of your all transaction.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Date</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Source</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
  {incomes.map((income) => (
    <TableRow key={income._id}>
      <TableCell className="font-medium">{format(income.date, "PPP")}</TableCell>
      <TableCell>INCOME</TableCell>
      <TableCell>{income.source.source}</TableCell>
      <TableCell className="text-right">{'+'+income.amount}</TableCell>
    </TableRow>
  ))}
        </TableBody>
      
    </Table>
    </ScrollArea>
    </>)
}
List.propTypes = {
  incomes: PropTypes.func.isRequired,
};
export default List