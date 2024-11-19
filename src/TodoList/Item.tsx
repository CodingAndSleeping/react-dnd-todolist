import { useEffect, useRef, useState } from 'react'
import { useDrag } from 'react-dnd'
import cn from 'classnames'

import { ListItem, useTodoListStore } from '../store'

interface ItemProps {
  className?: string
  data: ListItem
}

function Item(props: ItemProps) {
  const { data } = props

  const [editing, setEditing] = useState(false)

  const [editingContent, setEditingContent] = useState(data.content)
  const updateItem = useTodoListStore(state => state.updateItem)

  const ref = useRef<HTMLDivElement>(null)

  const [{ dragging }, drag] = useDrag<
    ListItem,
    unknown,
    { dragging: boolean }
  >({
    type: 'list-item',
    item: {
      id: data.id,
      status: data.status,
      content: data.content,
    },
    collect(monitor) {
      return {
        dragging: monitor.isDragging(),
      }
    },
  })

  useEffect(() => {
    drag(ref)
  }, [])

  const classname = cn(
    'h-100  border-2 border-black bg-blue-300  p-10',
    'flex justify-start items-center',
    'text-xl tracking-wide',
    dragging ? 'bg-white border-dashed' : '',
    props.className
  )

  return (
    <div className={classname} ref={ref} onDoubleClick={() => setEditing(true)}>
      <input
        type='checkbox'
        className='w-40 h-40 mr-10'
        checked={data.status === 'done'}
        onChange={e => {
          updateItem({
            ...data,
            status: e.target.checked ? 'done' : 'todo',
          })
        }}
      ></input>
      <p>
        {editing ? (
          <input
            value={editingContent}
            onChange={e => setEditingContent(e.target.value)}
            onBlur={() => {
              setEditing(false)
              updateItem({
                ...data,
                content: editingContent,
              })
            }}
          ></input>
        ) : (
          data.content
        )}
      </p>
    </div>
  )
}

export default Item
