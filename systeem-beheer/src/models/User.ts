import Borrower from "./Borrower";
import Role from "./Role";

interface User {
  id: string;
  borrower: Borrower;
  role: Role;
  password: string;
}

export default User;