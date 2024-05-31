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
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  







function Track() {
    return (
        <Drawer>
            <DrawerTrigger className="text-white dark:text-gray-300">Open</DrawerTrigger>
            <DrawerContent className="bg-white dark:bg-gray-800 text-black dark:text-gray-300">
                <DrawerHeader>
                    <DrawerTitle className="text-black dark:text-white">Expense report for</DrawerTitle>
                    <DrawerDescription className="text-gray-700 dark:text-gray-400">
                        <Select>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Year" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="light">2024</SelectItem>
                                <SelectItem value="dark">2023</SelectItem>
                                <SelectItem value="system">2022</SelectItem>
                            </SelectContent>
                        </Select>

                    </DrawerDescription>




                </DrawerHeader>
                <Tabs defaultValue="account" className="w-[400px]">
                    <TabsList>
                        <TabsTrigger value="account">Income Source</TabsTrigger>
                        <TabsTrigger value="password">Account Category</TabsTrigger>
                    </TabsList>
                    <TabsContent value="account">
                        <Table>
                            <TableCaption>A list of your recent invoices.</TableCaption>
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
                    <TabsContent value="password"><Table>
                        <TableCaption>A list of your recent invoices.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">Category</TableHead>
                                {/* <TableHead>Status</TableHead>
                                <TableHead>Method</TableHead> */}
                                <TableHead className="text-right">Amount</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell className="font-medium">Transporation</TableCell>
                                {/* <TableCell>Paid</TableCell>
                                <TableCell>Credit Card</TableCell> */}
                                <TableCell className="text-right">$250.00</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                    </TabsContent>
                </Tabs>

                <DrawerFooter>
                    <DrawerClose className="text-gray-700 dark:text-gray-400">
                        <Button variant="outline">Jan</Button>
                        <Button variant="outline">Feb</Button>
                        <Button variant="outline">Mar</Button>
                        <Button variant="outline">Apr</Button>
                        <Button variant="outline">May</Button>
                        <Button variant="outline">Jun</Button>
                        <Button variant="outline">Jul</Button>
                        <Button variant="outline">Aug</Button>
                        <Button variant="outline">Sep</Button>
                        <Button variant="outline">Oct</Button>
                        <Button variant="outline">Nov</Button>
                        <Button variant="outline">Dec</Button>

                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>

    )
}

export default Track