import cn from 'classnames'
import { useEffect, useRef } from 'react'
import { useDrag } from 'react-dnd'
import { ListItem } from '../store'

interface NewItemProps {
  className?: string | string[]
}

function NewItem(props: NewItemProps) {
  const ref = useRef<HTMLDivElement>(null)

  const [{ dragging }, drag] = useDrag<
    ListItem,
    unknown,
    { dragging: boolean }
  >({
    type: 'new-item',
    item: {
      id: Math.random().toString().slice(2, 8),
      status: 'todo',
      content: '新的待办事项',
    },
    collect(monitor) {
      return {
        dragging: monitor.isDragging(),
      }
    },
  })

  useEffect(() => {
    drag(ref)
  })

  const className = cn(
    'h-200 border-2 border-black',
    'leading-100 text-center text-2xl',
    'bg-green-300',
    'cursor-grab select-none',
    dragging ? 'border-dashed bg-white' : '',
    props.className
  )

  return (
    <div className={className} ref={ref}>
      新的待办事项
    </div>
  )
}

export default NewItem
