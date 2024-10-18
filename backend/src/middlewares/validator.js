const registerValidation = (req, res, next) => {
  try {
    const { email, password } = req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      res.staus(400).json({ message: "Invalid email format" });
    }
    // - Minimum 8 characters
    // - At least one lowercase letter
    // - At least one uppercase letter
    // - At least one number
    // - At least one special character from @$!%*?&
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      res.staus(400).json({ message: "Invalid password format" });
    }
    next();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
export default registerValidation;
