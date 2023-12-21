const config=require('config')

module.exports=function(){
    if(!config.get('jwtprivatekey')){
        throw new Error("FATAL ERROR:jwtprivatekey is  not  defined")
        // console.log("FATAL ERROR:jwtprivatekey is  not  defined")
        // process.exit(1)
    }
    
}