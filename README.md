# Smart Issue Tracker & Interactive Quiz Builder

This project is a **React (Vite) application** built as part of the SDE Intern Task submission.  
It contains **two major features**:

1. **Smart Issue Tracker**
   - Add, update, and delete tasks.
   - Drag & drop tasks across columns (`Todo`, `In Progress`, `Done`) using `react-beautiful-dnd`.
   - Data is persisted using **localStorage** (remains saved even after reload).

2. **Interactive Quiz Builder**
   - Create a new quiz by providing a **title** and adding **multiple questions**.
   - Each question contains 4 options with one correct answer.
   - Play quizzes one question at a time with progress tracking and scoring.
   - After completion, the final score and review of answers are shown.
   - Data is persisted using **localStorage**.

---

## 🚀 Tech Stack
- **Frontend:** React.js + Vite
- **State Management:** React `useState` & `useEffect`
- **Persistence:** Browser `localStorage`
- **Drag & Drop:** `react-beautiful-dnd`

---

## 📂 Project Structure
```
smart-issue-quiz-app/
│── index.html
│── package.json
│── README.md
│── /src
│   ├── App.jsx
│   ├── main.jsx
│   ├── styles.css
│   └── /components
│       ├── IssueTracker.jsx   # Task Management App
│       └── QuizBuilder.jsx    # Quiz Builder & Player
```

---

## ⚡ Features in Detail

### 📝 Smart Issue Tracker
- Add a task with **title** and **description**.
- Update status with dropdown or drag & drop between columns.
- Delete tasks when completed or no longer needed.
- Persistent data with `localStorage`.

### 🎯 Interactive Quiz Builder
- Create multiple quizzes with **title & questions**.
- Each question supports **4 options** and **1 correct answer**.
- List of created quizzes shown on the dashboard.
- Play quizzes:
  - One question at a time.
  - Score updated live.
  - Progress bar for tracking completion.
- Final review with **correct vs selected answers**.

---

## 🛠️ Installation & Running Locally

### 1. Clone or Download
Download the ZIP or clone from GitHub:
```bash
git clone <repo-url>
cd smart-issue-quiz-app
```

### 2. Install Dependencies
Make sure you have **Node.js >= 16** installed. Then run:
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open the app at the Vite dev server URL (default: `http://localhost:5173`).

### 4. Build for Production
```bash
npm run build
npm run preview
```

---

## 📦 Dependencies
- `react`
- `react-dom`
- `react-beautiful-dnd`
- `vite`

Install them via:
```bash
npm install react react-dom react-beautiful-dnd
```

---

## 💡 Future Enhancements (Optional Bonus)
- Backend API with **Node.js + Express**.
- Database integration (**Firebase Firestore / MongoDB**).
- Quiz Timer functionality.
- Animations for smoother transitions.
- Deployment on **Vercel / Render**.

---
