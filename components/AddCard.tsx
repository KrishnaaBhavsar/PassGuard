"use client"



import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
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
import { addCardServer } from "@/actions/actions"
import { useUser } from "@clerk/nextjs"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"

const formSchema = z.object({
  cardNumber: z.string()
    .min(16, { message: "Card number must be 16 digits." })
    .max(16, { message: "Card number must be 16 digits." })
    .regex(/^\d+$/, {
      message: "Card number must contain only digits."

    }),

  cardName: z.string()
    .min(2, { message: "Cardholder name must be at least 2 characters." })
    .regex(/^[a-zA-Z\s]+$/, {
      message: "Name can only contain letters and spaces."
    }),

  expiryDate: z.string()
    .regex(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, {
      message: "Expiry date must be in MM/YY format."
    }),

  cvv: z.coerce.number().min(100, {
    message: "CVV mst be atleast 3 digits."
  }).max(9999, {
    message: "CVV cannot exceed 4 digits"
  })

});







export function AddCard() {

  const user = useUser()
  const router = useRouter()


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cardNumber: "",
      cardName: "",
      expiryDate: "",
      cvv: 0

    },
  })





  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
    if (user.user) {
      addCardServer(values.cardNumber, values.cardName, values.expiryDate, values.cvv, user?.user?.id)
      toast.success("Card Added !")
      form.reset()
      router.refresh()
    }
  }




  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Card</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="cardNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Card Number</FormLabel>
                  <FormControl>
                    <Input placeholder="**** **** **** 1234" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your card number
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cardName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Card Name</FormLabel>
                  <FormControl>
                    <Input placeholder="john Doe " {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your card name
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-row space-x-4">
              <FormField
                control={form.control}
                name="expiryDate"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Expiry Date</FormLabel>
                    <FormControl>
                      <Input placeholder="MM/YY" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your card expiry date
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cvv"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel> cvv</FormLabel>
                    <FormControl>
                      <Input placeholder="123 " {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your card cvv
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>


            <Button type="submit">Add a Card</Button>
          </form>
        </Form>

      </CardContent>

    </Card>
  )
}



