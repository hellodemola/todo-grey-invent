# Collaborative Todo List

## 📌 Overview
The **Collaborative Todo List** is a real-time task management application built with **React**, **Redux Toolkit**, and **RTK Query**. It integrates with an API to fetch and manage tasks while offering features like **optimistic UI updates**, **infinite scrolling**, and **dark mode**. The app is designed for efficient handling of large datasets using **virtualized rendering**.

It is an React Js assessment exercise for **GreyInvent** Software engineering role.

## 🚀 Features
### ✅ **Core Features**
- Fetch and display **tasks** from an API (`https://jsonplaceholder.typicode.com/todos?_limit=50`)
- **Mark tasks as completed** with a checkbox
- **Edit tasks inline** without opening a separate form
- **Delete tasks** permanently
- **Add new tasks** with **optimistic UI updates**
- **Filter tasks** by:
  - All
  - Completed
  - Pending
- **Search for tasks** dynamically
- **Infinite scrolling** for handling large datasets
- **State management** using **Redux Toolkit** & **RTK Query**
- **Dark mode toggle**
- **Auto-save tasks to Local Storage** for persistence

## 🏗️ Tech Stack
- **Frontend:** React (Vite), TypeScript
- **State Management:** Redux Toolkit, RTK Query
- **Styling:** Tailwind CSS
- **Virtualized Rendering:** React Window
- **API Handling:** Fetch API, JSONPlaceholder
- **Testing:** Vitest, React Testing Library, MSW

## 🛠️ Installation & Setup
### 1️⃣ Clone the Repository
```sh
git clone https://github.com/hellodemola/todo-grey-invent
cd todo-grey-invent
```

### 2️⃣ Install Dependencies
```sh
pnpm install
```

### 3️⃣ Start the Development Server
```sh
pnpm run dev
```

The app will be available at `http://localhost:5173` (default Vite port).

## 🔍 API Endpoints
- **Get Todos:** `GET /todos?_limit=50`
- **Add Todo:** `POST /todos`
- **Update Todo:** `PATCH /todos/:id`
- **Delete Todo:** `DELETE /todos/:id`

## 🧪 Testing
### **Run Unit & Integration Tests**
```sh
pnpm test
```

## 📜 Folder Structure
```plaintext
src/
├── components/         # UI components (Task, Filter, Modal, etc.)
├── store/             # Redux Toolkit store & slices
├── services/          # API services (RTK Query)
├── hooks/             # Custom React hooks
├── pages/             # Page components (Home, About, etc.)
├── utils/             # Utility functions
├── test/              # Test setup & mocks
├── App.tsx            # Main React component
├── main.tsx           # Entry point
└── vite.config.ts     # Vite configuration
```

## 🎯 Future Enhancements
- [ ] **Real-time updates using WebSockets**
- [ ] **Multi-user collaboration**
- [ ] **Custom user authentication**
- [ ] **Drag-and-drop task reordering**
- [ ] **Progress tracking dashboard**

## 👨‍💻 Author
Developed by [Ademola](https://github.com/hellodemola) 🚀

## 📜 License
This project is open-source and available under the **MIT License**.

---
Feel free to contribute and enhance the project! PRs are welcome. 🎉

