function addNewTask() {

      let taskName = document.getElementById('newTaskValue').value;

      if (!taskName) {
            alert('Please Enter a Task Name!');
      }

      else {
            
      let taskList = document.getElementById('allTask');

      let newTask = document.createElement('div');
      newTask.classList.add("taskDetailsBox", "task");
      newTask.innerHTML = `<h3 id="${taskName}" class="task-name">${taskName}</h3>
                              <div class="task-info">
                                    <div class="timer" id="${taskName}">00:00:00</div>
                                          <div class="controls">
                                                <button class="btn start-btn">Start</button>
                                                <button class="btn stop-btn">Pause</button>
                                                <button class="btn reset-btn">Reset</button>
                                          </div>
                                    </div>
                              </div>`
      taskList.appendChild(newTask);
      document.getElementById('newTaskValue').value = ''
      singleTaskAdded(newTask)
      }
}

function singleTaskAdded(singleTask) {
      let timeBox = singleTask.querySelector(".timer");
      let isRunning = false;
      let startTime = 0;
      let elapsedTime = 0;
      let intervalId;

      singleTask.querySelector('.start-btn').addEventListener('click', (e) => {
            if (!isRunning) {
                  // Start the timer if not already running
                  startTime = Date.now() - elapsedTime;
                  intervalId = setInterval(() => {
                        elapsedTime = Date.now() - startTime;
                        timeBox.textContent = formatTime(elapsedTime);
                  }, 1000);
                  isRunning = true;
                  e.target.innerText = 'Resume'
            }
      });

      
      singleTask.querySelector('.stop-btn')?.addEventListener('click', () => {
            clearInterval(intervalId);
            isRunning = false;
            singleTask.querySelector('.start-btn').innerText = 'Resume'
      });

      singleTask.querySelector('.reset-btn')?.addEventListener('click', () => {
            clearInterval(intervalId);
            isRunning = false;
            elapsedTime = 0;
            timeBox.textContent = formatTime(elapsedTime);
            singleTask.querySelector('.start-btn').innerText = 'Start'
      });
}

// For Demo Task
document.querySelectorAll('.taskDetailsBox').forEach(singleTask => {
      singleTaskAdded(singleTask)
});


function formatTime(milliseconds) {
      const totalSeconds = Math.floor(milliseconds / 1000);
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      // Format hours, minutes, and seconds
      return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}
