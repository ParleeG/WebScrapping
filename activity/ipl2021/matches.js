const fs=require("fs")
const request=require("request")
const cheerio=require("cheerio")
function match(matchlink){
    console.log(matchlink)
    request(matchlink,function(error,response,data){
        processData(data)
    })
}
function processData(html){
    let myDocument=cheerio.load(html)
    let bothInnings=myDocument(".ds-bg-fill-content-prime.ds-rounded-lg")
    for(let i=0;i<bothInnings.length;i++){
        let innings=myDocument(bothInnings[i])
        let team=innings.find(".ds-text-tight-s.ds-font-bold.ds-uppercase").text().split("INNINGS")[0].trim()
        let batsmanTable=innings.find(".ds-w-full.ds-table.ds-table-xs.ds-table-fixed.ci-scorecard-table")
        let alltrs=batsmanTable.find(".ds-border-b.ds-border-line.ds-text-tight-s")
        for(let j=0;j<alltrs.length;j++){
            let alltds=alltrs.find("td")
            let name=myDocument(alltds[0]).text().trim()
            let runs=myDocument(alltds[2]).text().trim()
            let balls=myDocument(alltds[3]).text().trim()
            let fours=myDocument(alltds[5]).text().trim()
            let sixes=myDocument(alltds[6]).text().trim()
            let strike=myDocument(alltds[7]).text().trim()
            usedata(team,name,runs,balls,fours,sixes,strike)
        }
    }
}
function usedata(team,name,runs,balls,fours,sixes,strike){
    if(fs.existsSync(`./IPL/${team}`)){
        if(fs.existsSync(`./IPL/${team}/${name}.json`)){
            updatePlayer(team,name,runs,balls,fours,sixes,strike)
        }
        else{
            createPlayer(team,name,runs,balls,fours,sixes,strike)
        }
    }
    else{
        fs.mkdirSync(`./IPL/${team}`)
        createPlayer(team,name,runs,balls,fours,sixes,strike)
    }
}
function createPlayer(team,name,runs,balls,fours,sixes,strike){
    let file=[]
    let obj={
        "Runs":runs,
        "Balls":balls,
        "Fours":fours,
        "Sixes":sixes,
        "Strike Rate":strike
    }
    file.push(obj)
    fs.writeFileSync(`./IPL/${team}/${name}.json`,JSON.stringify(file))
}
function updatePlayer(team,name,runs,balls,fours,sixes,strike){
    let file=JSON.parse(fs.readFileSync(`./IPL/${team}/${name}.json`))
    let obj={
        "Runs":runs,
        "Balls":balls,
        "Fours":fours,
        "Sixes":sixes,
        "Strike Rate":strike
    }
    file.push(obj)
    fs.writeFileSync(`./IPL/${team}/${name}.json`,JSON.stringify(file))
}
module.exports=match