import userRouter from "./userRoutes.js"
import postRouter from "./postRoutes.js"
import commentRouter from "./commentRoutes.js"

app.use('/user', userRouter);
app.use('/post', postRouter)
app.use('/comment', commentRouter)

export default Router
