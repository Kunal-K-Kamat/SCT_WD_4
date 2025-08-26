const taskInput = document.getElementById("taskInput");
const dateInput = document.getElementById("dateInput");
const timeInput = document.getElementById("timeInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const toggleDark = document.getElementById("toggleDark");

// 🔔 Notification container
const notification = document.createElement("div");
notification.className = "notification";
document.body.appendChild(notification);

// Function to show notification
function showNotification(message) {
  notification.textContent = message;
  notification.classList.add("show");
  setTimeout(() => {
    notification.classList.remove("show");
  }, 2500);
}

// Add task
addBtn.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  const taskDate = dateInput.value;
  const taskTime = timeInput.value;

  if (!taskText) return;

  const li = document.createElement("li");

  // Task content container
  const taskContent = document.createElement("div");
  taskContent.classList.add("task-content");

  const textSpan = document.createElement("span");
  textSpan.textContent = taskText;

  const dateSpan = document.createElement("span");
  if (taskDate) dateSpan.textContent = "📅 " + taskDate;

  const timeSpan = document.createElement("span");
  if (taskTime) timeSpan.textContent = "⏰ " + taskTime;

  taskContent.appendChild(textSpan);
  taskContent.appendChild(dateSpan);
  taskContent.appendChild(timeSpan);
  li.appendChild(taskContent);

  // Actions container
  const actions = document.createElement("div");
  actions.classList.add("task-actions");

  // Complete button
  const completeBtn = document.createElement("button");
  completeBtn.textContent = "✔";
  completeBtn.onclick = () => {
    textSpan.classList.toggle("completed");

    // Remove any existing success message
    const oldMsg = li.querySelector(".success-message");
    if (oldMsg) oldMsg.remove();

    if (textSpan.classList.contains("completed")) {
      const successMsg = document.createElement("div");
      successMsg.className = "success-message";
      successMsg.textContent = "Task completed successfully 🎉";
      taskContent.appendChild(successMsg);
    }
  };

  // Edit button
  const editBtn = document.createElement("button");
  editBtn.textContent = "✏";
  editBtn.onclick = () =>
    editTask(taskContent, textSpan, dateSpan, timeSpan, editBtn);

  // Delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "🗑";
  deleteBtn.onclick = () => li.remove();

  actions.appendChild(completeBtn);
  actions.appendChild(editBtn);
  actions.appendChild(deleteBtn);

  li.appendChild(actions);
  taskList.appendChild(li);

  // Clear inputs
  taskInput.value = "";
  dateInput.value = "";
  timeInput.value = "";
});

// Reusable Edit function
function editTask(taskContent, textSpan, dateSpan, timeSpan, editBtn) {
  const editText = document.createElement("input");
  editText.type = "text";
  editText.value = textSpan.textContent;

  const editDate = document.createElement("input");
  editDate.type = "date";
  editDate.value = dateSpan.textContent.replace("📅 ", "") || "";

  const editTime = document.createElement("input");
  editTime.type = "time";
  editTime.value = timeSpan.textContent.replace("⏰ ", "") || "";

  taskContent.innerHTML = "";
  taskContent.appendChild(editText);
  taskContent.appendChild(editDate);
  taskContent.appendChild(editTime);

  editBtn.textContent = "💾";
  editBtn.onclick = () => {
    textSpan.textContent = editText.value;
    dateSpan.textContent = editDate.value ? "📅 " + editDate.value : "";
    timeSpan.textContent = editTime.value ? "⏰ " + editTime.value : "";

    taskContent.innerHTML = "";
    taskContent.appendChild(textSpan);
    taskContent.appendChild(dateSpan);
    taskContent.appendChild(timeSpan);

    // ✅ Show "Edited successfully" message inside note
    const editMsg = document.createElement("div");
    editMsg.className = "edit-message";
    editMsg.textContent = "Edited successfully ✅";
    taskContent.appendChild(editMsg);

    // Remove message after 2.5s
    setTimeout(() => editMsg.remove(), 2500);

    // Reset edit button back to ✏
    editBtn.textContent = "✏";
    editBtn.onclick = () =>
      editTask(taskContent, textSpan, dateSpan, timeSpan, editBtn);
  };
}

// Dark mode toggle
toggleDark.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  toggleDark.textContent = document.body.classList.contains("dark")
    ? "☀️ Light Mode"
    : "🌙 Dark Mode";
});

// Auto-open date and time pickers smoothly
if (HTMLInputElement.prototype.showPicker) {
  dateInput.addEventListener("focus", () => {
    setTimeout(() => dateInput.showPicker(), 0);
  });

  timeInput.addEventListener("focus", () => {
    setTimeout(() => timeInput.showPicker(), 0);
  });
}
