import { create, StateCreator } from 'zustand'
import { persist } from 'zustand/middleware'
export interface ListItem {
  id: string
  status: 'todo' | 'done'
  content: string
}

type State = {
  list: Array<ListItem>
}

type Actions = {
  addItem: (item: ListItem, id?: string) => void
  deleteItem: (id: string) => void
  updateItem: (item: ListItem) => void
}

const stateCreator: StateCreator<State & Actions> = set => ({
  list: [],
  addItem: (item, id) => {
    set(state => {
      if (!id) {
        return {
          list: [...state.list, item],
        }
      }

      const newList = [...state.list]

      const index = state.list.findIndex(listItem => listItem.id === id)

      newList.splice(index, 0, item)

      return {
        list: newList,
      }
    })
  },
  deleteItem: id => {
    set(state => {
      return {
        list: state.list.filter(item => item.id !== id),
      }
    })
  },
  updateItem: item => {
    set(state => {
      return {
        list: state.list.map(listItem =>
          listItem.id === item.id ? item : listItem
        ),
      }
    })
  },
})

export const useTodoListStore = create<State & Actions>()(
  persist(stateCreator, {
    name: 'todo-list',
  })
)
