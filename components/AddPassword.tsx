"use client"



import { Card, CardContent,  CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { addPasswordServer } from "@/actions/actions"
import { useUser } from "@clerk/nextjs"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"

const formSchema = z.object({
  website: z.string()
    .min(3, { message: "Website name must be at least 3 characters." })
    .max(50, { message: "Website name cannot exceed 50 characters." }),

  username: z.string()
    .min(4, { message: "Username must be at least 4 characters." })
    .max(20, { message: "Username cannot exceed 20 characters." })
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: "Username can only contain letters and spaces."
    }),

  password: z.string()
    .min(8, { message: "Password must be at least 4characters." })
    .max(64, { message: "Password cannot exceed 50 characters." })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/, {
      message: "Password must contain at least one uppercase letter, one lowercase letter, and one number and special character."
    }),
});







export function AddPassword() {
 
  const user=useUser()
  const router =useRouter()


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      website: "",
      username: "",
      password: ""


    },
  })

 



  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
    if (user.user){
    addPasswordServer(values.website,values.username,values.password,user?.user?.id)
   toast.success("Password Added !")
   form.reset()
   router.refresh()
    }
  }




return (
  <Card>
    <CardHeader>
      <CardTitle>Add New Password</CardTitle>
    </CardHeader>
    <CardContent>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Website</FormLabel>
                <FormControl>
                  <Input placeholder="this is your website" {...field} />
                </FormControl>
                <FormDescription>
                  This is your website URL
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="johndoe@example.com" {...field} />
                </FormControl>
                <FormDescription>
                  This is your username
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}

          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormDescription>
                  This is your password
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />


          <Button type="submit">Add a Password</Button>
        </form>
      </Form>

    </CardContent>
  
  </Card>
)
}



