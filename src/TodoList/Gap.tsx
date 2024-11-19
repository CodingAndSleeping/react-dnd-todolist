import cn from 'classnames'
import { useEffect, useRef } from 'react'
import { useDrop } from 'react-dnd'
import { ListItem, useTodoListStore } from '../store'

interface GapProps {
  className?: string
  id?: string
}
function Gap(props: GapProps) {
  const addItem = useTodoListStore(state => state.addItem)

  const ref = useRef<HTMLDivElement>(null)
  const [{ hoverd }, drop] = useDrop<ListItem, void, { hoverd: boolean }>({
    accept: 'new-item',
    drop(item) {
      addItem(item, props.id)
    },
    collect(monitor) {
      return {
        hoverd: monitor.isOver(),
      }
    },
  })

  useEffect(() => {
    drop(ref)
  }, [])

  const classname = cn('h-20', hoverd ? 'bg-red-400' : '', props.className)

  return <div className={classname} ref={ref}></div>
}

export default Gap
