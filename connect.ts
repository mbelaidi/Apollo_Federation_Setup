import mongoose from "mongoose";

type Path = { db: string };

export default ({ db }: Path) => {
  const connect = () => {
    mongoose
      .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => {
        return console.info(`Successfully connected to Database`);
      })
      .catch((error: any) => {
        console.error("Error connecting to database: ", error);
        return process.exit(1);
      });
    mongoose.set("useCreateIndex", true);
  };
  connect();

  mongoose.connection.on("disconnected", connect);
};
