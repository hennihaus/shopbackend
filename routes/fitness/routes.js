const Day = require('../../models/fitness/day');
const Exercise = require('../../models/fitness/exercise');
const Food = require('../../models/fitness/food');
const Profile = require('../../models/fitness/profile');
const verifyToken = require('../session/verifyToken');

module.exports = function(app){

    app.post('/fitness/food/', verifyToken,function (req,res){
        try{
            let foodData = req.body;

            let food = new Food(foodData);
            food.save(function (err){
                if(err){
                    res.status(422).send("Data are not correct!");
                }else{
                    res.status(201).send("Insert was successful!");
                }
            });
        }catch(error){
            let errorObj = {body:req.body,errorMessage:"Server error!" };
            res.status(500).send(errorObj);   
        }
     });


     app.post('/fitness/exercise/', verifyToken,function (req,res){
        try{
            let exerciseData = req.body;

            let exercise = new Exercise(exerciseData);
            exercise.save(function (err){
                if(err){
                    res.status(422).send("Data are not correct!");
                }else{
                    res.status(201).send("Insert was successful!");
                }
            });
        }catch(error){
            let errorObj = {body:req.body,errorMessage:"Server error!" };
            res.status(500).send(errorObj);   
        }
     });



     app.post('/fitness/profile/', verifyToken,function (req,res){
        try{
            let profileData = req.body;
            profileData.userId = req.user.id;
            let profile = new Profile(profileData);
            profile.save(function (err){
                if(err){
                    res.status(422).send("Data are not correct!");
                }else{
                    res.status(201).send("Insert was successful!");
                }
            });
        }catch(error){
            let errorObj = {body:req.body,errorMessage:"Server error!" };
            res.status(500).send(errorObj);   
        }
     });


     app.post('/fitness/day/', verifyToken,async function (req,res){
        try{
            let dayData = req.body;
            let days = await Day.find({profileId:dayData.profileId,date:dayData.date});
            if(!days.length){
                let day = new Day(dayData);
                day.save(function (err){
                    if(err){
                        res.status(422).send("Data are not correct!");
                    }else{
                        res.status(201).send("Insert was successful!");
                    }
                });
            }
        }catch(error){
            let errorObj = {body:req.body,errorMessage:"Server error!" };
            res.status(500).send(errorObj);   
        }
     });





    app.get('/fitness/exercises', async function (req,res){
        try{
            let exercises = await Exercise.find();
            res.status(200).send(exercises);
        }catch(error){
            let errorObj = {body:req.body,errorMessage:"Server error!" };
            res.status(500).send(errorObj);   
        }
    });

    app.get('/fitness/food', async function (req,res){
        try{
            let food = await Food.find();
            res.status(200).send(food);
        }catch(error){
            let errorObj = {body:req.body,errorMessage:"Server error!" };
            res.status(500).send(errorObj);   
        }
     });

     app.get('/fitness/food/food',async function (req,res){
        try{
            let food = await Food.find({drink: false});
            res.status(200).send(food);
        }catch(error){
            let errorObj = {body:req.body,errorMessage:"Server error!" };
            res.status(500).send(errorObj);   
        }
     });

     app.get('/fitness/food/drink',async function (req,res){
        try{
            let drinks = await Food.find({drink: true});
            res.status(200).send(drinks);
        }catch(error){
            let errorObj = {body:req.body,errorMessage:"Server error!" };
            res.status(500).send(errorObj);   
        }
     });

     app.get('/fitness/profiles',verifyToken, async function (req,res){
        try{
            let profiles = await Profile.find({userId:req.user.id});
            res.status(200).send(profiles);
        }catch(error){
            let errorObj = {body:req.body,errorMessage:"Server error!" };
            res.status(500).send(errorObj);   
        }
     });


     app.get('/fitness/days/:profileId',verifyToken, async function (req,res){
        try{
            let days = await Day.find({profileId:req.params.profileId});
            res.status(200).send(days);
        }catch(error){
            let errorObj = {body:req.body,errorMessage:"Server error!" };
            res.status(500).send(errorObj);   
        }
     });

     app.get('/fitness/day/:profileId/:date',verifyToken, async function (req,res){
        try{
            let day = await Day.find({date:req.params.date,profileId:req.params.profileId});
            res.status(200).send(day);
        }catch(error){
            let errorObj = {body:req.body,errorMessage:"Server error!" };
            res.status(500).send(errorObj);   
        }
     });





     app.put('/fitness/food/', verifyToken,function (req,res){
        try{
            let foodData = req.body;
            let updatedFoodData = {    
                name:foodData.name,
                baseAmount:foodData.baseAmount,
                energy:foodData.energy,
                fat:foodData.fat,
                carbohydrates:foodData.carbohydrates,
                protein:foodData.protein,
                salt:foodData.salt,
                fiber:foodData.fiber,
                drink:foodData.drink
            }
            Food.findByIdAndUpdate({_id:req.body.foodId},updatedFoodData, (err,result)=>{
                if(err){
                    res.status(422).send("Data are not correct!");
                }else{
                    res.status(201).send("Update was successful!");
                }
            });
        }catch(error){
            let errorObj = {body:req.body,errorMessage:"Server error!" };
            res.status(500).send(errorObj);   
        }
     });


     app.put('/fitness/exercise/', verifyToken,function (req,res){
        try{
            let exerciseData = req.body;
            let updatedExerciseData = {    
                name:exerciseData.name,
                baseTime:exerciseData.baseTime,
                energyBurned:exerciseData.energyBurned,
            }
            Exercise.findByIdAndUpdate({_id:req.body.exerciseId},updatedExerciseData, (err,result)=>{
                if(err){
                    res.status(422).send("Data are not correct!");
                }else{
                    res.status(201).send("Update was successful!");
                }
            });
        }catch(error){
            let errorObj = {body:req.body,errorMessage:"Server error!" };
            res.status(500).send(errorObj);   
        }
     });

     app.put('/fitness/profile/', verifyToken,function (req,res){
        try{
            let profileData = req.body;
            let updatedProfileData = {    
                name:profileData.name,
                age:profileData.age,
                height:profileData.height,
                weight:profileData.weight,
                sex:profileData.sex,
                userId:req.user.id
            }
            Profile.findByIdAndUpdate({_id:req.body.profileId},updatedProfileData, (err,result)=>{
                if(err){
                    res.status(422).send("Data are not correct!");
                }else{
                    res.status(201).send("Update was successful!");
                }
            });
        }catch(error){
            let errorObj = {body:req.body,errorMessage:"Server error!" };
            res.status(500).send(errorObj);   
        }
     });


     app.put('/fitness/day/', verifyToken,function (req,res){
        try{
            let dayData = req.body;
            let updatedDayData = {    
                food:dayData.food,
                exercise:dayData.exercise,
            }
            Day.findByIdAndUpdate({_id:req.body.dayId},updatedDayData, (err,result)=>{
                if(err){
                    res.status(422).send("Data are not correct!");
                }else{
                    res.status(201).send("Update was successful!");
                }
            });
        }catch(error){
            let errorObj = {body:req.body,errorMessage:"Server error!" };
            res.status(500).send(errorObj);   
        }
     });









     app.delete('/fitness/exercise/:exerciseId', verifyToken,async function (req,res){
        try{
            await Exercise.deleteOne({_id:req.params.exerciseId}).then(()=>{
                res.status(201).send("Delete was successful!");
            }).catch(err =>{
                res.status(500).send({err:err});
            })
        }catch(error){
            let errorObj = {body:req.body,errorMessage:"Server error!" };
            res.status(500).send(errorObj);   
        }
    });


    app.delete('/fitness/food/:foodId', verifyToken,async function (req,res){
        try{
            await Food.deleteOne({_id:req.params.foodId}).then(()=>{
                res.status(201).send("Delete was successful!");
            }).catch(err =>{
                res.status(500).send({err:err});
            })
        }catch(error){
            let errorObj = {body:req.body,errorMessage:"Server error!" };
            res.status(500).send(errorObj);   
        }
    });


    app.delete('/fitness/day/:dayId', verifyToken,async function (req,res){
        try{
            await Day.deleteOne({_id:req.params.dayId}).then(()=>{
                res.status(201).send("Delete was successful!");
            }).catch(err =>{
                res.status(500).send({err:err});
            })
        }catch(error){
            let errorObj = {body:req.body,errorMessage:"Server error!" };
            res.status(500).send(errorObj);   
        }
    });

    app.delete('/fitness/profile/:profileId', verifyToken,async function (req,res){
        try{
            await Day.deleteMany({profileId:req.params.profileId}).then(async ()=>{
                await Profile.deleteOne({_id:req.params.profileId}).then(()=>{
                    res.status(201).send("Delete was successful!");
                }).catch(err =>{
                    res.send({err:err});
                });
            }).catch(err=>{
                res.send({err:err,msg:"Deleting all days for this profile went wrong!"});
            });
        }catch(error){
            let errorObj = {body:req.body,errorMessage:"Server error!" };
            res.status(500).send(errorObj);   
        }
    });




}