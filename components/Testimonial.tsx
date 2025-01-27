import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Star } from "lucide-react"

interface TestimonialProps {
  name: string
  company: string
  image: string
  rating: number
  children: React.ReactNode
}

export function Testimonial({ name, company, image, rating, children }: TestimonialProps) {
  return (
    <Card className="bg-white/10 backdrop-blur-lg border-purple-500/50 text-gray-900 dark:text-white">
      <CardHeader className="flex flex-row items-center gap-4">
        <img src={image || "/placeholder.svg"} alt={name} className="w-16 h-16 rounded-full" />
        <div>
          <h3 className="font-semibold">{name}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">{company}</p>
        </div>
      </CardHeader>
      <CardContent>
        <p className="mb-4">{children}</p>
        <div className="flex">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star
              key={index}
              className={`w-5 h-5 ${
                index < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300 dark:text-gray-600"
              }`}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

