var fs = require('fs');

function RespInfo(respcode, respmsg) {
    this.respcode = respcode;
    this.respmsg = respmsg;
}

function resolveInfos(fileName, infos) {
    var content = fs.readFileSync(fileName, 'utf8');
    content.split('\r\n').forEach(respStr => {
        var info = respStr.split('|');
        if (info[0] != '') {
            infos.push(new RespInfo(info[0], info[1]));
        }
    });
}

var oldRespInfos = [];
var newRespInfos = [];
var sql = '';

resolveInfos('./file/oldRespCode.txt', oldRespInfos);
resolveInfos('./file/newRespCode.txt', newRespInfos);


newRespInfos.forEach(info => {
    if (!oldRespInfos.find(elem => elem.respcode == info.respcode)) {
        sql += `insert into yw_debit_dict values('','','` + info.respcode + `','` + info.respmsg + `');\r\n`;
    }
})
fs.writeFileSync('./file/insert.sql', sql);
console.log('生成成功');
