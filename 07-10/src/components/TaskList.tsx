import React from 'react';
import TaskItem from './TaskItem';
import type { Task } from '../types/task';

interface TaskListProps {
  tasks: Task[];
  onDeleteTask: (id: number) => void;
  onToggleComplete: (id: number) => void;
}

class TaskList extends React.Component<TaskListProps> {
  render() {
    const { tasks, onDeleteTask, onToggleComplete } = this.props;

    return (
      <ul>
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onDelete={onDeleteTask}
            onToggleComplete={onToggleComplete}
          />
        ))}
      </ul>
    );
  }
}

export default TaskList;