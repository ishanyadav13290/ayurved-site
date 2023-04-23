const express = require('express');
const app = express();
const cors = require("cors")
const port = process.env.PORT || 3001;
const { connection, UsersModel, orderedProductsModel, ProductsModel} = require("./db");
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const bcrypt = require('bcrypt');
const secret = 'accha-theekHai-samajhGaya';
app.use(express.json({ limit: '50mb' }))
app.use(cors())


app.get("/", (req, res) => {
    res.send("Welcome")
})


function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.sendStatus(401);
  
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) return res.sendStatus(403);
      const user = await UsersModel.findById(decoded.id);
      if (!user) return res.sendStatus(404);
      req.user = user;
      next();
    });
  }


// Users EndPoint

app.get("/users", async (req, res) => {
    const query = req.query;
    try {
        const data = await UsersModel.find(query);
        res.send(data);
    } catch (err) {
        res.status(500).send("Internal Server Error");
    }
});

app.get("/users/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const data = await UsersModel.findById(id);
        if (!data) {
            res.status(404).send("Object not found");
        } else {
            res.send(data);
        }
    } catch (err) {
        res.status(500).send("Internal Server Error");
    }
});

app.post("/users", async (req, res) => {
    const data = req.body;
    try {
        const prevData = await UsersModel.find();
        for(let i of prevData){
            if(i.email==data.email){
                return res.send({error:"User with this email already exists"});
            }
        }
        const member = new UsersModel(data);
        await member.save();
        res.send(data);
    } catch (err) {
        console.log(err)
        res.status(500).send("Internal Server Error");
    }
});

app.patch("/users/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const data = req.body;
        console.log(data, id)
        const updatedObjet = await UsersModel.findOneAndDelete({ _id: id }, data);
        res.send(`Object with ID:${id} has been deleted`);
    }
    catch (err) {
        res.send(err);
    }
})
app.delete("/users/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const deletedObject = await UsersModel.findOneAndUpdate(id);
        if (!deletedObject) {
            res.status(404).send("Object not found");
        } else {
            res.send(`Object with ID:${id} has been deleted`);
        }
    } catch (err) {
        res.status(500).send("Internal Server Error");
    }
});

// orders EndPoint

app.get("/orders", async (req, res) => {
    const query = req.query;
    try {
        const data = await orderedProductsModel.find(query);
        res.send(data);
    } catch (err) {
        res.status(500).send("Internal Server Error");
    }
});

app.get("/orders/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const data = await orderedProductsModel.findById(id);
        if (!data) {
            res.status(404).send("Object not found");
        } else {
            res.send(data);
        }
    } catch (err) {
        res.status(500).send("Internal Server Error");
    }
});

app.post("/orders", async (req, res) => {
    const data = req.body;
    try {
        const member = new orderedProductsModel(data);
        await member.save();
        res.send(data);
    } catch (err) {
        console.log(err)
        res.send(err);
    }
});

app.patch("/orders/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const data = req.body;
        console.log(id)
        const updatedObjet = await orderedProductsModel.findOneAndUpdate({ _id: id }, data);
        res.send(`Object with ID:${id} has been deleted`);
    }
    catch (err) {
        res.status(500).send("Internal Server Error");
    }
})
app.delete("/orders/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const deletedObject = await orderedProductsModel.findOneAndDelete(id);
        if (!deletedObject) {
            res.status(404).send("Object not found");
        } else {
            res.send(`Object with ID:${id} has been deleted`);
        }
    } catch (err) {
        res.status(500).send("Internal Server Error");
    }
});


  //Products products
  app.get("/products", async (req, res) => {
    const query = req.query;
    try {
        const data = await ProductsModel.find(query);
        res.send(data);
    } catch (err) {
        res.status(500).send("Internal Server Error");
    }
});

app.get("/products/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const data = await ProductsModel.findById(id);
        if (!data) {
            res.status(404).send("Object not found");
        } else {
            res.send(data);
        }
    } catch (err) {
        res.status(500).send("Internal Server Error");
    }
});

app.post("/products", async (req, res) => {
    const data = req.body;
    try {
        const member = new ProductsModel(data);
        await member.save();
        res.send(data);
    } catch (err) {
        console.log(err)
        res.send(err);
    }
});

app.patch("/products/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const data = req.body;
        console.log(id)
        const updatedObjet = await ProductsModel.findOneAndUpdate({ _id: id }, data);
        res.send(`Object with ID:${id} has been deleted`);
    }
    catch (err) {
        res.status(500).send("Internal Server Error");
    }
})
app.delete("/products/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const deletedObject = await ProductsModel.findOneAndDelete(id);
        if (!deletedObject) {
            res.status(404).send("Object not found");
        } else {
            res.send(`Object with ID:${id} has been deleted`);
        }
    } catch (err) {
        res.status(500).send("Internal Server Error");
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    const user = await UsersModel.findOne({ email });
    if (!user) {
      return res.json({ message: 'User Not Found' });
    }
  
    // const isPasswordValid = await bcrypt.compare(password, user.password);

    if (user.password != password) {
      return res.json({ message: 'Invalid Password' });
    }
  
    const token = jwt.sign({ userId: user._id }, secret);
  
    res.json({ token,_id:user._id });
  });




app.listen(port, async () => {
    try {
        await connection
        console.log("Connected to db")
    } catch (err) {
        console.log(err)
    }
    console.log("Server Started at PORT", port)
})