const users = [];
const addUser=({id, username, room})=>{
    username=username.trime().toLowerCase();
    room = room.trim().toLowerCase();
    if(!username || !room){
        return {error: 'Username and room are required.'}
    }
    const existingUser = users.find((user)=>user.room==room && user.username);
    if(existingUser){
        return{error: 'Username is in use.'}
    }
    const user ={id, username, room};
    users.push(user);
    return {user};
}
const removeUser=(id)=>{
    const index = users.findIndex((user)=>user.id===id);
    if(index!==-1){
        return users.splice(index,1[0])
    }

}
const
