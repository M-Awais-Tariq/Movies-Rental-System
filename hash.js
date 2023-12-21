const bcrypt=require('bcrypt')
async function run(){
    //befor hashing password create a salt 
    //salt is a random string which will be added before or after the
    // password 
    const salt=await bcrypt.genSalt(10)
    const hashedpassword=await bcrypt.hash("1234",salt)
    console.log(salt)
    console.log(hashedpassword)
}
run()