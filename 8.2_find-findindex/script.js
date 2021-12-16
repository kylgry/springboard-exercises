
function findUserByUsername(objArray, value) {
  return objArray.find(function(obj) {
    return obj.username == value;
  })
}

function removeUser(objArray, value) {
  const userIndex = objArray.findIndex(function(obj) {
    return obj.username == value;
  })
  const foundUser = objArray[userIndex];
  users.splice(userIndex,1);
  return foundUser;
}

const users = [
  {username: 'mlewis'},
  {username: 'akagen'},
  {username: 'msmith'}
];

console.log(findUserByUsername(users, 'mlewis'));
console.log(findUserByUsername(users, 'taco'));
for (user of users) {console.log(user.username);}
console.log(removeUser(users, 'akagen'));
for (user of users) {console.log(user.username);}
console.log(removeUser(users, 'akagen'));
