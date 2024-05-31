import { useState ,useEffect} from "react"
import { ScrollArea } from "@/components/ui/scroll-area"

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

  import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
  import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
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

  
function Categories(){
    const [categories, setCategories] = useState([
        { category: 'Transportation'},
      ]);
    
    const [newCategory, setNewCategory] = useState({ category: ''});
    const [editCategory, setEditCategory] = useState({ _id: "", category: ""});


    const handleAddCategory = () => {
        // Validate that both category name and amount are provided
        if (newCategory.category) {
          // Make a POST request to your backend route
          fetch('http://localhost:3000/api/addCategory', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              category: newCategory.category,
            }),
          })
            .then(response => response.json())
            .then(data => {
              // Update the state with the new category received from the backend
              setCategories((prevCategories) => [...prevCategories, data.result]);
              // Clear the input fields
              setNewCategory({ category: ''});
            })
            .catch(error => console.error('Error adding category:', error));
        }
      };

      const handleDeleteCategory = (index) => {
        // Assuming sources[index] contains the details of the category to be deleted
        const categoryToDelete = categories[index];
        console.log(categoryToDelete._id)
      
        // Make a DELETE request to your backend route
        fetch(`http://localhost:3000/api/deleteCategory/${categoryToDelete._id}`, {
          method: 'DELETE',
        })
          .then(response => response.json())
          .then(data => {
            // If the deletion was successful, update the state
            if (data.success) {
              const updatedCategories = [...categories];
              updatedCategories.splice(index, 1);
              setCategories(updatedCategories);
            } else {
              console.error('Error deleting category:', data.errors);
            }
          })
          .catch(error => console.error('Error deleting category:', error));
      };
      const handleStartEdit = (index) => {
        const categoryToEdit = categories[index];
        setEditCategory({ ...categoryToEdit });
      };
      const handleSaveEdit = () => {
        fetch(`http://localhost:3000/api/editCategory/${editCategory._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            category: editCategory.category,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.success) {
              const updatedCategories = [...categories];
              const editedIndex = updatedCategories.findIndex(
                (category) => category._id === editCategory._id
              );
              if (editedIndex !== -1) {
                updatedCategories[editedIndex] = data.updatedCategory;
                setCategories(updatedCategories);
                setEditCategory({ _id: "", category: ""});
              }
            } else {
              console.error("Error editing category:", data.errors);
            }
          })
          .catch((error) => console.error("Error editing category:", error));
      };
      
    useEffect(() => {
        // Fetch data from the backend when the component mounts
        fetch('http://localhost:3000/api/getAllCategories')
          .then(response => response.json())
          .then(data => {
            console.log(data.allCategories)
            setCategories(data.allCategories);
          })
          .catch(error => console.error('Error fetching data:', error));
      }, []);
    

    return(
    <div>
    <ScrollArea className="h-[16vh] w-70 rounded-md border">

    <Table >

    <TableCaption>
        <Popover >
        <PopoverTrigger>ADD a new Category</PopoverTrigger>
        <PopoverContent className = "dark">
            <Card className='dark'>
            <CardHeader>
                <CardTitle>ADD</CardTitle>
                <CardDescription>Click on Save after Changes</CardDescription>
            </CardHeader>
            <CardContent>
                <Input
                    placeholder="Category"
                    value={newCategory.category}
                    onChange={(e) =>
                    setNewCategory({ ...newCategory, category: e.target.value })
                    }
                />
            </CardContent>
            
            <CardFooter>
                <Button onClick={handleAddCategory}>Save</Button>
            </CardFooter>
            </Card>
        </PopoverContent>
        </Popover>
    </TableCaption>

    <TableHeader >
        <TableRow>
        <TableHead>Category</TableHead>
        </TableRow>
    </TableHeader>

    <TableBody >
        {categories.map((category, index) => (
        <TableRow key={index}>
            <TableCell>{category.category}</TableCell>
            <TableCell>
                <Popover>
                <PopoverTrigger onClick={() => handleStartEdit(index)}>Edit</PopoverTrigger>
                <PopoverContent className="dark">
                    <Card className='dark'>
                    <CardHeader>
                        <CardTitle>Edit</CardTitle>
                        <CardDescription>Click on Save after Changes</CardDescription>
                    </CardHeader>
                    <CardContent>
                    <Input
                          placeholder="Category"
                          value={editCategory.category}
                          onChange={(e) =>
                            setEditCategory({
                              ...editCategory,
                              category: e.target.value,
                            })
                          }
                        />
                    </CardContent>
                    <CardFooter>
                        <Button onClick={handleSaveEdit} >Save</Button>
                    </CardFooter>
                    </Card>
                </PopoverContent>
                </Popover>
            </TableCell>

            <TableCell className="dark">
            <Dialog>
            <DialogTrigger>Delete</DialogTrigger>
            <DialogContent className='dark'>
            <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
                This action cannot be undone. This will permanently delete your account
                and remove your data from our servers.
            </DialogDescription>
            <Button onClick={() => handleDeleteCategory(index)} >Delete</Button>
            </DialogHeader>
            </DialogContent>
            </Dialog>

            </TableCell>
        </TableRow>
            ))}
    </TableBody>
    </Table>
    </ScrollArea>

    </div>
)}
export default Categories