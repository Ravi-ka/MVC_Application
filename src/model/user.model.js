export default class UserModel{
    constructor(id, name, email, password){
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
    }

    static addUser(name, email, password){
        const newUser = new UserModel(user.length+1, name, email, password)
        user.push(newUser)
    }

    static verifyUser(email, password){
        const result = user.find((u)=> u.email===email && u.password===password)
        return result;
    }
}

let user =[
   {
    name:'test',
    email:'test@test.com',
    password:'testuser'
   }
];