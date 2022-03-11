// import { useEffect } from 'react'
// import { CreateTodo } from './containers/create'
// import { TodoList } from './containers/list'

import { ReactNode, useState } from 'react'

const Modal = ({
  isOpen,
  children,
}: {
  isOpen: boolean
  children?: ReactNode
}) => {
  return (
    <div
      className={`max-w-sm mx-auto h-20 bg-cyan-300 rounded-t absolute bottom-0 left-0 right-0  ${
        isOpen ? 'animate-fade-out-down opacity-0' : ' animate-fade-in-up'
      }`}
    >
      {children}
    </div>
  )
}

const View = () => {
  const [isOpen, setisOpen] = useState(false)
  return (
    <div className="max-w-md mx-auto h-screen overflow-hidden pt-32 relative">
      <button onClick={() => setisOpen((prev) => !prev)}>Toggle</button>
      <Modal isOpen={isOpen}></Modal>
    </div>
  )
}

export default View
