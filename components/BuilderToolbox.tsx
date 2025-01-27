import React from "react"
import { Button } from "@/components/ui/button"

const componentTypes = ["Heading", "Paragraph", "Image", "Button", "Form", "SocialMedia"]

export const BuilderToolbox = ({ onAddComponent }) => {
  return (
    <div className="space-y-2">
      {componentTypes.map((type) => (
        <Button key={type} onClick={() => onAddComponent(type)} className="w-full">
          Add {type}
        </Button>
      ))}
    </div>
  )
}

