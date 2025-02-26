import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CreditCard } from "lucide-react"




interface CardProps{
    cardNo:string,
    cardName:string,
    expiry:string,
    cvv:number
}
export function YourCards({cards}:{cards:CardProps[]}) {
  

  return (
    <div className="space-y-4 h-40 overflow-y-auto">
      {cards.length===0 && "No cards added"}
      {cards.map((card : CardProps) => (
        <Card key={card.cardNo}>
          <CardHeader className="flex flex-row items-center space-x-4 pb-2">
            <CreditCard className="h-6 w-6 text-primary" />
            <div>
              <CardTitle>{card.cardName}</CardTitle>
              <CardDescription>{card.cardNo}</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Expires: {card.expiry}</p>
            <p className="text-sm text-muted-foreground">Cvv:{card.cvv}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

