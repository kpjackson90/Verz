const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;
const mongoose = require("mongoose");
const Post = mongoose.model("post");
const Comment = mongoose.model("comment");
const User = mongoose.model("user");
const PostType = require("./post_type");
const UserType = require("./user_type");
const CommentType = require("./comment_type");
const AuthService = require("../services/auth");

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createUser: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(parentValue, { email, password }, req) {
        return AuthService.createUser({ email, password, req });
      }
    },
    login: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(parentValue, { email, password }, req) {
        return AuthService.login({ email, password, req });
      }
    },
    verify: {
      type: UserType,
      args: {
        token: { type: GraphQLString }
      },
      resolve(parentValue, { token }, req) {
        return AuthService.verifyToken({ token, req });
      }
    },
    logout: {
      type: UserType,
      resolve(parentValue, args, req) {
        const { user } = req;
        req.logout();
        return user;
      }
    },
    addPost: {
      type: PostType,
      args: {
        title: { type: GraphQLString },
        body: { type: GraphQLString },
        tags: { type: GraphQLList(GraphQLString) }
      },
      resolve(parentValue, { title, body, tags }, context) {
        if (!context.user) {
          throw new Error("You are not authorized");
        } else {
          return new Post({ title, body, tags }).save();
        }
      }
    },
    addCommentToPost: {
      type: PostType,
      args: {
        content: { type: GraphQLString },
        postId: { type: GraphQLID }
      },
      resolve(parentValue, { content, postId }, context) {
        if (!context.user) {
          throw new Error("You are not authorized");
        } else {
          return Post.addComment(postId, content);
        }
      }
    },
    // followUser: {
    //   type: UserType,
    //   args: { id: { type: GraphQLID } },
    //   resolve(parentValue, { id }) {
    //     return User.follow(id);
    //   }
    // },
    favoritePost: {
      type: PostType,
      args: {
        postId: { type: GraphQLID }
      },
      resolve(parentValue, { postId }, context) {
        if (!context.user) {
          throw new Error("You are not authorized");
        } else {
          return User.favorite(postId);
        }
      }
    },
    addUserInfo: {
      type: UserType,
      args: {
        username: { type: GraphQLString },
        bio: { type: GraphQLString },
        location: { type: GraphQLString }
      },
      resolve(parentValue, { username, bio, location }, context) {
        if (!context.user) {
          throw new Error("You are not authorized");
        } else {
          return new User({ username, bio, location }).save();
        }
      }
    }, //do edit/update profile
    deleteUser: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, { id }) {
        return User.remove({ _id: id });
      }
    },
    snapPost: {
      type: PostType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, { id }) {
        return Post.snap(id);
      }
    },
    unsnapPost: {
      type: PostType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, { id }) {
        return Post.unsnap(id);
      }
    },
    snapComment: {
      type: CommentType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, { id }) {
        return Comment.snap(id);
      }
    },
    unsnapComment: {
      type: CommentType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, { id }) {
        return Comment.unsnap(id);
      }
    },
    deletePost: {
      type: PostType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, { id }) {
        return Post.remove({ _id: id });
      }
    } //TODO:- Add Edit Mutation
  }
});

module.exports = mutation;

//Look into this
// router.param('article', function(req, res, next, slug) {
//   Article.findOne({ slug: slug})
//     .populate('author')
//     .then(function (article) {
//       if (!article) { return res.sendStatus(404); }

//       req.article = article;

//       return next();
//     }).catch(next);
// });

// router.param('comment', function(req, res, next, id) {
//   Comment.findById(id).then(function(comment){
//     if(!comment) { return res.sendStatus(404); }

//     req.comment = comment;

//     return next();
//   }).catch(next);
// });

// router.get('/', auth.optional, function(req, res, next) {
//   var query = {};
//   var limit = 20;
//   var offset = 0;

//   if(typeof req.query.limit !== 'undefined'){
//     limit = req.query.limit;
//   }

//   if(typeof req.query.offset !== 'undefined'){
//     offset = req.query.offset;
//   }

//   if( typeof req.query.tag !== 'undefined' ){
//     query.tagList = {"$in" : [req.query.tag]};
//   }

//   Promise.all([
//     req.query.author ? User.findOne({username: req.query.author}) : null,
//     req.query.favorited ? User.findOne({username: req.query.favorited}) : null
//   ]).then(function(results){
//     var author = results[0];
//     var favoriter = results[1];

//     if(author){
//       query.author = author._id;
//     }

//     if(favoriter){
//       query._id = {$in: favoriter.favorites};
//     } else if(req.query.favorited){
//       query._id = {$in: []};
//     }

//     return Promise.all([
//       Article.find(query)
//         .limit(Number(limit))
//         .skip(Number(offset))
//         .sort({createdAt: 'desc'})
//         .populate('author')
//         .exec(),
//       Article.count(query).exec(),
//       req.payload ? User.findById(req.payload.id) : null,
//     ]).then(function(results){
//       var articles = results[0];
//       var articlesCount = results[1];
//       var user = results[2];

//       return res.json({
//         articles: articles.map(function(article){
//           return article.toJSONFor(user);
//         }),
//         articlesCount: articlesCount
//       });
//     });
//   }).catch(next);
// });

// router.get('/feed', auth.required, function(req, res, next) {
//   var limit = 20;
//   var offset = 0;

//   if(typeof req.query.limit !== 'undefined'){
//     limit = req.query.limit;
//   }

//   if(typeof req.query.offset !== 'undefined'){
//     offset = req.query.offset;
//   }

//   User.findById(req.payload.id).then(function(user){
//     if (!user) { return res.sendStatus(401); }

//     Promise.all([
//       Article.find({ author: {$in: user.following}})
//         .limit(Number(limit))
//         .skip(Number(offset))
//         .populate('author')
//         .exec(),
//       Article.count({ author: {$in: user.following}})
//     ]).then(function(results){
//       var articles = results[0];
//       var articlesCount = results[1];

//       return res.json({
//         articles: articles.map(function(article){
//           return article.toJSONFor(user);
//         }),
//         articlesCount: articlesCount
//       });
//     }).catch(next);
//   });
// });

// router.post('/', auth.required, function(req, res, next) {
//   User.findById(req.payload.id).then(function(user){
//     if (!user) { return res.sendStatus(401); }

//     var article = new Article(req.body.article);

//     article.author = user;

//     return article.save().then(function(){
//       console.log(article.author);
//       return res.json({article: article.toJSONFor(user)});
//     });
//   }).catch(next);
// });

// // return a article
// router.get('/:article', auth.optional, function(req, res, next) {
//   Promise.all([
//     req.payload ? User.findById(req.payload.id) : null,
//     req.article.populate('author').execPopulate()
//   ]).then(function(results){
//     var user = results[0];

//     return res.json({article: req.article.toJSONFor(user)});
//   }).catch(next);
// });

// // update article
// router.put('/:article', auth.required, function(req, res, next) {
//   User.findById(req.payload.id).then(function(user){
//     if(req.article.author._id.toString() === req.payload.id.toString()){
//       if(typeof req.body.article.title !== 'undefined'){
//         req.article.title = req.body.article.title;
//       }

//       if(typeof req.body.article.description !== 'undefined'){
//         req.article.description = req.body.article.description;
//       }

//       if(typeof req.body.article.body !== 'undefined'){
//         req.article.body = req.body.article.body;
//       }

//       if(typeof req.body.article.tagList !== 'undefined'){
//         req.article.tagList = req.body.article.tagList
//       }

//       req.article.save().then(function(article){
//         return res.json({article: article.toJSONFor(user)});
//       }).catch(next);
//     } else {
//       return res.sendStatus(403);
//     }
//   });
// });

// // delete article
// router.delete('/:article', auth.required, function(req, res, next) {
//   User.findById(req.payload.id).then(function(user){
//     if (!user) { return res.sendStatus(401); }

//     if(req.article.author._id.toString() === req.payload.id.toString()){
//       return req.article.remove().then(function(){
//         return res.sendStatus(204);
//       });
//     } else {
//       return res.sendStatus(403);
//     }
//   }).catch(next);
// });

// // Favorite an article
// router.post('/:article/favorite', auth.required, function(req, res, next) {
//   var articleId = req.article._id;

//   User.findById(req.payload.id).then(function(user){
//     if (!user) { return res.sendStatus(401); }

//     return user.favorite(articleId).then(function(){
//       return req.article.updateFavoriteCount().then(function(article){
//         return res.json({article: article.toJSONFor(user)});
//       });
//     });
//   }).catch(next);
// });

// // Unfavorite an article
// router.delete('/:article/favorite', auth.required, function(req, res, next) {
//   var articleId = req.article._id;

//   User.findById(req.payload.id).then(function (user){
//     if (!user) { return res.sendStatus(401); }

//     return user.unfavorite(articleId).then(function(){
//       return req.article.updateFavoriteCount().then(function(article){
//         return res.json({article: article.toJSONFor(user)});
//       });
//     });
//   }).catch(next);
// });

// // return an article's comments
// router.get('/:article/comments', auth.optional, function(req, res, next){
//   Promise.resolve(req.payload ? User.findById(req.payload.id) : null).then(function(user){
//     return req.article.populate({
//       path: 'comments',
//       populate: {
//         path: 'author'
//       },
//       options: {
//         sort: {
//           createdAt: 'desc'
//         }
//       }
//     }).execPopulate().then(function(article) {
//       return res.json({comments: req.article.comments.map(function(comment){
//         return comment.toJSONFor(user);
//       })});
//     });
//   }).catch(next);
// });

// // create a new comment
// router.post('/:article/comments', auth.required, function(req, res, next) {
//   User.findById(req.payload.id).then(function(user){
//     if(!user){ return res.sendStatus(401); }

//     var comment = new Comment(req.body.comment);
//     comment.article = req.article;
//     comment.author = user;

//     return comment.save().then(function(){
//       req.article.comments.push(comment);

//       return req.article.save().then(function(article) {
//         res.json({comment: comment.toJSONFor(user)});
//       });
//     });
//   }).catch(next);
// });

// router.delete('/:article/comments/:comment', auth.required, function(req, res, next) {
//   if(req.comment.author.toString() === req.payload.id.toString()){
//     req.article.comments.remove(req.comment._id);
//     req.article.save()
//       .then(Comment.find({_id: req.comment._id}).remove().exec())
//       .then(function(){
//         res.sendStatus(204);
//       });
//   } else {
//     res.sendStatus(403);
//   }
// });
