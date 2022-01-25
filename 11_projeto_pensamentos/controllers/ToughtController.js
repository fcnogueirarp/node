const Tought = require('../models/Tought');
const User = require('../models/User');

module.exports = class ToughtController {
  static async showToughts(req, res) {
    const toughtsData = await Tought.findAll({
      include: User,
    });
    const toughts = toughtsData.map(result => result.get({ plain: true }));

    await res.render('toughts/home', { toughts });
  }

  static async updateTought(req, res) {
    const id = req.params.id;

    const tought = await Tought.findOne({ raw: true, where: { id: id } });
    console.log(tought);
    res.render('toughts/edit', { tought });
  }

  static async updateToughtPost(req, res) {
    const id = req.body.id;

    const tought = {
      title: req.body.title,
    };
    await Tought.update(tought, { where: { id: id } });

    req.flash('message', 'Pensamento atualizado com sucesso');
    try {
      req.session.save(() => {
        res.redirect('/toughts/dashboard');
      });
    } catch (err) {
      console.log(err);
    }
  }

  static async dashboard(req, res) {
    const UserId = req.session.UserId;

    const user = await User.findOne({
      where: {
        id: UserId,
      },
      include: Tought,
      plain: true,
    });

    //check if user exists
    if (!user) {
      res.redirect('login');
    }
    const toughts = user.Toughts.map(result => result.dataValues);

    let emptyToughts = false;

    if (toughts.length === 0) {
      emptyToughts = true;
    }

    res.render('toughts/dashboard', { toughts, emptyToughts });
  }

  static createTought(req, res) {
    res.render('toughts/create');
  }

  static createToughtSave(req, res) {
    const tought = {
      title: req.body.title,
      UserId: req.session.UserId,
    };

    Tought.create(tought)
      .then(() => {
        req.flash('message', 'Pensamento criado com sucesso!');
        req.session.save(() => {
          res.redirect('/toughts/dashboard');
        });
      })
      .catch(err => console.log());
  }

  static async removeTought(req, res) {
    const id = req.body.id;
    const UserId = req.session.UserId;

    try {
      await Tought.destroy({ where: { id: id, UserId: UserId } });
      req.flash('message', 'Pensamento removido com sucesso!');

      req.session.save(() => {
        res.redirect('/toughts/dashboard');
      });
    } catch (err) {
      console.log(`Aconteceu um erro ${err}`);
    }
  }
};
