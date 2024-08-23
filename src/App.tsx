import UserList from "./components/UserList";

const App = () => {
  return (
    <div className="bg-blue-100 pt-6 pb-12 px-8 min-h-[100vh]">
      <div className="col-span-4 flex flex-col gap-6 py-6">
        <UserList />
      </div>
    </div>
  );
};

export default App;
