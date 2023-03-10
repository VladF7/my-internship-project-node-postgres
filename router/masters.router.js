const Router = require('express')
const router = new Router()
const mastersController = require('../controllers/masters.controller')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/getMastersList', mastersController.getFreeMasters)
router.get('/', authMiddleware, mastersController.getMasters)
router.get('/:id', authMiddleware, mastersController.getMasterById)
router.post('/',authMiddleware, mastersController.addMaster)
router.put('/:id', authMiddleware, mastersController.editMaster)
router.delete('/:id', authMiddleware, mastersController.delMaster)


module.exports = router
