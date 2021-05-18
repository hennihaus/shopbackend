const Article = require('../../models/fastfood/article');
const Category = require('../../models/fastfood/category');
const Order = require('../../models/fastfood/order');
const Comment = require('../../models/fastfood/comment');
const verifyToken = require('../session/verifyToken');

module.exports = function(app){
    app.get('/fastfood/articles', async function (req,res){
        try{
            let articles = await Article.find();
            res.status(200).send(articles);
        }catch(error){
            let errorObj = {body:req.body,errorMessage:"Server error!" };
            res.status(500).send(errorObj);   
        }
    });

    app.get('/fastfood/articles/:categoryId', async function (req,res){
        try{
            let articles = await Article.find({categoryId:req.params.categoryId});
            res.status(200).send(articles);
        }catch(error){
            let errorObj = {body:req.body,errorMessage:"Server error!" };
            res.status(500).send(errorObj);   
        }
     });


     app.get('/fastfood/article/:articleId', async function (req,res){
        try{
            let article = await Article.findById(req.params.articleId);
            res.status(200).send(article);
        }catch(error){
            let errorObj = {body:req.body,errorMessage:"Server error!" };
            res.status(500).send(errorObj);   
        }
     });


     app.get('/fastfood/categories/', async function (req,res){
        try{
            let categories = await Category.find();
            res.status(200).send(categories);
        }catch(error){
            let errorObj = {body:req.body,errorMessage:"Server error!" };
            res.status(500).send(errorObj);   
        }
     });


     app.get('/fastfood/comments/:articleId',async function (req,res){
        try{
            let comments = await Comment.find({articleId: req.params.articleId});
            res.status(200).send(comments);
        }catch(error){
            let errorObj = {body:req.body,errorMessage:"Server error!" };
            res.status(500).send(errorObj);   
        }
     });


     app.get('/fastfood/orders/',verifyToken, async function (req,res){
        try{
            let orders = await Order.find({userId:req.user.id});
            res.status(200).send(orders);
        }catch(error){
            let errorObj = {body:req.body,errorMessage:"Server error!" };
            res.status(500).send(errorObj);   
        }
     });







     app.post('/fastfood/order/', verifyToken,function (req,res){
        try{
            let orderData = req.body;

            let order = new Order(orderData);
            order.save(function (err){
                if(err){
                    res.status(422).send("Data are not correct!");
                }else{
                    res.status(201).send("Order was successful!");
                }
            });
        }catch(error){
            let errorObj = {body:req.body,errorMessage:"Server error!" };
            res.status(500).send(errorObj);   
        }
     });


     app.post('/fastfood/comment/', verifyToken,async function (req,res){
        try{
            let orders = await Order.find({userId: req.user.id}).sort({orderNr:'desc'});
            let boughtArticle = false;

            loop:
            for(let i=0; i < orders.length; i++){
                for(let j =0; j < orders[i].articles.length;j++){
                    if(req.body.articleId == orders[i].articles[j].articleId){
                        boughtArticle = true;
                        break loop;
                    }
                }
            }


            if(boughtArticle){
                let commentData = req.body;
                let comment = new Comment(commentData);
                comment.save(function (err){
                    if(err){
                        res.status(422).send("Data are not correct!");
                    }else{
                        res.status(201).send("Comment was successful!");
                    }
                });
            }else{
                res.status(422).send("Article was not bought!");
            }
        }catch(error){
            let errorObj = {body:req.body,errorMessage:"Server error!" };
            res.status(500).send(errorObj);   
        }
     });


     app.post('/fastfood/rate/', verifyToken,async function (req,res){
        try{
            let orders = await Order.find({userId: req.user.id}).sort({orderNr:'desc'});

            let boughtArticle = false;
            loop:
            for(let i=0; i < orders.length; i++){
                for(let j =0; j < orders[i].articles.length;j++){
                    if(req.body.articleId == orders[i].articles[j].articleId){
                        boughtArticle = true;
                        break loop;
                    }
                }
            }


            if(boughtArticle){

                let ratings = await Rate.find({articleId: req.body.articleId});

                let newRating =0;
                let rated =false;
                for(let i=0; i < ratings.length;i++){

                    if(ratings[i].userId == req.user.id){
                        rated = true;
                        break;
                    }
                    newRating =  newRating + rating[i];
                }


                if(!rated){

                    newRating = newRating + req.body.rate;
                    newRating = newRating / (ratings.length+1);

                    await Article.findByIdAndUpdate({_id:req.body.articleId},{"rating":newRating});

                    let rateData = req.body;
                    let rate = new Rate(rateData);
                    rate.save(function (err){
                        if(err){
                            res.status(422).send("Data are not correct!");
                        }else{
                            res.status(201).send("Rating was successful!");
                        }
                    });
                }else{
                    res.status(422).send("Article was already rated!");
                }
            }else{
                res.status(422).send("Article was not bought, can not be rated!");
            }

        }catch(error){
            let errorObj = {body:req.body,errorMessage:"Server error!" };
            res.status(500).send(errorObj);   
        }
     });



     app.post('/fastfood/category', verifyToken,function(req,res){
        try{
            let categoryData = req.body;

            let category = new Category(categoryData);
            category.save(function (err){
                if(err){
                    res.status(422).send("Data are not correct!");
                }else{
                    res.status(201).send("Category was successfully added!");
                }
            });
        }catch(error){
            let errorObj = {body:req.body,errorMessage:"Server error!" };
            res.status(500).send(errorObj);   
        }
     });


     app.post('/fastfood/article', verifyToken,function(req,res){
        try{
            let articleData = req.body;

            let article = new Article(articleData);
            article.save(function (err){
                if(err){
                    res.status(422).send("Data are not correct!");
                }else{
                    res.status(201).send("Article was successfully added!");
                }
            });
        }catch(error){
            let errorObj = {body:req.body,errorMessage:"Server error!" };
            res.status(500).send(errorObj);   
        }
     });
}