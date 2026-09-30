import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const tasks = [
    {
        id: 1,
        title: 'make eggs',
        description: 'eggs',
        status: 'pending'
    },
    {
        id: 2,
        title: 'make dinner',
        description: 'dinner',
        status: 'pending'
    },
    {
        id: 3,
        title: 'do bed',
        description: 'bed',
        status: 'completed'
    },
    {
        id: 4,
        title: 'do tasks',
        description: 'tasks',
        status: 'failed'
    }
]

const Home = () => {
    const navigate = useNavigate();
    const [filterStatus, setFilterStatus] = useState('all');
    const [taskList, setTaskList] = useState(tasks);

    // filter tasks based on the selected status
    const filteredStatus = filterStatus == 'all' ? taskList : taskList.filter(task => task.status == filterStatus)

    const renderTabList = () => {
        return (
            <div className='flex gap-3 mt-6'>
                {/* all status */}
                <span onClick={() => setFilterStatus('all')}
                    className={`px-4 py-2 rounded text-sm font-semibold transition colors cursor-pointer ${filterStatus == 'all' 
                    ? 'bg-gray-400 text-white' 
                    : 'bg-black text-white'}`}>
                    All
                </span> 
                {/* pending status */}
                <span onClick={() => setFilterStatus('pending')}
                    className={`px-4 py-2 rounded text-sm font-semibold transition colors cursor-pointer ${filterStatus == 'pending' 
                    ? 'bg-gray-400 text-white' 
                    : 'bg-amber-500 hover:bg-amber-600 text-white'}`}>
                    Pending
                </span> 
                {/* completed status */}
                <span onClick={() => setFilterStatus('completed')}
                    className={`px-4 py-2 rounded text-sm font-semibold transition colors cursor-pointer ${filterStatus == 'completed' 
                    ? 'bg-gray-400 text-white' 
                    : 'bg-green-500 hover:bg-green-600 text-white'}`}>
                    Completed
                </span> 
                {/* incompleted status */}
                <span onClick={() => setFilterStatus('incompleted')}
                    className={`px-4 py-2 rounded text-sm font-semibold transition colors cursor-pointer ${filterStatus == 'incompleted' 
                    ? 'bg-gray-400 text-white' 
                    : 'bg-red-500 hover:bg-red-600 text-white'}`}>
                    Incompleted
                </span> 
            </div>
        )
    }

    const renderItems = () => {
        if (filteredStatus.length == 0) {
            return (
                <p className='text-center text-gray-500 text-bold py-4'>No tasks found.</p>
            )
        }

        return filteredStatus.map(item =>  (
            <li key={item.id} className='flex items-center justify-between py-4'>
                <span className={`font-medium text-gray-800 mr-2`} title={item.title}>
                    {item.title}
                </span>
                <span className='flex space-x-2'>
                    <button className='bg-sky-500 hover:bg-sky-600 text-white px-3 py-1 text-sm rounded transition-colors cursor-pointer'>
                        Edit
                    </button>
                    <button className='bg-red-500 hover:bg-red-600 text-white px-3 py-1 text-sm rounded transition-colors cursor-pointer'>
                        Delete
                    </button>
                </span>
            </li>
        ))
    }

    return (
        <div className='max-w-xl mx-auto my-12 px-4'>
            <div className='text-black text-center uppercase font-bold text-2xl my-4'>Task Manager</div>
            <div className='flex justify-center'>
                <div className='w-full bg-white border border-gray-200 rounded-lg p-4 shadow-sm'>
                    <div className='mb-3'>
                        <button className='bg-amber-500 hover:bg-amber-600 text-white py-3 px-6 rounded-2xl font-medium transition-colors cursor-pointer'>
                            Add task
                        </button>
                        {renderTabList()}
                        <ul className='divide-y divide-gray-300'>
                            {renderItems()}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home


