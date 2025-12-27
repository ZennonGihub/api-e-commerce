import express from ('express');
import passport from ('passport');
import { checkRoles } from ('../middlewares/auth.handler');
import { getMyOrder } from ('../controller/profile.controller');

const router = express.Router();

router.get(
  '/my-orders',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin', 'seller', 'user'),
  getMyOrder,
);

module.exports = router;
