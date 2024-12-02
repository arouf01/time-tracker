
function addNewTask() {
      let taskName = document.getElementById('newTaskValue').value;
      let taskList = document.getElementById('allTask');
      
      let newTask = document.createElement('div');
      newTask.innerHTML = `<div class="task">
                              <h3 id="${taskName}" class="task-name">${taskName}</h3>
                              <div class="task-info">
                                    <div class="timer" id="${taskName}">00:00:00</div>
                                          <div class="controls">
                                                <button id="startBtn" class="btn start-btn">Start</button>
                                                <button id="stopBtn" class="btn stop-btn">Stop</button>
                                                <button id="resetBtn" class="btn reset-btn">Reset</button>
                                    </div>
                              </div>
                        </div>`
      taskList.appendChild(newTask);
      document.getElementById('newTaskValue').value = ''
}

let timerElement = document.getElementById('timer');

let startTime = 0;
let elapsedTime = 0;
let intervalId;
let isRunning = false;

document.getElementById('startBtn').addEventListener('click', startTimeF);
document.getElementById('stopBtn').addEventListener('click', stopTimerF);
document.getElementById('resetBtn').addEventListener('click', resetTimerF);

function startTimeF() {
      if (isRunning) {
            return;
      } else{
      isRunning = true;
      startTime = Date.now() - elapsedTime;
      intervalId = setInterval(function () {
                  elapsedTime = Date.now() - startTime;
                  timerElement.textContent = formatTime(elapsedTime);
            }, 1000);
            console.log(intervalId, timerElement, startTime, elapsedTime)
      }
}

function formatTime(milliseconds) {
      const totalSeconds = Math.floor(milliseconds / 1000);
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;
  
      // Format hours, minutes, and seconds
      return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }

  // Stop the stopwatch
function stopTimerF() {
      if (!isRunning) return; 
      isRunning = false;
  
      // Stop the interval
      clearInterval(intervalId);
  }
  
  // Reset the stopwatch
  function resetTimerF() {
      stopTimerF();
      elapsedTime = 0;
      timerElement.textContent = '00:00:00';
  }