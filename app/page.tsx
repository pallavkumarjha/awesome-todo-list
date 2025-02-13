export default function Home() {
  return (
    <div>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">My Tasks</h1>
        <div className="bg-white dark:bg-black/[.1] rounded-lg p-4 shadow-sm">
          <p className="text-center text-gray-500 dark:text-gray-400">No tasks yet. Click "Add Task" to get started!</p>
        </div>
      </div>
    </div>
  );
}
