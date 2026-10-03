import React, { useEffect, useState } from 'react'
import { IoMdCloseCircleOutline } from "react-icons/io";


const Modal = ({ activeItem, toggle, onSave }) => {
  const [item, setItem] = useState(activeItem);

  // update if the activeItem changes
  useEffect(() => {
    setItem(activeItem);
  }, [activeItem])

  // handle input field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem({ ...item, [name]: value });
  };

  return (
    <div className='fixed inset-0 bg-black/50 w-full h-screen bg-opacity-50 flex items-center justify-center'>
      <div className='bg-white w-full max-w-lg rounded-lg p-6 shadow-xl'>
        <div className='flex items-center justify-end'>
          <IoMdCloseCircleOutline onClick={toggle} className='text-red-500 hover:text-red-600 text-5xl font-bold cursor-pointer'/>
        </div>
        <div className='flex flex-col justify-center items-center mb-4 gap-3'>
          <h1 className='font-bold text-3xl text-gray-600'>
            {item.id ? 'Edit task' : 'Create task'}
          </h1>

          {/* form fields */}
          <div className='w-full space-y-4'>
            <div>
              <label className='w-full block text-lg font-medium text-gray-700 mb-1'>Title</label>
              <input
                type="text"
                name='title'
                value={item.title || ''}
                onChange={handleChange}
                placeholder='Enter task title'
                className='w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-amber-500' />
            </div>
            <div>
              <label className='block text-lg font-medium text-gray-700 mb-1'>Description</label>
              <textarea
                name='description'
                value={item.description || ''}
                onChange={handleChange}
                placeholder='Enter task descripion'
                rows='3'
                className='w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-amber-500' />
            </div>
            <div>
              <label className='block text-lg font-medium text-gray-700 mb-1'>Due Date</label>
              <input
                type='date'
                name='due_date'
                value={item.due_date || ''}
                onChange={handleChange}
                placeholder='Enter due date'
                className='w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-amber-500'/>
            </div>
            <div>
              <label className='block text-lg font-medium text-gray-700 mb-1'>Status</label>
              <select
                name='status'
                value={item.status || 'pending'}
                onChange={handleChange}
                placeholder='Enter task title'
                className='w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-amber-500'
              >
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="incompleted">Incompleted</option>
              </select>
            </div>
          </div>

          {/* modal save option */}
          <div className='flex justify-end space-x-3 mt-6'>
            <button onClick={() => onSave(item)} className='bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md font-medium transition-colors cursor-pointer'>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal
