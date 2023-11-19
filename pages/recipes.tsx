import Page from '@/components/page'
import Section from '@/components/section'
import { useEffect, useState } from 'react'
import { Task } from '@/components/AddComponent/AddComonent'
import List from '@mui/material/List';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import DeleteIcon from '@mui/icons-material/Delete';
import ListItemText from '@mui/material/ListItemText';

const Recipes = () => {
	const [taskList, setTaskList] = useState<Array<Task>>([]);
	useEffect(() => {
		const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
		setTaskList(tasks);
	}, [])
	const handleDelete = (id:string) =>{
		let newTaskList = [...taskList];
		for (let i = 0; i < taskList.length; i++) {
            if (taskList[i].id === id) {
               newTaskList = taskList.splice(i,1);
                break;
            }
        }
        localStorage.setItem("tasks", JSON.stringify(taskList));
        setTaskList([...taskList]);
	}
	return (
		<Page>
			<Section>
				<List dense={true}>
					{taskList.map(task => {
						if (task.isArchived )
							return (
								<>
									<ListItem
										secondaryAction={
											<IconButton edge="end" aria-label="delete" onClick={()=>{handleDelete(task.id)}}>
												<DeleteIcon />
											</IconButton>
										}
									>

										<ListItemText
											primary={task.title}
										/>
									</ListItem>

								</>
							)
					})}
				</List>

			</Section>
		</Page>
	)
}

export default Recipes




