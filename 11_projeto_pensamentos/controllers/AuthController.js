const User = require('../models/User');
const Tought = require('../models/Tought');

const bcrypt = require('bcryptjs');

module.exports = class AuthControle {
  static login(req, res) {
    res.render('auth/login');
  }

  static async loginPost(req, res) {
    const { email, password } = req.body;
    //find user by email
    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      res.render('auth/login');
      req.flash('message', 'Usuário não encontrado');
      return;
    }

    //check if password match
    const passwordMatch = bcrypt.compareSync(password, user.password);
    if (!passwordMatch) {
      res.render('auth/login');
      req.flash('message', 'Senha invalida');
    }
    //initialize session
    req.session.UserId = user.id;

    req.flash('message', 'Autenticação realizada com sucesso!');

    req.session.save(() => {
      res.redirect('/');
    });
  }

  static register(req, res) {
    res.render('auth/register');
  }

  static async registerPost(req, res) {
    const { name, email, password, confirmpassword } = req.body;

    //password match validation
    if (password != confirmpassword) {
      req.flash('message', 'As senhas não conferem, tente novamente');
      res.render('auth/register');

      return;
    }

    //check if user exists
    const checkIfUserExists = await User.findOne({ where: { email: email } });

    if (checkIfUserExists) {
      req.flash('message', 'O e-mail já está em uso');
      res.render('auth/register');

      return;
    }

    //create a password confirmation
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const user = {
      name,
      email,
      password: hashedPassword,
    };
    try {
      const createdUser = await User.create(user);

      //initialize session
      req.session.UserId = createdUser.id;
      req.flash('message', 'Cadastro realizado com sucesso!');

      req.session.save(() => {
        res.redirect('/');
      });
    } catch (err) {
      console.log(err);
    }
  }
  static logout(req, res) {
    req.session.destroy();
    res.redirect('/login');
  }

  
};
