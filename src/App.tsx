import UserList from "./components/UserList";

import Pagination from "./components/Pagination";

const App = () => {
  return (
    <div className="bg-blue-100 pt-6 pb-12 px-8">
      <div className="col-span-4 flex flex-col gap-6 py-6">
        <UserList />
        <Pagination />
      </div>
    </div>
  );
};

export default App;
