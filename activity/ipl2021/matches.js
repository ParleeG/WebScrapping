const fs=require("fs")
const request=require("request")
const cheerio=require("cheerio")
function match(matchlink){
    request(matchlink,function(error,response,data){
        processData(data)
    })
}
function processData(html){
    let myDocument=cheerio.load(html)
    
}
module.exports=match