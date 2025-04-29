import { useState, useEffect, useCallback } from "react";
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { Plus, Edit, Trash2, Image, Loader2 } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.coerce.number().min(1, "Price must be greater than 0"),
  capacity: z.coerce.number().min(1, "Capacity must be at least 1"),
  features: z.string()
    .transform((val) => val.split(',').map(s => s.trim()).filter(Boolean))
    .refine((arr) => arr.length > 0, "At least one feature is required"),
  available: z.boolean().default(true),
});

const RoomManagement = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);
  const [formError, setFormError] = useState(null);
  
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      capacity: 1,
      features: [],
      available: true,
    },
  });
  
  const fetchRooms = useCallback(async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/rooms', {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch rooms');
      }
      
      const data = await response.json();
      setRooms(data.data);
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to fetch rooms",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchRooms();
  }, [fetchRooms]);
  
  // Update form when editing room
  useEffect(() => {
    if (editingRoom) {
      form.reset({
        name: editingRoom.name,
        description: editingRoom.description,
        price: editingRoom.price,
        capacity: editingRoom.capacity,
        features: Array.isArray(editingRoom.features) ? editingRoom.features.join(", ") : "",
        available: editingRoom.available,
      });
    }
  }, [editingRoom, form]);

  const handleImageDelete = async (roomId: string, imageIndex: number) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/rooms/${roomId}/images/${imageIndex}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete image');
      }

      // Update local state
      setRooms(rooms.map(room => {
        if (room.id === roomId) {
          const updatedImages = [...room.images];
          updatedImages.splice(imageIndex, 1);
          return { ...room, images: updatedImages };
        }
        return room;
      }));

      toast({
        title: "Success",
        description: "Image deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete image",
        variant: "destructive",
      });
    }
  };

  const onSubmit = async (values) => {
    try {
      setIsSubmitting(true);
      setFormError(null);

      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication required');
      }

      const endpoint = editingRoom 
        ? `http://localhost:5000/api/rooms/${editingRoom.id}` 
        : 'http://localhost:5000/api/rooms';

      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        if (key === 'features') {
          formData.append('features', JSON.stringify(Array.isArray(value) ? value : (value as string).split(',').map(v => v.trim()).filter(Boolean)));
        } else {
          formData.append(key, String(value));
        }
      });

      const response = await fetch(endpoint, {
        method: editingRoom ? 'PUT' : 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to save room');
      }

      const data = await response.json();
      
      toast({
        title: `Room ${editingRoom ? 'updated' : 'created'} successfully`,
        description: `${values.name} has been ${editingRoom ? 'updated' : 'added'}.`,
      });

      // Update local state
      if (editingRoom) {
        setRooms(rooms.map(room => room.id === editingRoom.id ? data.data : room));
      } else {
        setRooms(prev => [...prev, data.data]);
      }
      
      setIsDialogOpen(false);
      setEditingRoom(null);
    } catch (error) {
      setFormError(error instanceof Error ? error.message : 'An error occurred');
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to save room",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleEdit = (room) => {
    setEditingRoom(room);
    setIsDialogOpen(true);
  };
  
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this room?")) {
      return;
    }
    
    const token = localStorage.getItem('token');
    
    try {
      const response = await fetch(`http://localhost:5000/api/rooms/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      const data = await response.json();
      
      if (data.success) {
        toast({
          title: "Room deleted",
          description: "The room has been removed successfully.",
        });
        
        // Update local state
        setRooms(rooms.filter(room => room.id !== id));
      } else {
        throw new Error(data.error || "Failed to delete room");
      }
    } catch (error) {
      console.error("Error deleting room:", error);
      toast({
        title: "Error",
        description: "Failed to delete room. Removing from UI anyway.",
        variant: "destructive",
      });
      
      // For demo purposes, let's simulate a successful deletion
      setRooms(rooms.filter(room => room.id !== id));
    }
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold font-serif">Room Management</h1>
          <p className="text-gray-500">Manage your hotel rooms and their details.</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingRoom(null)}>
              <Plus className="mr-2 h-4 w-4" /> Add New Room
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[625px]">
            <DialogHeader>
              <DialogTitle>{editingRoom ? 'Edit Room' : 'Add New Room'}</DialogTitle>
              <DialogDescription>
                Fill in the details below to {editingRoom ? 'update the' : 'create a new'} room.
              </DialogDescription>
            </DialogHeader>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Room Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Deluxe Ocean Suite" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price per Night ($)</FormLabel>
                        <FormControl>
                          <Input type="number" min="0" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Write a description of the room" 
                          {...field} 
                          className="resize-none"
                          rows={3}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="capacity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Capacity</FormLabel>
                        <FormControl>
                          <Input type="number" min="1" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="available"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-end space-x-3 space-y-0 rounded-md border p-3">
                        <FormControl>
                          <input
                            type="checkbox"
                            checked={field.value}
                            onChange={field.onChange}
                            className="h-4 w-4 rounded border-gray-300"
                          />
                        </FormControl>
                        <div className="leading-none">
                          <FormLabel>Available for booking</FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="features"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Features (comma separated)</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="King-size bed, Ocean view, Free Wi-Fi, Minibar" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {/* Image upload section (simplified for demo) */}
                <div>
                  <FormLabel>Room Images</FormLabel>
                  <div className="mt-2 p-4 border-2 border-dashed rounded-md flex justify-center items-center bg-gray-50 cursor-pointer">
                    <div className="text-center">
                      <Image className="mx-auto h-12 w-12 text-gray-400" />
                      <p className="mt-1 text-sm text-gray-500">
                        Drag and drop images or click to upload
                      </p>
                      <p className="text-xs text-gray-500">
                        (PNG, JPG, WEBP up to 10MB)
                      </p>
                    </div>
                  </div>
                  {editingRoom && editingRoom.images && editingRoom.images.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {editingRoom.images.map((img, idx) => (
                        <div key={idx} className="relative w-16 h-16 rounded overflow-hidden">
                          <img 
                            src={img} 
                            alt={`Room image ${idx + 1}`} 
                            className="w-full h-full object-cover"
                          />
                          <Button 
                            variant="destructive" 
                            className="absolute top-1 right-1 h-6 w-6 flex items-center justify-center"
                            onClick={() => handleImageDelete(editingRoom.id, idx)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                <DialogFooter>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {editingRoom ? 'Updating...' : 'Creating...'}
                      </>
                    ) : (
                      editingRoom ? 'Update Room' : 'Create Room'
                    )}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
      
      {loading ? (
        <div className="w-full h-64 flex justify-center items-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Capacity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rooms.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    No rooms found. Add your first room to get started.
                  </TableCell>
                </TableRow>
              ) : (
                rooms.map((room) => (
                  <TableRow key={room.id}>
                    <TableCell>
                      <div className="font-medium">{room.name}</div>
                      <div className="text-sm text-muted-foreground truncate max-w-[300px]">
                        {room.description}
                      </div>
                    </TableCell>
                    <TableCell>${room.price}</TableCell>
                    <TableCell>{room.capacity} guests</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${room.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {room.available ? 'Available' : 'Unavailable'}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleEdit(room)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="text-red-500 hover:text-red-600 hover:bg-red-50" 
                          onClick={() => handleDelete(room.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default RoomManagement;
