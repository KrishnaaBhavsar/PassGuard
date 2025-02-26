import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card"
import { Lock } from "lucide-react"
import Link from 'next/link'
interface Password{
  website:string,
  username: string,
  password:string
}

export function YourPasswords({passwords}:{passwords:Password[]}) {
  // const passwords = [
  //   { id: 1, website: "example.com", username: "johndoe@example.com" },
  //   { id: 2, website: "anothersite.com", username: "janesmith@example.com" },
  // ]

  return (
    <div className="space-y-4 h-40 overflow-y-auto">
      {passwords.length===0 && "No passwords added"}
      {passwords.map((password,index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center space-x-4 pb-2">
            <Lock className="h-6 w-6  text-primary" />
            <div>
             <Link href={password.website} target="_blank">
             <div className="font-semibold cursor-pointer text-blue-600 underline ">{password.website}</div>
             </Link>
      
              <CardDescription>{password.username}</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Password: {[password.password]}</p>
            
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

