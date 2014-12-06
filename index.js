var exec = require('exec');
var express = require('express');


var app = express();
app.use(express.static(__dirname + '/clones'));
var save_path = __dirname + '/clones';




app.get('/clone', function(req,res){
    var url = req.query.url;
    var result = {
        demo_url: req.headers.host + '/' + url,
        download: req.headers.host + '/' + url + '.zip'
    }

    wget(url, save_path, function(){
        zip(save_path + '/' + url, save_path + '/' + url + '.zip', function(){
            res.send(result)
        })
    });
});

app.listen(8888,console.log);

function zip(directory,zip_name,cb){
    exec(['zip','-r',zip_name,directory], function(err,out,code){
        if(err){
            console.log(err);
        }


        cb()
    })
}

function wget(url,save_path,cb){
    exec(['wget','-r','-k','-L','-P',save_path,url], function(err,out,code){
        if(err){
            console.log(err);
        }

        process.stderr.write(err);
        process.stdout.write(out);
        cb()
    })
}
