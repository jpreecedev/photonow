import { User } from "../../global"

const UserViewModel = (user: User): User => {
  return <User>{
    email: user.email,
    businessName: user.businessName,
    firstName: user.firstName,
    lastName: user.lastName,
    displayName: user.displayName
  }
}

export { UserViewModel }
