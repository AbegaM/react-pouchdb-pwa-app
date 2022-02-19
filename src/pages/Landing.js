import React, { useState, useEffect } from "react";
import server from "../server";

import Header from "../components/Header";
import Table from "../components/Table";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  content: {
    marginLeft: "2%",
    marginRight: "2%",
    flexGrow: 1,
    height: "100vh",
    paddingTop: theme.spacing(9),
    overflow: "auto",
    // backgroundColor: "rgba(65, 63, 63, 0.030)",
  },
  button: {
    float: "right",
    marginRight: "2%",
    marginBottom: theme.spacing(2),
    background: "#1976d2",
    "&:hover": {
      background: "#447fb9",
    },
  },
}));

// function createData(name, calories, fat, carbs) {
//     return { name, calories, fat, carbs };
//   }

//   const rows = [
//     createData('Frozen yoghurt', 159, 6.0, 24),
//     createData('Ice cream sandwich', 237, 9.0, 37),
//     createData('Eclair', 262, 16.0, 24),
//     createData('Cupcake', 305, 3.7, 67),
//     createData('Gingerbread', 356, 16.0, 49),
//   ];

export default function Landing() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
    remark: "",
  });
  const [productList, setProductList] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setProduct({ ...product, [event.target.name]: event.target.value });
  };

  const getProductList = async () => {
    const productData = await server.getProducts();
    setProductList(productData);
  };

  const saveProduct = async (e) => {
    const productData = await server.createProduct(product);
    getProductList();
    setOpen(false);
    setProduct({ name: "", category: "", price: "", remark: "" });
  };

  useEffect(() => {
    getProductList();
  }, []);

  return (
    <div>
      <Header />
      <main className={classes.content}>
        <Button
          className={classes.button}
          variant="contained"
          size="medium"
          color="primary"
          onClick={handleClickOpen}
        >
          Add Product
        </Button>
        <Table rows={productList} />

        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add Product</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              value={product.name}
              onChange={handleChange}
              margin="dense"
              name="name"
              label="Name of the product"
              type="text"
              fullWidth
            />
            <TextField
              autoFocus
              value={product.category}
              onChange={handleChange}
              margin="dense"
              name="category"
              label="Category"
              type="text"
              fullWidth
            />
            <TextField
              autoFocus
              value={product.price}
              onChange={handleChange}
              margin="dense"
              name="price"
              label="Price"
              type="text"
              fullWidth
            />
            <TextField
              autoFocus
              value={product.remark}
              onChange={handleChange}
              margin="dense"
              name="remark"
              label="Remark"
              type="text"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={saveProduct} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </main>
    </div>
  );
}
