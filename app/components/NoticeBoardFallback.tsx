export default function NoticeBoardFallback() {
  return (
    <div className="grid grid-cols-4 h-full divide-x animate-pulse">
      {[...new Array(4)].map((_, index) => {
        return (
          <div
            key={index}
            className="border-mauve4 flex-1 flex flex-col overflow-y-auto"
          >
            <h2 className="flex justify-center items-center bg-mauve2 capitalize p-2 border-mauve4 border-y">
              <div className="h-8 w-20 rounded-md bg-mauve4" />
            </h2>
            {/* Assuming 'tasks' is an array of tasks */}
            {[...new Array(5)].map((task, taskIndex) => (
              <div
                key={taskIndex}
                className="bg-white p-4 rounded  m-2 h-36 bg-mauve4"
              ></div>
            ))}
          </div>
        );
      })}
    </div>
  );
}
