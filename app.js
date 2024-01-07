const readline = require('readline-sync');
const fs = require('fs');

const todoFile = 'todos.txt';

function showMenu() {
  console.log('\nTodo List App');
  console.log('1. Show Tasks');
  console.log('2. Add Task');
  console.log('3. Complete Task');
  console.log('4. Quit');
}

function showTasks() {
  const tasks = getTasks();
  if (tasks.length === 0) {
    console.log('No tasks found.');
  } else {
    console.log('\nTasks:');
    tasks.forEach((task, index) => {
      console.log(`${index + 1}. ${task}`);
    });
  }
}

function addTask() {
  const newTask = readline.question('Enter the new task: ');
  const tasks = getTasks();
  tasks.push(newTask);
  saveTasks(tasks);
  console.log('Task added successfully!');
}

function completeTask() {
  const tasks = getTasks();
  if (tasks.length === 0) {
    console.log('No tasks to complete.');
  } else {
    showTasks();
    const taskIndex = readline.questionInt('Enter the task number to mark as complete: ') - 1;
    if (taskIndex >= 0 && taskIndex < tasks.length) {
      tasks.splice(taskIndex, 1);
      saveTasks(tasks);
      console.log('Task marked as complete!');
    } else {
      console.log('Invalid task number.');
    }
  }
}

function getTasks() {
  try {
    const data = fs.readFileSync(todoFile, 'utf8');
    return data.split('\n').filter(task => task.trim() !== '');
  } catch (error) {
    return [];
  }
}

function saveTasks(tasks) {
  const data = tasks.join('\n');
  fs.writeFileSync(todoFile, data);
}

function main() {
  let choice = 0;

  while (choice !== 4) {
    showMenu();
    choice = readline.questionInt('\nEnter your choice: ');

    switch (choice) {
      case 1:
        showTasks();
        break;
      case 2:
        addTask();
        break;
      case 3:
        completeTask();
        break;
      case 4:
        console.log('Exiting Todo List App. Goodbye!');
        break;
      default:
        console.log('Invalid choice. Please choose a valid option.');
    }
  }
}

main();
