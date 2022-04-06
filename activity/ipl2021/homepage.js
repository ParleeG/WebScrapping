const fs=require("fs")
const cheerio=require("cheerio")
const request=require("request")
const allmatches=require("./allmatches.js")
matchlink="https://www.espncricinfo.com/series/ipl-2021-1249214"
request(matchlink,function(error,response,data){
    processData(data)
})
function processData(html){
    let myDocument=cheerio.load(html)
    let aTags=myDocument(".ds-block.ds-text-center")
    allmatches("https://www.espncricinfo.com"+aTags["0"].attribs["href"])
}