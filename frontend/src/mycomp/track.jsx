import { useState, useEffect } from "react"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import { Separator } from "@/components/ui/separator"




function Track() {
    const [selectedYear, setSelectedYear] = useState('2024');
    const [incomeData, setIncomeData] = useState([]);
    const [expenseData, setExpenseData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {

                const incomeResponse = await fetch(`http://localhost:3000/api/incomes?year=${selectedYear}`);
                if (!incomeResponse.ok) {
                    throw new Error('Network response for income was not ok');
                }
                const incomeData = await incomeResponse.json();
                setIncomeData(incomeData);

                const expenseResponse = await fetch(`http://localhost:3000/api/expenses?year=${selectedYear}`);
                if (!expenseResponse.ok) {
                    throw new Error('Network response for expense was not ok');
                }
                const expenseData = await expenseResponse.json();
                setExpenseData(expenseData);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };



        fetchData();
    }, [selectedYear]);

    const handleYearChange = (value) => {
        setSelectedYear(value);
    };




    return (
        <Drawer>
            <DrawerTrigger className="text-white dark:text-gray-300">Open</DrawerTrigger>
            <DrawerContent className="flex items-center bg-white dark:bg-gray-800 text-black dark:text-gray-300">
                <DrawerHeader className="mb-10">
                    <DrawerTitle className="text-black dark:text-white">Expense report for</DrawerTitle>
                    <DrawerDescription className="text-gray-700 dark:text-gray-400">
                        <Select onValueChange={handleYearChange} >
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Year" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="2024">2024</SelectItem>
                                <SelectItem value="2023">2023</SelectItem>
                                <SelectItem value="2022">2022</SelectItem>
                            </SelectContent>
                        </Select>
                        <Table>
                            {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[100px]">Item</TableHead>
                                    <TableHead className="text-right">Amount</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell className="font-medium">Income</TableCell>
                                    <TableCell className="text-right">${incomeData.reduce((acc, item) => acc + item.amount, 0).toFixed(2)}</TableCell>
                                </TableRow>
                            </TableBody>
                            <TableBody>
                                <TableRow>
                                    <TableCell className="font-medium">Expense</TableCell>
                                    <TableCell className="text-right">${expenseData.reduce((acc, item) => acc + item.amount, 0).toFixed(2)}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>

                    </DrawerDescription>
                    <Separator />

                </DrawerHeader>


                <Separator />


                <DrawerFooter>

                    <Tabs defaultValue="account" className="w-[400px]">
                        <TabsList>
                            <TabsTrigger value="source">Income Source</TabsTrigger>
                            <TabsTrigger value="category">Account Category</TabsTrigger>
                        </TabsList>
                        <TabsContent value="source">
                            <Table>
                                {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[100px]">Source</TableHead>
                                        {/* <TableHead>Status</TableHead>
                                    <TableHead>Method</TableHead> */}
                                        <TableHead className="text-right">Amount</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell className="font-medium">Bank</TableCell>
                                        {/* <TableCell>Paid</TableCell>
                                    <TableCell>Credit Card</TableCell> */}
                                        <TableCell className="text-right">$250.00</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>

                        </TabsContent>

                    </Tabs>


                    <DrawerClose className="text-gray-700 dark:text-gray-400">


                    </DrawerClose>
                    <Separator />

                </DrawerFooter>

            </DrawerContent>
        </Drawer>

    )
}

export default Track


