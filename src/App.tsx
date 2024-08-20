import Search from "./components/Search";
import Sort from "./components/Sort";
import UserList from "./components/UserList";
import Aside from "./components/Aside";
import Pagination from "./components/Pagination";
const App = () => {
  return (
    <div className="bg-blue-100 pt-6 pb-12 px-8">
      <div className="flex gap-6 items-center justify-center">
        <div className="w-full flex-1">
          <Search />
        </div>
        <Sort />
      </div>
      <div className="grid grid-cols-5 gap-4 py-6">
        <Aside />
        <div className="col-span-4 flex flex-col gap-6">
          <UserList />
          <Pagination />
        </div>
      </div>
    </div>
  );
};

export default App;
