  // export const DEMODATA = {
  // role:"admin"
  // }

// export const DEMODATA = {
//     role : "teamlead"
// }

// export const DEMODATA = {
//   role: "projectmanager",
// };

// export const DEMODATA = {
//  role : "projectmanager"
// }

// export const EMPLOYEES = [
//   {
//     empCode: "ABC1234",
//     empName: "John Doe",
//     email: "john.doe@example.com",
//     phone: "6234567890",
//     department: "IT",
//     role: "Developer",
//     password: "SecurePass123!",
//   },
//   {
//     empCode: "XYZ5678",
//     empName: "Sarah Smith",
//     email: "sarah.smith@example.com",
//     phone: "8765432109",
//     department: "IT",
//     role: "Project Manager",
//     password: "MyPassword456!",
//   },
//   {
//     empCode: "DEF9012",
//     empName: "Michael Johnson",
//     email: "michael.johnson@example.com",
//     phone: "7654321098",
//     department: "Sales",
//     role: "Project Manager",
//     password: "SecurePass789!",
//   },
//   {
//     empCode: "GHI3456",
//     empName: "Emily Brown",
//     email: "emily.brown@example.com",
//     phone: "9876543210",
//     department: "IT",
//     role: "Tester",
//     password: "TestPass321!",
//   },
//   {
//     empCode: "JKL7890",
//     empName: "Robert Wilson",
//     email: "robert.wilson@example.com",
//     phone: "6543210987",
//     department: "Head",
//     role: "Admin",
//     password: "AdminPass654!",
//   },
// ];

export const DEMODATA = {
  role: "superadmin",
};


// "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";


export const LINECHARTDATA = {
  labels: ["January", "February", "March", "April", "May", "June","July","August","September","October","November","December"],
  datasets: [{
    label: "Dataset 1",
    data: [65, 59, 80, 81, 56, 55],
    borderColor: "rgb(75, 192, 192)",
  }],
};

export const BARCHARTDATA = {
  labels: ["January", "February", "March", "April", "May", "June","July","August","September","October","November","December"],
  datasets: [{
    label: "Dataset 1",
    data: [65, 59, 80, 81, 56, 55],
    backgroundColor: "#ff6900",
    borderColor: "#ff6900",
    borderWidth: 1,
  }],
};

export const BLUEBARCHARTDATA = {
  labels: ["", "", "", "", ""],
  datasets: [
    {
      label: "",
      data: [22, 45, 38, 58, 85],
      backgroundColor: [
        "#93C5FD", // light blue
        "#60A5FA", // medium-light blue
        "#3B82F6", // medium blue
        "#3B82F6", // medium blue
        "#EF4444", // red - highlight
      ],
      borderWidth: 0,
      barPercentage: 0.6,
      categoryPercentage: 0.8,
    },
  ],
};
