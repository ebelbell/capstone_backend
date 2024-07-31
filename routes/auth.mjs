const router = express.Router();


//////////////////// JWT AUTH /////////////////////////
// @route:   GET api/auth
// @desc:    Test route
// @access:  Public
router.get('/', (req, res) => res.send('Auth Route'));

// @route:   GET api/auth
// @desc:    Auth route
// @access:  Private
router.get('/recipe', auth, async (req, res) => {
  try {
    //Get user info from database using user id (Except password)
    const user = await Recipe.findById(req.user.id).select('-password');

    //Send user info to front end
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ errors: [{ msg: 'Server Error' }] });
  }
});


// @route:   POST api/auth
// @desc:    Login and Authenticate User
// @access:  Public
router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password Required').not().isEmpty(),
  ],
  async (req, res) => {
    //Check if any validation errors
    const errors = validationResult(req);

    //If errors return/respond
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //destructure the req
    const { email, password } = req.body;

    try {
      //Find user and check if they exist
      let user = await Recipe.findOne({ email });

      //If they DONT exist return
      if (!Recipe) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      //Check if password match
      const isMatch = await bcrypt.compare(password, user.password);

      //If passwords dont match return
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      //Create a jwt payload
      const payload = {
        user: {
          id: Recipe._id,
        },
      };

      //sign and send jwt in response
      jwt.sign(
        payload,
        process.env.jwtSecret,
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;

          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err);
      res.status(500).json({ errors: [{ msg: 'Server Error' }] });
    }
  }
);

export default router;
/////////////////////////////////////////////////////////////