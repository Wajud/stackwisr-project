import React from "react";

interface User {
  name: string;
  email: string;
  phone: string;
  company: string;
  address: string;
  companyInformation: string;
}

const users: User[] = [
  {
    name: "Rooney Wayne",
    email: "rooney@utd.com",
    phone: "27999123",
    company: "MUFC",
    address: "2334 Manchester Road",
    companyInformation: "A football club",
  },
  {
    name: "Lampard Frank",
    email: "lampard@cfc.com",
    phone: "08123345586",
    company: "CFC",
    address: "1123 London Avenue",
    companyInformation: "A dance club",
  },
  {
    name: "Ronaldo Chris",
    email: "ronaldo@utd.com",
    phone: "4778696060",
    company: "MUFC",
    address: "2334 Manchester Road",
    companyInformation: "A football club",
  },
  {
    name: "Fabregas Fanta",
    email: "fabregas@ars.com",
    phone: "8906015273",
    company: "ARS",
    address: "1245 London Avenue",
    companyInformation: "A weapons store",
  },
  {
    name: "Gerrard Jerry",
    email: "gerrad@liv.com",
    phone: "2383372",
    company: "LIV",
    address: "1124 South London Road",
    companyInformation: "A museum",
  },
  {
    name: "Kompany Vincent",
    email: "kompany@city.com",
    phone: "826241729",
    company: "CITY",
    address: "9887 Manchester Road",
    companyInformation: "A Movie Theater",
  },
];

const UserList = () => {
  return (
    <table className="w-full bg-white rounded-md">
      <thead className="bg-white flex gap-6 justify-between text-left text-blue-700 border-b-2 border-gray-300 pb-2 px-4 pt-4 rounded-md">
        <th className="w-1/6">Name</th>
        <th className="w-1/3">Email</th>
        <th className="w-1/6">Phone</th>
        <th className="w-1/3">Company Name</th>
      </thead>
      <tbody className="">
        {users.map((user) => (
          <tr
            key={user.name}
            className="flex gap-6 justify-between px-4 border-b border-gray-300 bg-white hover:bg-gray-50 transition-all"
          >
            <td className="w-1/6 py-3 ">{user.name}</td>
            <td className="w-1/3 py-3">{user.email}</td>
            <td className="w-1/6 py-3">{user.phone}</td>
            <td className="w-1/3 py-3">{user.company}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserList;
