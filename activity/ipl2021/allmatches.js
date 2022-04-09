const fs=require("fs")
const request=require("request")
const cheerio=require("cheerio")
const match=require("./matches.js")
function allmatches(matchlink){
    request(matchlink,function(error,response,data){
        processData(data)
    })
}
function processData(html){
    let myDocument=cheerio.load(html)
    let alllinks=myDocument(".ds-flex.ds-mx-4 span:nth-child(3) a")
    fs.mkdirSync("./IPL")
    console.log(alllinks.length)
    for(let i=0;i<alllinks.length;i++){
        match("https://www.espncricinfo.com"+alllinks[i].attribs["href"])
    }
}
module.exports=allmatches