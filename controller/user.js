/**
 * Created by 1 on 2016/5/16.
 */
// index page
var mongoose=require('mongoose');

var User=mongoose.model('User');

//��ȡ�����û�
exports.getUsers= function(req, res) {
    User.find({}, function (err, docs) {
        if(err){
            res.json({"status":"error","msg":"�����û�ʧ��"});
        }
        res.json({"status":"success","data":docs});
    })
};

//��ȡĳһ���û�
exports.getUser= function(req, res) {

    var id=req.params.id;

    User.findOne({_id:id},function(err,doc){
        if(err){
            res.json({"status":"error"});
        }else{
            res.json({"status":"success","data":doc})
        }
    });
};

//ɾ��ĳһ���û�
exports.delUser= function(req, res) {

    var id=req.params.id;

    User.remove({_id:id},function(err,doc){
        if(err){
            res.json({"status":"error"});
        }else{
            res.json({"status":"success"})
        }
    });
};

//���һ���û�
exports.addUser= function(req, res) {
    var username=req.body.username;
    var password=req.body.password;

    var newUser=new User(
        {
            username:username,
            password:password
        }
    );
    newUser.save(function(err){
        if(err){
            res.json({"status":"error"})
        }else{
            res.json({"status":"success"});
        }
    });

};

//����ĳ���û�
exports.updateUser= function(req, res) {
    var id=req.params.id;

    var username=req.body.username;
    console.log(username);
    var password=req.body.password;
    console.log(password);

    // �޸ļ�¼
    var conditions ={_id : id};
    var update     ={$set : {username:username, password : password}};
    var options    = {upsert : true};
    User.update(conditions, update, options, function(error){
        if(error) {
            res.json({"status":"error"});
        } else {
            res.json({"status":"success"});
        }
    });
};





//��ȡ�����û�
exports.post= function(req, res) {

    var user=new User(
        {
            username:"amdin",
            password:"123456"
        }
    );
    user.save(function(err){
        if(err){
            res.json({"status":"error","msg":"�����û�ʧ��"});
        }
        res.json({"status":"success","data":user});
    });
};



