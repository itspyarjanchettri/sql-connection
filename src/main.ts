import express, { Request, Response, NextFunction } from "express";
import { categoryRouter } from "./routes/category.router";
import { userRouter } from "./routes/users.router";
import { productsrouter } from "./routes/products.router";
import o_router from "./routes/order.router";
import router from "./routes/authentication.router";

const app = express();

app.use(express.json());
app.use("/products", productsrouter);
app.use("/category", categoryRouter);
app.use("/users", userRouter);
app.use("/orders", o_router);
app.use("/auth", router)

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  console.log("Error Received", error);
  if (error.status === 404 || error.status === 400 || error.status === 403) {
    res.status(error.status).json({ error });
    return;
  }

  res.status(500).json({ error: "Internal Server Error" });
});
app.listen(4000, () => {
  console.log("Server running on http://localhost:4000");
});
app.use("/products", productsrouter);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
