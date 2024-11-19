import cs from 'classnames'
import { useEffect, useRef } from 'react'
import { useDrop } from 'react-dnd'
import { ListItem, useTodoListStore } from '../store'

interface GarbageBinProps {
  className?: string | string[]
}

function GarbageBin(props: GarbageBinProps) {
  const deleteItem = useTodoListStore(state => state.deleteItem)

  const ref = useRef<HTMLDivElement>(null)

  const [{ hovered }, drop] = useDrop<ListItem, void, { hovered: boolean }>({
    accept: 'list-item',
    drop(item) {
      deleteItem(item.id)
    },
    collect(monitor) {
      return {
        hovered: monitor.isOver(),
      }
    },
  })

  useEffect(() => {
    drop(ref)
  }, [])

  const className = cs(
    'flex-1 border-2 border-black',
    'bg-orange-300',
    'leading-200 text-center text-2xl',
    'cursor-move select-none',
    hovered ? 'bg-yellow-400 border-dashed' : '',
    props.className
  )

  return (
    <div className={className} ref={ref}>
      垃圾箱
    </div>
  )
}

export default GarbageBin
