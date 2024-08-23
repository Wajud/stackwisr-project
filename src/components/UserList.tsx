import React, { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";

interface Player {
  name: string;
  email: string;
  phone: string;
  company: string;
  address: string;
  companyInformation: string;
}

const GET_DATA = gql`
  query {
    users {
      name
      email
      phone
      company
      address
      companyInformation
    }
  }
`;

const UserList = () => {
  const [players, setPlayers] = useState<Player[]>([]);

  const { loading, error, data } = useQuery(GET_DATA);

  useEffect(() => {
    if (data) {
      setPlayers(data.users);
    }
  }, [data]);

  const [filter, setFilter] = useState("");

  const filterPlayers = (e: React.ChangeEvent<HTMLInputElement>) => {
    let filterData: Player[] = data.users;
    if (e.target.value === "") {
      setPlayers(filterData);
      return;
    }

    const matchingPlayers = filterData?.filter(
      (player) =>
        player.name.toLowerCase().includes(e.target.value) ||
        player.email.toLowerCase().includes(e.target.value)
    );
    if (matchingPlayers?.length === 0) {
      setPlayers(data.users);
    } else {
      setPlayers(matchingPlayers);
    }
  };

  function handleSorting(e: React.ChangeEvent<HTMLSelectElement>) {
    const sortCriteria = e.target.value;
    const playersCopy = [...players];

    const sortedPlayers = playersCopy?.sort((a: Player, b: Player) => {
      if (sortCriteria === "name") {
        if (a.name < b.name) {
          return -1;
        }

        if (a.name > b.name) {
          return 1;
        }
      } else if (sortCriteria === "company") {
        if (a.company < b.company) {
          return -1;
        }

        if (a.company > b.company) {
          return 1;
        }
      }

      return 0;
    });
    setPlayers(sortedPlayers);
  }

  //Pagination

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage: number = 5;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;

  const records = players?.slice(firstIndex, lastIndex);
  const npage = Math.ceil(players?.length / recordsPerPage);

  let numbers: number[] = [];
  for (let i = 1; i <= npage; i++) {
    numbers.push(i);
  }

  function changePage(n: number) {
    setCurrentPage(n);
  }

  //End of pagination

  //Sidebar

  const [sideUser, setSideUser] = useState(players[0]);
  useEffect(() => setSideUser(players[0]), [players]);

  function handleUserClick(
    e: React.MouseEvent<HTMLTableRowElement, MouseEvent>
  ) {
    const userName = e.currentTarget.dataset.client as string;
    setSideUser(JSON.parse(userName));
  }

  //End of sidebar

  return (
    <div>
      <div className="flex gap-6 items-center justify-center mb-4">
        <form className="flex-1">
          <input
            type="text"
            placeholder="Search name or email..."
            className="block w-full mx-auto py-2 px-2 rounded-md border border-gray-50 outline-none focus:outline-none"
            onChange={filterPlayers}
          />
        </form>

        <div className="relative h-10 w-72 min-w-[200px] bg-white rounded-[7px] focus:outline-none">
          <select
            onChange={handleSorting}
            className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
          >
            <option value="" disabled>
              SORT BY
            </option>
            <option value="name">Name</option>
            <option value="company">Company</option>
          </select>
          <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
            SORT
          </label>
        </div>
      </div>

      <div className="flex items-start gap-6">
        {players.length > 0 && (
          <aside className="bg-white px-3 py-6 rounded-md w-[20%] max-w-[300px]">
            <div className="flex flex-col gap-[1px]">
              <h1 className="font-bold text-3xl text-gray-800">
                {sideUser?.name}
              </h1>
              <p className=" text-sm">{sideUser?.email}</p>
              <p className=" text-xs">{sideUser?.phone}</p>
              <p className=" text-sm">{sideUser?.address}</p>
            </div>
            <p className="font-semibold mt-6 text-sm">Company Information</p>
            <p className="mt-1">{sideUser?.companyInformation}</p>
          </aside>
        )}
        <table className="w-full bg-white rounded-md flex-1">
          <thead className="bg-white flex gap-6 justify-between text-left text-blue-700 border-b-2 border-gray-300 pb-2 px-4 pt-4 rounded-md">
            <th className="w-[25%]">Name</th>
            <th className="w-[20%]">Email</th>
            <th className="w-[20%]">Phone</th>
            <th className="w-[35%]">Company Name</th>
          </thead>
          <tbody className="">
            {players.length > 0 ? (
              records.map((user: Player) => (
                <tr
                  data-client={JSON.stringify(user)}
                  key={user.name}
                  onClick={handleUserClick}
                  className="cursor-pointer flex gap-6 justify-between px-4 border-b border-gray-300 bg-white hover:bg-gray-200 transition-all"
                >
                  <td className="w-[25%] py-3 ">{user.name}</td>
                  <td className="w-[20%] py-3">{user.email}</td>
                  <td className="w-[20%] py-3">{user.phone}</td>
                  <td className="w-[35%] py-3">{user.company}</td>
                </tr>
              ))
            ) : (
              <div className="flex gap-2 py-3 px-4">
                <div role="status">
                  <svg
                    aria-hidden="true"
                    className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span className="sr-only">Loading...</span>
                </div>

                <p>Getting Users Data</p>
              </div>
            )}
          </tbody>
        </table>
      </div>

      <nav className="w-full flex justify-center mt-8">
        <ul className="flex justify-center gap-4">
          {numbers.map((n, i) => (
            <li
              onClick={() => changePage(n)}
              className={`bg-white py-1 px-4 rounded-sm flex items-center font-semibold cursor-pointer ${
                currentPage === n ? "bg-blue-600 text-white" : ""
              }`}
            >
              {n}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default UserList;
