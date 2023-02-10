const { Router } = require("express");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const router = Router();

// /api/auth/register
router.post(
  "/register",
  [
    check("email", "Невалідний емейл").isEmail(),
    check("password", "Мінімальна довжина пароля 6 символів").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Некоректні дані при реєстрації",
        });
      }
      const { email, password } = req.body;
      const candidate = await User.findOne({ email });
      if (candidate) {
        res.status(400).json({ message: "Такий юзер вже існує" });
      }
      const hashedPassword = await bcrypt.hash(password, 12)
      const user = new User({ email, password: hashedPassword });
      await user.save();

      res.status(201).json({ message: "Юзер створений" });
      return
    } catch (error) {
      res
        .status(500)
        .json({ message: "Щось пішло не так, спробуйте знову (/register)", error });
    }
  }
);
// /api/auth/login
router.post(
  "/login",
  [
    check("email", "Введіть коректний емейл").normalizeEmail().isEmail(),
    check("password", "Введіть пароль").exists({
      min: 6,
    }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Некоректні дані при вході в систему",
        });
      }

      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        res.status(400).json({ message: "Такого юзера не знайдено" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        res.status(400).json({ message: "Невірний пароль, спробуйте ще раз" });
      }

      const token = jwt.sign(
        {
          userId: user.id,
        },
        config.get("jwtSecret"),
        { expiresIn: "1h" }
      );

      res.json({ token, userId: user.id });
      return
    } catch (error) {
      res
        .status(500)
        .json({ message: "Щось пішло не так, спробуйте знову (/register)" });
    }
  }
);

module.exports = router;
