import React, { useRef, useState } from "react"
import { useDrag, useDrop } from "react-dnd"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

const componentStyles = {
  Heading: "text-2xl font-bold mb-4",
  Paragraph: "mb-4",
  Image: "w-full h-48 bg-gray-200 flex items-center justify-center mb-4",
  Button: "px-4 py-2 bg-blue-500 text-white rounded",
  Form: "space-y-4 mb-4",
  SocialMedia: "flex space-x-2 mb-4",
}

export const BuilderComponent = ({ id, type, index, moveComponent, updateComponent, component }) => {
  const ref = useRef(null)
  const [isEditing, setIsEditing] = useState(false)

  const [, drop] = useDrop({
    accept: "component",
    hover(item: { index: number }, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index
      if (dragIndex === hoverIndex) {
        return
      }
      moveComponent(dragIndex, hoverIndex)
      item.index = hoverIndex
    },
  })

  const [{ isDragging }, drag] = useDrag({
    type: "component",
    item: { id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  drag(drop(ref))

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = () => {
    setIsEditing(false)
  }

  const renderComponent = () => {
    switch (type) {
      case "Heading":
        return isEditing ? (
          <Input
            value={component.content}
            onChange={(e) => updateComponent(id, { ...component, content: e.target.value })}
            className="mb-2"
          />
        ) : (
          <h2 className={componentStyles.Heading}>{component.content}</h2>
        )
      case "Paragraph":
        return isEditing ? (
          <Textarea
            value={component.content}
            onChange={(e) => updateComponent(id, { ...component, content: e.target.value })}
            className="mb-2"
          />
        ) : (
          <p className={componentStyles.Paragraph}>{component.content}</p>
        )
      case "Image":
        return isEditing ? (
          <Input
            value={component.src}
            onChange={(e) => updateComponent(id, { ...component, src: e.target.value })}
            placeholder="Enter image URL"
            className="mb-2"
          />
        ) : (
          <img src={component.src || "/placeholder.svg"} alt="User-defined" className={componentStyles.Image} />
        )
      case "Button":
        return isEditing ? (
          <Input
            value={component.content}
            onChange={(e) => updateComponent(id, { ...component, content: e.target.value })}
            className="mb-2"
          />
        ) : (
          <button className={componentStyles.Button}>{component.content}</button>
        )
      case "Form":
        return (
          <form className={componentStyles.Form}>
            <Input placeholder="Name" />
            <Input placeholder="Email" type="email" />
            <Textarea placeholder="Message" />
            <Button type="submit">Submit</Button>
          </form>
        )
      case "SocialMedia":
        return (
          <div className={componentStyles.SocialMedia}>
            <Button variant="outline">Facebook</Button>
            <Button variant="outline">Twitter</Button>
            <Button variant="outline">Instagram</Button>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div ref={ref} style={{ opacity: isDragging ? 0.5 : 1 }} className="mb-4 cursor-move">
      {renderComponent()}
      {!isEditing && (
        <Button variant="outline" size="sm" onClick={handleEdit} className="mt-2">
          Edit
        </Button>
      )}
      {isEditing && (
        <Button variant="outline" size="sm" onClick={handleSave} className="mt-2">
          Save
        </Button>
      )}
    </div>
  )
}

