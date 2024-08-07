import http from 'http';
const PORT = process.env.PORT;

const user = (name, age) =>{
    return {
        "name" : name,
        "age" : age
    };
};

let user1 = user("Shubham", 30);
let user2 = user("Rashmi", 27);

let users = [user1, user2];

const server = http.createServer((req, res) => {
    //console.log(req);
    console.log (`Request url : ${req.url}`);
    
    res.setHeader('Content-Type', 'application/json');
    let completeUrl = req.url;
    let [url, paramString] = completeUrl.split("?");
    let paramArray = [];
    let name, age;
    if (paramString != undefined && paramString != null){
        paramArray = paramString.split("&");
        name = paramArray[0].split("=")[1];
        age = paramArray[1].split("=")[1];
    }
    
    
    if (url === "/users/list"){
        res.write(JSON.stringify(users));
    }else if (url === "/users/add"){
        //add a user from query params
        if (age != undefined && name != undefined){
            let tempUser = user(name, Number.parseInt(age));
            users = users.concat(tempUser);
        }
        res.write(JSON.stringify(users));
    }else if (url === "/users/remove"){
        //remove an user
        if (age != undefined && name != undefined){
            users = users.filter((user) => {
                if (user.name === name){
                    return false;
                }else{
                    return true;
                }
            });
        }
        res.write(JSON.stringify(users));

    }else if (url === "/users/update"){
        //update an exsisting user
        if (age != undefined && name != undefined){
            users.map((user) => {
                if (user.name === name){
                    user.name = name;
                    user.age = Number.parseInt(age);
                }
            });
        }
        res.write(JSON.stringify(users));

    }else{
        //return error value
        res.write(JSON.stringify({errorMessage : "Requested end point not found"}));
    }

    //console.log(res);
    res.end();
    //res.end('<h1>ERROR, please check url</h1>');
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})