import { useState } from "react";
import { getShade, getTooltipData } from "../HelperFunctions/getShade";

interface User {
  name: string;
  username: string;
  role: string;
  email: string;
  status: string;
  teams: string[];
  avatar: string;
}

const users: User[] = Array(65).fill({
  name: "Username",
  username: "@username",
  role: "Product manager",
  email: "username@company.com",
  status: "Working",
  teams: [
    "Design",
    "Product",
    "Development",
    "dasdas",
    "dasdasda",
    "sdasda",
    "dasdasda",
    "dasdasda",
  ],
  avatar: "/assets/Avatar.svg",
});

const InitialSetup = () => {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  // const totalPages: number = Math.ceil(users.length / rowsPerPage);
  const [totalPages, setTotalPages] = useState(
    Math.ceil(users.length / rowsPerPage)
  );

  const handleRowPerPageSelection = (rows: number) => {
    setRowsPerPage(rows);
    setTotalPages(Math.ceil(users.length / rows));
  };

  return (
    <div className=" font-roboto relative font-roboto bg-gray-900 min-h-screen flex flex-col justify-center items-center text-roboto leading-5">
      <h3 className="text-white p-3">Initial Setup</h3>
      <div className="relative pb-3 shadow-lg w-full max-w-full max-h-screen bg-white overflow-auto">
        <h2>Select Number of Rows Per Page</h2>
        <select
          value={rowsPerPage}
          onChange={(e) => handleRowPerPageSelection(Number(e.target.value))}
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={30}>30</option>
        </select>
        <table className=" border-collapse relative w-max lg:w-full h-full overflow-x-auto">
          {/* Define column spacing */}
          <colgroup>
            <col style={{ width: "2%" }} /> {/* Checkbox */}
            <col style={{ width: "22%" }} /> {/* Name */}
            <col style={{ width: "4%" }} /> {/* Status */}
            <col style={{ width: "22%" }} /> {/* Role */}
            <col style={{ width: "22%" }} /> {/* Email */}
            <col style={{ width: "24%" }} /> {/* Teams */}
            <col style={{ width: "2%" }} /> {/* Radio button */}
            <col style={{ width: "2%" }} /> {/* Radio button */}
          </colgroup>

          <thead className="bg-[#F7F7F7] relative ">
            <tr className="text-sm font-normal bg-[#F7F7F7] ">
              <th className="p-3 text-left">
                <input
                  type="checkbox"
                  id="select-all"
                  className=" cursor-pointer border border-[#9E9E9E] w-4 h-4 rounded-[4px]"
                />
              </th>
              <th className="p-3 text-left font-normal font-roboto">Name</th>
              <th className="p-3 text-left font-normal">Status</th>
              <th className="p-3 text-left font-normal">Role</th>
              <th className="p-3 text-left font-normal">Email</th>
              <th className="p-3 text-left font-normal">Teams</th>
              <th className="p-3 text-left font-normal"></th>
            </tr>
          </thead>

          <tbody className="relative h-full w-full">
            {users
              .slice(
                (currentPage - 1) * rowsPerPage,
                (currentPage - 1) * rowsPerPage + rowsPerPage
              )
              .map((user, index) => (
                <tr
                  key={index}
                  className="border-t border-t-[#f2f2f2] hover:bg-gray-50 relative h-full w-full cursor-pointer"
                >
                  <td className="p-3">
                    <input
                      type="checkbox"
                      name="select-all"
                      className="rounded-[4px] cursor-pointer border border-[#9E9E9E] w-4 h-4"
                    />
                  </td>
                  <td className="p-3 flex items-center gap-3">
                    <img
                      src={user.avatar}
                      alt="Avatar"
                      className="w-max h-max rounded-full"
                    />
                    <div>
                      <div className="">{user.name}</div>
                      <div className="text-sm text-gray-500">
                        {user.username}
                      </div>
                    </div>
                  </td>
                  <td className="p-3">
                    <span className="px-2 py-1 bg-[#CCE6FF]  text-[#0080FF] font-medium rounded-full text-sm">
                      {user.status}
                    </span>
                  </td>
                  <td className="p-3">{user.role}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">
                    {user.teams.slice(0, 3).map((team, i) => (
                      <span
                        key={i}
                        className={`px-2 py-1 text-sm rounded-full mx-1 ${getShade(
                          i
                        )}`}
                      >
                        {team}
                      </span>
                    ))}
                    {user.teams.length > 3 && (
                      <span
                        className="px-2 py-1 bg-gray-200 text-sm rounded-full mx-1"
                        title={getTooltipData(user.teams.slice(3))}
                      >
                        +{user.teams.length - 3}
                      </span>
                    )}
                  </td>
                  <td className="p-3">
                    <input
                      type="radio"
                      // name="selectUser"
                      className=" self-center cursor-pointer w-5 h-5 border-2 rounded-full"
                    />
                  </td>
                  <td className="p-3">
                    <input
                      type="radio"
                      // name="selectUser"
                      className="self-center cursor-pointer w-5 h-5 border-2 rounded-full"
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        {/* Dummy Pagination */}
        <div className=" flex justify-between items-center pt-4 border-t border-t-[#f2f2f2]">
          <button
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          >
            Prev
          </button>
          <div className="flex gap-2">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                className={`px-3 py-1 rounded cursor-pointer ${
                  currentPage === i + 1
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>
          <button
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            disabled={currentPage === totalPages}
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default InitialSetup;
