import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import styles from './AddComponent.module.css'
import Checkbox from '../CheckBox/CheckBox';

export type Task = {
    id: string,
    title: string,
    isCompleted: boolean,
    isArchived:boolean,
    points: number
}

const Add = () => {
    const [taskName, setTaskName] = useState("");
    const [taskList, setTaskList] = useState<Array<Task>>([]);
    const [myPoints,setMyPoints] = useState(0)
    const [point, setPoint] = useState(0);
    useEffect(() => {
        const tasks= JSON.parse(localStorage.getItem("tasks")|| "[]");
        let sum=0;
        setTaskList(tasks);
        console.log(tasks)
        for(let i=0;i<tasks.length;i++){
            if(tasks[i].isCompleted){
                sum+=tasks[i].points;
            }
        }
        const onLocalStorageChange =() => {
            console.log("Change to local storage!");
            sum=0;
            for(let i=0;i<tasks.length;i++){
                if(tasks[i].isCompleted){
                    sum+=tasks[i].points;
                }
            }
            setMyPoints(sum);
            // ...
        }
        window.addEventListener('storage', onLocalStorageChange)
        setMyPoints(sum);
        return(()=>{
            window.removeEventListener('storage',onLocalStorageChange);
        })
    }, [])
    const addTask = () => {
        if (taskName === '') {
            return
        }
        taskList.push({
            id: uuidv4(),
            title: taskName,
            isCompleted: false,
            points: point,
            isArchived:false
        });
        localStorage.setItem("tasks", JSON.stringify(taskList));
        setTaskName('');
    }
    const handleClick = (id: string, isCompleted: boolean) => {
        for (let i = 0; i < taskList.length; i++) {
            if (taskList[i].id === id) {
                taskList[i].isCompleted = isCompleted;
                break;
            }
        }
        localStorage.setItem("tasks", JSON.stringify(taskList));
        window.dispatchEvent(new Event("storage"));
    }
    const handleDelete = (id: string)=>{
        for (let i = 0; i < taskList.length; i++) {
            if (taskList[i].id === id) {
                taskList[i].isArchived = true;
                break;
            }
        }
        localStorage.setItem("tasks", JSON.stringify(taskList));
        setTaskList([...taskList]);
    }

    return (
        <>
            <h2 className='text-xl font-semibold'>What do you want to do today</h2>
            <div className={`relative z-0 ${styles.input}`}>
                <input value={taskName} onChange={(e) => { setTaskName(e.target.value) }} type="text" id="floating_standard" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                <label htmlFor="floating_standard" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Floating standard</label>
            </div>
            <div>
                <ul className="items-center w-full text-sm font-medium text-gray-900 rounded-lg flex">
                    <li className="w-full">
                        <div className="flex items-center ps-3">
                            <input id="horizontal-list-radio-license" onChange={(e) => { setPoint(Number(e.target.value)) }} type="radio" value="0" checked={point === 0} name="list-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                            <label htmlFor="horizontal-list-radio-license" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">0</label>
                        </div>
                    </li>
                    <li className="w-full">
                        <div className="flex items-center ps-3">
                            <input id="horizontal-list-radio-id" type="radio" onChange={(e) => { setPoint(Number(e.target.value)) }} value="1" checked={point === 1} name="list-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                            <label htmlFor="horizontal-list-radio-id" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">1</label>
                        </div>
                    </li>
                    <li className="w-full ">
                        <div className="flex items-center ps-3">
                            <input id="horizontal-list-radio-military" type="radio" onChange={(e) => { setPoint(Number(e.target.value)) }} value="2" checked={point === 2} name="list-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                            <label htmlFor="horizontal-list-radio-military" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">2</label>
                        </div>
                    </li>
                    <li className="w-full dark:border-gray-600">
                        <div className="flex items-center ps-3">
                            <input id="horizontal-list-radio-passport" type="radio" onChange={(e) => { setPoint(Number(e.target.value)) }} value="3" checked={point === 3} name="list-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                            <label htmlFor="horizontal-list-radio-passport" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">3</label>
                        </div>
                    </li>
                </ul>
            </div>
            <div className={styles.buttonWrap}>
                <button onClick={addTask} className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
                    Add task
                </button>
            </div>
            <h5 className={styles.points}>total points done till today {myPoints}</h5>
            <div className={styles.tasklist}>
                {taskList.map((task) => {
                    return (!task.isArchived?(
                        <Checkbox
                        key={task.id}
                            id={task.id}
                            handleClick={handleClick}
                            handleDelete={handleDelete}
                            point={task.points}
                            label={task.title}
                            isCompleted={task.isCompleted} />
                    ):null)
                })}

            </div>
        </>
    )
}

export default Add

