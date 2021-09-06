const express   = require("express");
const app       = express();

const conf      = require("./config/config");
const sequelize = require("./models").sequelize;
const routers   = require("./routers");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(conf.SESSION);

app.use("/",            routers.indexRouter);
app.use("/user",        routers.userRouter);
app.use("/address",     routers.addressRouter);
app.use("/life",        routers.lifeRouter);

sequelize.sync()
    .then(_ => app.listen(conf.PORT, () => console.log(`Starting server at ${conf.PORT} port.`)))
    .catch(e => console.log(`Failed to start server.\nReason::${e}`))