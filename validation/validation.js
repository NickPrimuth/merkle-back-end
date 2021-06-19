module.exports = {
  validate: (req, res, next) => {
    try {
      // Loop over req.body props to validate each item
      const props = Object.keys(req.body);

      props.forEach((prop) => {
        const value = req.body[prop];
        if (['firstName', 'lastName', 'city', 'state'].includes(prop)) {
          // Place error if contains chars other than letters
          if (!/^[a-zA-Z]/.test(value.trim())) {
            throw new Error(`${prop} should only contain letters`);
          }
        } else if (prop === 'addressOne') {
          // Place error if contains chars other than letters or nums
          if (!/^[A-Za-z0-9]/.test(value.trim())) {
            throw new Error(
              `Address One should only contain letters or numbers`
            );
          }
        } else if (prop === 'addressTwo') {
          // Place error if contains chars other than letters or nums or null
          if (!/^[A-Za-z0-9]/.test(value.trim()) && value.length !== 0) {
            throw new Error(`Address 2 should only contain letters or numbers`);
          }
        } else if (prop === 'zip') {
          // Place error message if zip has chars other than numbers
          if (!/^[0-9]/.test(value.trim())) {
            throw new Error(`Zip should only contain numbers`);
          } else {
            // Place error message if zip isn't 5 or 9 digits
            if (value.trim().length !== 5 && value.trim().length !== 9) {
              throw new Error(`Zip should be 5 or 9 digits`);
            }
          }
        } else if (value.trim() !== 'US') {
          // Place error message if country isn't US or us
          throw new Error(`Country can only be US`);
        }
      });
      // If no error is found, move to next middleware
      return next();
    } catch (e) {
      // If error is thrown, call error middleware with error
      return next(e);
    }
  },
};
