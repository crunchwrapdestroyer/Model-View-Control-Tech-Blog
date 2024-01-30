// Pseudocode for Express.js middleware functions related to user authentication
const withGuard = (req, res, next) => {
  // Check if the user is not logged in
  if (!req.session.logged_in) {
    // Redirect the request to the login route
    res.redirect('/login');
  } else {
    // Continue to the next middleware or route handler
    next();
  }
};

// Export the middleware 
module.exports = { withGuard };
