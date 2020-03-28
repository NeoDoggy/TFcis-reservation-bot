//setup
const {Client, RichEmbed}=require('discord.js');
const Discord = require('discord.js');
var client = new Client ;
const settings = require('./settings.json');
const prefix = settings.prefix ;

function DT(){
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
    return dateTime ;
}

function TMD(){
    var today = new Date();
    var TomorrowDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+(today.getDate()+1);
    return TomorrowDate ;
}

function hour(){
    var today = new Date() ;
    var H = today.getHours() ;
    return H ;
}

function weekDay(){
    var d=new Date();
    var day = d.getDay() ; 
    return day ;
}

client.on('ready',()=>{
    console.log(`${client.user.tag} is logged in !`) ;
    client.user.setActivity("Use !help for HELP!"); //set status 
});

client.on('message', msg => {
    if(msg.content.startsWith(prefix+"help")){
        msg.channel.send(`${msg.author},要使用我請遵照以下規則喔！\n一、每日22點以前截止明日的預約\n二、預約格式：!check 班級座號 名字 ex. !check 11814 ニオ\n就這麼簡單喔~欸嘿！`).then(d_msg => d_msg.delete(3000)) ;
        msg.delete(3000) ;
    }
    if(msg.content.startsWith(prefix+"time")){
        msg.channel.send(DT()) ;
    }
    if(msg.content.startsWith(prefix+"hour")){
        msg.channel.send(hour()) ;
    }
    if(msg.content.startsWith(prefix+"weekday")){
        msg.channel.send(weekDay()) ;
    }
    if(msg.content.startsWith(prefix+"check")){
        var TomorrowWeekday = weekDay()+1 ;
        if(TomorrowWeekday>=1&&TomorrowWeekday<=5){
            if(hour()<=22){
                msgsplit = msg.content.split(" ",3) ;
                const classNum = msgsplit[1] ;
                const Name = msgsplit[2] ;
                const ALL = classNum+' '+Name ;
                const userID = msg.guild.members.find(m=>m.id === '561559537539088385') ;
                const DirMsg = ALL+'要預約明天 '+TMD()+' 的場次喔！' ;
                userID.send(DirMsg) ;
                msg.delete(3000) ;
                msg.channel.send(`${msg.author}さん，已將您加入明天的申請名單中了！`).then(d_msg=>d_msg.delete(3000)) ;
            }
            else{
                msg.delete(3000) ;
                msg.channel.send(`${msg.author},明天的預約的時間結束了喔！要預約後天的請等兩小時後喔`).then(d_msg=>d_msg.delete(3000)) ;
            }
        }
        else{
            msg.delete(3000) ;
            msg.channel.send(`${msg.author},明天你想上課嗎？(笑`).then(d_msg => d_msg.delete(3000)) ;
        }
        
    }

    //backstage
    console.log(`\n[`+DT()+`] ${msg.author.username}-sent：[ ${msg} ] UUID：${msg.author.id}`) ;
});

client.login(settings.token) ;