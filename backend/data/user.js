import bycrypt from "bcryptjs"

const users = [
  {
    name: "Admin",
    email: "admin@gmail.com",
    password: bycrypt.hashSync('12346',10),
    isAdmin: true,
  },
  {
    name: "leoj",
    email: "leoj@gmail.com",
    password: bycrypt.hashSync('12346',10),
  },
  {
    name: "grace",
    email: "grace@gmail.com",
    password: bycrypt.hashSync('12346',10),
  },
]
export default users;
