import { useState, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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

function Categories() {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({ category: "" });
  const [editCategory, setEditCategory] = useState({ _id: "", category: "" });

  const handleAddCategory = () => {
    if (newCategory.category) {
      const token = localStorage.getItem('token');
      fetch("http://localhost:3000/api/addCategory", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          category: newCategory.category,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          setCategories((prevCategories) => [...prevCategories, data.result]);
          setNewCategory({ category: "" });
        })
        .catch((error) => console.error("Error adding category:", error));
    }
  };

  const handleDeleteCategory = (index) => {
    const categoryToDelete = categories[index];
    const token = localStorage.getItem('token');
    console.log("Deleting category ID:", categoryToDelete._id); // Logging the ID

    fetch(`http://localhost:3000/api/deleteCategory/${categoryToDelete._id}`, {
      method: "DELETE",
      headers: {
        'Authorization': `Bearer ${token}`
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          const updatedCategories = categories.filter(
            (category) => category._id !== categoryToDelete._id
          );
          setCategories(updatedCategories);
        } else {
          console.error("Error deleting category:", data.errors);
        }
      })
      .catch((error) => console.error("Error deleting category:", error));
  };

  const handleStartEdit = (index) => {
    const categoryToEdit = categories[index];
    setEditCategory({ ...categoryToEdit });
  };

  const handleSaveEdit = () => {
    const token = localStorage.getItem('token');
    console.log("Editing category ID:", editCategory._id); // Logging the ID

    fetch(`http://localhost:3000/api/editCategory/${editCategory._id}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        category: editCategory.category,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          const updatedCategories = categories.map((category) =>
            category._id === editCategory._id ? data.updatedCategory : category
          );
          setCategories(updatedCategories);
          setEditCategory({ _id: "", category: "" });
        } else {
          console.error("Error editing category:", data.errors);
        }
      })
      .catch((error) => console.error("Error editing category:", error));
  };

  useEffect(() => {
    const token = localStorage.getItem('token')
    fetch("http://localhost:3000/api/getAllCategories",{
      headers:{
        'Authorization':`Bearer ${token}`
      }
    })
      .then((response) => response.json())
      .then((data) => {
        setCategories(data.allCategories);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div>
      <ScrollArea className="h-[16vh] w-70 rounded-md border">
        <Table>
          <TableCaption>
            <Popover>
              <PopoverTrigger>ADD a new Category</PopoverTrigger>
              <PopoverContent className="dark">
                <Card className="dark">
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

          <TableHeader>
            <TableRow>
              <TableHead>Category</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {categories.map((category, index) => (
              <TableRow key={category._id}> {/* Updated: use category._id as key */}
                <TableCell>{category.category}</TableCell>
                <TableCell>
                  <Popover>
                    <PopoverTrigger onClick={() => handleStartEdit(index)}>
                      Edit
                    </PopoverTrigger>
                    <PopoverContent className="dark">
                      <Card className="dark">
                        <CardHeader>
                          <CardTitle>Edit</CardTitle>
                          <CardDescription>
                            Click on Save after Changes
                          </CardDescription>
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
                          <Button onClick={handleSaveEdit}>Save</Button>
                        </CardFooter>
                      </Card>
                    </PopoverContent>
                  </Popover>
                </TableCell>

                <TableCell className="dark">
                  <Dialog>
                    <DialogTrigger>Delete</DialogTrigger>
                    <DialogContent className="dark">
                      <DialogHeader>
                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                        <DialogDescription>
                          This action cannot be undone. This will permanently delete
                          your category and remove your data from our servers.
                        </DialogDescription>
                        <Button onClick={() => handleDeleteCategory(index)}>
                          Delete
                        </Button>
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
  );
}

export default Categories;
