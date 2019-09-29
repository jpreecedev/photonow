import { User } from "../../global"

const UserViewModel = (user: User): User => {
  return <User>{
    _id: user._id,
    email: user.email,
    businessName: user.businessName,
    firstName: user.firstName,
    lastName: user.lastName,
    displayName: user.displayName,
    role: user.role
  }
}

export { UserViewModel }
