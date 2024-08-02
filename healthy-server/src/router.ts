import Router from "koa-router"
import userRoute from "./controllers/user"
import projectRoute from "./controllers/project"
import userProjectRoute from "./controllers/userProject"
import packageRoute from "./controllers/hcPackage"
import orderRoute from "./controllers/order"
import imageRoute from "./controllers/image"

const router = new Router()
router.use(userRoute.routes())
router.use(projectRoute.routes())
router.use(userProjectRoute.routes())
router.use(packageRoute.routes())
router.use(orderRoute.routes())
router.use(imageRoute.routes())

export default router
