import GarbageBin from './GarbageBin'
import List from './List'
import NewItem from './NewItem'
import cn from 'classnames'
interface TodoListProps {}

function TodoList(props: TodoListProps) {
  return (
    <div
      className={cn(
        'w-1000 h-600 m-auto mt-100 p-10',
        'border-2 border-black',
        'flex justify-center items-start'
      )}
    >
      <div className='h-full flex-2  mr-10 overflow-auto'>
        <List></List>
      </div>

      <div className='h-full flex-1 flex flex-col justify-start'>
        <NewItem className={'mb-10'}></NewItem>
        <GarbageBin></GarbageBin>
      </div>
    </div>
  )
}

export default TodoList
