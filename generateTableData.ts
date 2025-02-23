import { writeFileSync } from "fs";

// Function to generate random users
const generateUsers = (count: number) => {
  const statuses = ["Working", "On Leave", "Inactive"];
  const roles = [
    "Product Manager",
    "Software Engineer",
    "Designer",
    "Data Scientist",
  ];
  const teamsList = [
    "Design",
    "Product",
    "Development",
    "Marketing",
    "Sales",
    "Operations",
    "Facility",
    "Tech",
    "Design",
    "Product",
    "Development",
    "Marketing",
    "Sales",
    "Operations",
    "Facility",
    "Tech",
  ];

  const users = Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    profilePic: `https://randomuser.me/api/portraits/men/${i + 1}.jpg`,
    name: `User ${i + 1}`,
    username: `user${i + 1}`,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    role: roles[Math.floor(Math.random() * roles.length)],
    email: `user${i + 1}@company.com`,
    teams: teamsList
      .sort(() => 0.5 - Math.random())
      .slice(0, Math.floor(Math.random() * (teamsList.length - 3 + 1)) + 3),
  }));

  return users;
};

// Generate n users
const tableData = generateUsers(100);

// Write data to tableData.json
writeFileSync(
  "src/jsondata/tableData.json",
  JSON.stringify(tableData, null, 2)
);

console.log("tableData.json has been updated successfully!");
