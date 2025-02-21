# Awesome Todo List

A modern, feature-rich todo list application built with Next.js and TypeScript. Manage your tasks efficiently with custom fields, sorting, and filtering capabilities.

## Features

- ✨ Create, edit, and delete tasks
- 🔄 Track task status (Started/Not Started)
- 🎯 Set task priorities (High/Medium/Low/None)
- 🔍 Filter tasks by title, status, and priority
- ↕️ Sort tasks by any column
- 🎨 Custom fields support
  - Add text, number, or checkbox fields
  - Customize your task tracking
  - Manage custom fields easily
- 💾 Persistent storage using localStorage


## Technology Stack

- Next.js 13+ with App Router
- TypeScript
- Tailwind CSS
- Radix UI Components
- Lucide Icons
- Context API for state management

## Getting Started

### Prerequisites

- Node.js 16.8 or later
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/awesome-todo-list.git
cd awesome-todo-list
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

### Managing Tasks

1. Click "Add task" to create a new task
2. Fill in the task details:
   - Title (required)
   - Status (required)
   - Priority (required)
   - Custom field values (optional)
3. Click "Add Task" to save

### Custom Fields

1. Click "Manage Custom Fields" to open the custom fields editor
2. Add new fields by:
   - Entering a field name
   - Selecting a field type (text, number, or checkbox)
   - Clicking "Add"
3. Remove existing fields using the delete button

### Filtering and Sorting

- Use the search bar to filter tasks by title
- Use the status and priority dropdowns to filter by those attributes
- Click on any column header to sort by that column
- Click again to reverse the sort order

### Missing features
 - Unit tests
 - Pagination implementation
 - All bonus milestones
 - Relevant comments in the repo are not present
 - There are few bugs in the app (like x button in the modal doesn't close it etc), didn't get time to fix them
