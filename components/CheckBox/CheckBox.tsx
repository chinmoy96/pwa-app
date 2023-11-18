import { useState } from 'react'
import styles from './CheckBox.module.css'

type CheckboxProps = {
    id: string
    label: string,
    isCompleted: boolean,
    point: number,
    handleClick: (id: string, isChecked: boolean) => void,
    handleDelete: (id: string) => void,
}

const Checkbox = ({ id, point, label, isCompleted, handleClick,handleDelete }: CheckboxProps) => {
    const [isChecked, setIsChecked] = useState(isCompleted);

    return (
        <div className={styles['main']}>
            <label className={styles['form-control']}>
                <div className={styles['container']}>
                    <input className={styles['input']}
                        type="checkbox" name="checkbox"
                        checked={isChecked}
                        onChange={(e) => { handleClick(id, !isChecked); setIsChecked(!isChecked) }}
                    />

                    <span className={isChecked ? styles['strike'] : ""}>{label}</span>
                </div>


            </label>
            <div className={styles.delete}>
                
                <div>
                    
                    <img className={styles.img} src='delete.png' onClick={() => { handleDelete(id) }} />
                </div>
            </div>
        </div>

    )
}

export default Checkbox

