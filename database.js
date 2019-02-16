var MongoClient = require('mongodb').MongoClient,
    ObjectID = require('mongodb').ObjectID,
    ISODate = require('mongodb').ISODate;

var dbURL = "mongodb://localhost:27017/adam";
var userCollection = 'users',
    dishesCollection = 'dishes',
    ordersCollection = 'orders';


exports.getUsers = function(callback){
    MongoClient.connect(dbURL, function(error, db){

        if(!error){
            var collection = db.collection(userCollection);

            collection.find().toArray(function(err, users){
                db.close();

                if(!err){
                    callback(users);
                }
            });
        }
        else{
            callback([]);
        }


    });
}

exports.getUser = function(user_id, callback){
    MongoClient.connect(dbURL, function(error, db){

        if(!error){
            var collection = db.collection(userCollection);

            collection.find({_id: ObjectID(user_id)}).toArray(function(err, users){
                db.close();

                if(!err && users.length > 0){
                    callback(users[0]);
                }
            });
        }
        else{
            callback(null);
        }


    });
}

exports.getUserOrders = function(user_id, callback){
    MongoClient.connect(dbURL, function(error, db){

        if(!error){
            var collection = db.collection(ordersCollection);

            collection.find({UserId: user_id}).toArray(function(err, orders){
                db.close();

                callback(orders);
            });
        }
        else{
            callback(null);
        }
    });
}

exports.getOrders = function(callback){
    MongoClient.connect(dbURL, function(error, db){

        if(!error){
            var collection = db.collection(ordersCollection);

            collection.find().toArray(function(err, orders){
                db.close();

                callback(orders);
            });
        }
        else{
            callback(null);
        }


    });
}

exports.getDishes = function(callback){
    MongoClient.connect(dbURL, function(error, db){

        if(!error){
            var collection = db.collection(dishesCollection);

            collection.find().toArray(function(err, dishes){
                db.close();

                if(!err){
                    callback(dishes);
                }
            });
        }
        else{
            callback([]);
        }


    });
}

exports.getDish = function(dish_id, callback){
    MongoClient.connect(dbURL, function(error, db){

        if(!error){
            var collection = db.collection(dishesCollection);

            collection.find({_id: ObjectID(dish_id)}).toArray(function(err, dishes){
                db.close();

                if(!err && dishes.length > 0){
                    callback(dishes[0]);
                }
            });
        }
        else{
            callback(null);
        }


    });
}

exports.getDishOrders = function(dish_id, callback){
    MongoClient.connect(dbURL, function(error, db){

        if(!error){
            var collection = db.collection(ordersCollection);

            collection.find({DishId: dish_id}).toArray(function(err, orders){
                db.close();

                callback(orders);
            });
        }
        else{
            callback(null);
        }


    });
}

exports.updateFirebaseToken = function(user_id, firebase_id, callback){
    console.log(user_id);
    MongoClient.connect(dbURL, function(error, db){
        if(!error){
            var collection = db.collection(userCollection);

            collection.updateOne({_id: new ObjectID(user_id)}, {$set: {'firebase_id': firebase_id}}, function(err, res){

                
                if(!err){
                    callback({status: 'success'});
                }
                else{
                    console.log(err);
                    callback({status: err});
                }

                db.close();

            });

        }
        else{
            console.log(error);
            callback({status: error});
        }
    });
}