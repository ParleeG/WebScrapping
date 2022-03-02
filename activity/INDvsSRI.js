const fs=require("fs")
const cheerio=require("cheerio")
const request=require("request")
matchlink="https://www.espncricinfo.com/series/sri-lanka-in-india-2021-22-1278665/match-results"
//request(matchlink,cb);
function cb(error,response,data){
    fs.writeFileSync("./INDvsSRI.html",data)
    matchesDetails()
}
function matchesDetails(){
    let matchesDetails=fs.readFileSync("./INDvsSRI.html")
    let myDocument=cheerio.load(matchesDetails)
    let matches=myDocument(".match-info.match-info-FIXTURES .status-text")
    for(let i=0;i<matches.length;i++){
        console.log(myDocument(matches[i]).text())
    }
}
match1link="https://www.espncricinfo.com/series/sri-lanka-in-india-2021-22-1278665/india-vs-sri-lanka-1st-t20i-1278684/full-scorecard"
//request(match1link,cb1)
function cb1(error,response,data){
    fs.writeFileSync("./match1.html",data)
    scorecard()
}
function scorecard(){
    let match1=fs.readFileSync("./match1.html")
    let myDocument=cheerio.load(match1)
    let batsmanScores=myDocument('.table.batsman td[class="font-weight-bold"]')
    let batsmanName=myDocument(".table.batsman .batsman-cell.text-truncate")
    let scores=[],name=[]
    for(let i=0;i<batsmanName.length;i++){
        scores[i]=parseInt(myDocument(batsmanScores[i]).text())
        name[i]=myDocument(batsmanName[i]).text()
    }
    console.log(name)
    console.log(scores)
}