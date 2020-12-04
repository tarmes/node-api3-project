const Users = require('../users/userDb')

function logger(req, res, next) {
   console.log(`[timestamp: ${new Date().toISOString()}] method: ${req.method}, url: ${req.url}, `)
   next()
}
const validateUserId = async (req, res, next) => {
   const { id } = req.params;
   try {
      const user = await Users.getById(id);
      if (!user) {
         res.status(404).json({ message: `User with id ${id} not found.`})
      } else {
         req.user = user;
         next();
      }
   } catch (error) {
      res.status(400).json({message: "invalid user id."})
   }
}

function validateUser(req, res, next) {
   if (!req.body.name) {
      res.status(400).json({ message: "missing required name field"})
   } else {
      next();
   }
}

function validatePost(req, res, next) {
   if (!req.body) {
      res.status(400).json({ message: "missing post data"})
   } else if (!req.text) {
      res.status(400).json({ message: "missing required text field"})
   } else {
      next()
   }   
}

module.exports = {
   logger,
   validateUserId,
   validateUser,
   validatePost
}