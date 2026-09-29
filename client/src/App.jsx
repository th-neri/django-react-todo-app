import React, { useState } from 'react'

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

const App = () => {
    const [filterStatus, setFilterStatus] = useState('all');
    const [taskList, setTaskList] = useState(tasks);

    // function to change the active filter status
    const displayTasksByStatus = (status) => {
        setFilterStatus(tasks);
    }

    // filter tasks based on the selected status
    const filteredStatus = filterStatus == 'all' ? taskList : taskList.filter(task => task.status == filterStatus)

    const renderTabList = () => {
        return (
            <div className='my-5 tab-list'>
                <span onClick={() => setFilterStatus('pending')}
                    className={filterStatus == 'pending' ? 'active:cursor-pointer' : 'cursor-pointer'}>
                        Pending
                </span>
                <span onClick={() => setFilterStatus('completed')}
                    className={filterStatus == 'completed' ? 'active:cursor-pointer' : 'cursor-pointer'}>
                        Completed
                </span>
                <span onClick={() => setFilterStatus('failed')}
                    className={filterStatus == 'failed' ? 'active:cursor-pointer' : 'cursor-pointer'}>
                        Incompleted
                </span>
            </div>
        )
    }

    return (
        <div className='bg-amber-700'>
            a
        </div>
    )
}

export default App

