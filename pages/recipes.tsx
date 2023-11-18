import Page from '@/components/page'
import Section from '@/components/section'
import { useEffect, useState } from 'react'
import { Task } from '@/components/AddComponent/AddComonent'

const Recipes = () => {
	const [taskList, setTaskList] = useState<Array<Task>>([]);
	useEffect(() => {
		const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
		setTaskList(tasks);
	}, [])

	return (
		<Page>
			<Section>
				{taskList.map(task => {
					if (task.isArchived && task.isCompleted)
						return (
							<><div className='flex'>
								<div>{task.title}</div>
								<div>{task.points}</div>
							</div>
							</>
						)
				})}
			</Section>
		</Page>
	)
}

export default Recipes


