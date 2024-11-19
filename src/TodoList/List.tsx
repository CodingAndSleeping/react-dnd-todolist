import cn from 'classnames'

import Item from './Item'
import Gap from './Gap'
import { useTodoListStore } from '../store/index'
import { useTransition, animated } from '@react-spring/web'

interface ListProps {
  className?: string | string[]
}

function List(props: ListProps) {
  const listData = useTodoListStore(state => state.list)

  const transitions = useTransition(listData, {
    from: { transform: 'translate3d(100%,0,0)', opacity: 0 },
    enter: { transform: 'translate3d(0%,0,0)', opacity: 1 },
    leave: { transform: 'translate3d(-100%,0,0)', opacity: 0 },
    keys: listData.map(item => item.id),
  })

  const className = cn(
    'h-full w-full border-2 border-black pt-10 px-10 overflow-auto',
    props.className
  )

  return (
    <div className={className}>
      {listData.length ? (
        transitions((style, item) => {
          return (
            <animated.div style={style}>
              <Gap id={item.id} />
              <Item key={item.id} data={item} />
            </animated.div>
          )
        })
      ) : (
        <p className='text-center leading-10'>暂无待办事项</p>
      )}

      <Gap className='h-full' />
    </div>
  )
}

export default List
