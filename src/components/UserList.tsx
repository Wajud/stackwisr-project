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
  const [players, setPlayers] = useState<Player[]>();

  const { loading, error, data } = useQuery(GET_DATA);
  console.log("loading: ", loading);
  if (error) {
    console.log("There was an error: ", error);
  }
  useEffect(() => {
    if (data) {
      setPlayers(data.users);
    }
    console.log(data);
  }, [data]);

  const [sortTerm, setSortTerm] = useState<string>("");

  const filterPlayers = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(players);
    const searchTerm = e.target.value;

    const matchingPlayers = players?.filter(
      (player) =>
        player.name.toLowerCase().includes(searchTerm) ||
        player.email.toLowerCase().includes(searchTerm)
    );
    if (matchingPlayers?.length === 0) {
      setPlayers(data.users);
    } else {
      setPlayers(matchingPlayers);
    }
    console.log("matchingPlayers :", matchingPlayers);
    console.log(e.target.value);
  };

  function handleSorting(e: React.ChangeEvent<HTMLSelectElement>) {
    if (players !== null && players !== undefined) {
      const sortedPlayers = players?.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      console.log(sortedPlayers);
    }
  }

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
            value={sortTerm}
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

      <div className="flex gap-6 pr-12">
        {players && (
          <aside className="bg-white px-3 py-6 rounded-md w-[20%] max-w-[300px]">
            <div className="flex flex-col gap-[1px]">
              <h1 className="font-bold text-3xl text-gray-800">
                {players[0].name}
              </h1>
              <p className=" text-sm">{players[0].email}</p>
              <p className=" text-xs">{players[0].phone}</p>
              <p className=" text-sm">{players[0].address}</p>
            </div>
            <p className="mt-4">{players[0].companyInformation}</p>
          </aside>
        )}
        <table className="w-full bg-white rounded-md flex-1">
          <thead className="bg-white flex gap-6 justify-between text-left text-blue-700 border-b-2 border-gray-300 pb-2 px-4 pt-4 rounded-md">
            <th className="w-1/6">Name</th>
            <th className="w-1/3">Email</th>
            <th className="w-1/6">Phone</th>
            <th className="w-1/3">Company Name</th>
          </thead>
          <tbody className="">
            {players
              ? players.map((user: Player) => (
                  <tr
                    key={user.name}
                    className="flex gap-6 justify-between px-4 border-b border-gray-300 bg-white hover:bg-gray-50 transition-all"
                  >
                    <td className="w-1/6 py-3 ">{user.name}</td>
                    <td className="w-1/3 py-3">{user.email}</td>
                    <td className="w-1/6 py-3">{user.phone}</td>
                    <td className="w-1/3 py-3">{user.company}</td>
                  </tr>
                ))
              : "Users data not available"}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
