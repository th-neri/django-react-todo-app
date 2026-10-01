import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Modal from './Modal';


const Home = () => {
    const navigate = useNavigate();
    const [filterStatus, setFilterStatus] = useState('all');
    const [taskList, setTaskList] = useState([]);
    const [modal, setModal] = useState(false);
    const [activeItem, setActiveItem] = useState({ 'title': '', 'description': '', 'status': 'pending' });

    useEffect(() => {
        refreshList();
    }, [])

    // fetch tasks from the django api endpoint
    const refreshList = () => {
        axios
            .get('http://127.0.0.1:8000/todo/tasks/')
            .then(response => {
                const data = Array.isArray(response.data)
                    ? response.data
                    : (response.data.results || [])
                setTaskList(data);
            })
            .catch(error => console.log(error)); // to catch errors that might occur
    };

    // filter tasks based on the selected status
    const filteredStatus = filterStatus == 'all' ? taskList : taskList.filter(task => task.status == filterStatus)

    // toggle modal visibility
    const toggle = () => {
        setModal(!modal);
    };

    // handle submit/save action
    const handleSubmit = (item) => {
        // to close the modal the moment i click save
        toggle();
        if (item.id) {
            // to update existing task
            axios
                .put(`http://127.0.0.1:8000/todo/tasks/${item.id}/`, item)
                .then(response => refreshList())
                .catch(error => console.log(error));
            return
        }
        // to create a new task
        axios
            .post('http://127.0.0.1:8000/todo/tasks/', item)
            .then(response => refreshList())
            .catch(error => console.log(error));
    };

    // handle delete action
    const handleDelete = (item) => {
        axios
            .delete(`http://127.0.0.1:8000/todo/tasks/${item.id}/`)
            .then(response => refreshList())
            .catch(error => console.log(error));
    };

    // open model to create a new item
    const createItem = () => {
        const newItem = { 'title': '', 'description': '', 'status': 'pending' };
        setActiveItem(newItem);
        setModal(true);
    };

    // open modal to edit an existing item
    const editItem = (item) => {
        setActiveItem(item);
        setModal(true);
    };

    const renderTabList = () => {
        return (
            <div className='flex gap-3 mt-6'>
                {/* all status */}
                <span onClick={() => setFilterStatus('all')}
                    className={`px-4 py-2 rounded text-sm font-semibold transition colors cursor-pointer ${filterStatus == 'all'
                        ? 'bg-gray-500 hover:bg-gray-600 text-white'
                        : 'bg-black text-white'}`}>
                    All
                </span>
                {/* pending status */}
                <span onClick={() => setFilterStatus('pending')}
                    className={`px-4 py-2 rounded text-sm font-semibold transition colors cursor-pointer ${filterStatus == 'pending'
                        ? 'bg-gray-500 hover:bg-gray-600 text-white'
                        : 'bg-amber-500 hover:bg-amber-600 text-white'}`}>
                    Pending
                </span>
                {/* completed status */}
                <span onClick={() => setFilterStatus('completed')}
                    className={`px-4 py-2 rounded text-sm font-semibold transition colors cursor-pointer ${filterStatus == 'completed'
                        ? 'bg-gray-500 hover:bg-gray-600 text-white'
                        : 'bg-green-500 hover:bg-green-600 text-white'}`}>
                    Completed
                </span>
                {/* incompleted status */}
                <span onClick={() => setFilterStatus('incompleted')}
                    className={`px-4 py-2 rounded text-sm font-semibold transition colors cursor-pointer ${filterStatus == 'incompleted'
                        ? 'bg-gray-500 hover:bg-gray-600 text-white'
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

        return filteredStatus.map(item => (
            <li key={item.id} className='flex items-center justify-between py-4'>
                <span className={`font-medium text-gray-800 mr-2`} title={item.title}>
                    {item.title}
                </span>
                <span className='flex space-x-2'>
                    <button onClick={() => editItem(item)} className='bg-sky-500 hover:bg-sky-600 text-white px-3 py-1 text-sm rounded transition-colors cursor-pointer'>
                        Edit
                    </button>
                    <button onClick={() => handleDelete(item)} className='bg-red-500 hover:bg-red-600 text-white px-3 py-1 text-sm rounded transition-colors cursor-pointer'>
                        Delete
                    </button>
                </span>
            </li>
        ))
    }

    return (
        <div className='w-full min-h-screen bg-sky-600 flex flex-col items-center py-6'>
            <div className='text-white text-center uppercase font-bold text-4xl my-4'>Task Manager</div>
            <div className='w-full max-w-2xl flex justify-center'>
                <div className='w-full bg-white border border-gray-200 rounded-lg p-4 shadow-sm'>
                    <div className='mb-3'>
                        <button onClick={createItem} className='bg-amber-500 hover:bg-amber-600 text-white py-3 px-6 rounded-full font-medium transition-colors cursor-pointer'>
                            Add task
                        </button>
                        {renderTabList()}
                        <ul className='divide-y divide-gray-300'>
                            {renderItems()}
                        </ul>
                    </div>
                </div>
            </div>

            {/* modal component whenever the modal state is true */}
            {modal && (
                <Modal
                    activeItem={activeItem}
                    toggle={toggle}
                    onSave={handleSubmit} />
            )}
        </div>
    )
}

export default Home


