import React, { useState, useEffect } from "react";
import ProductForm from "./components/ProductForm";
import DataTable, { createTheme } from "react-data-table-component";
import axios from "axios";
import "./App.css";

const productUrl = "https://lobster-app-ddwng.ondigitalocean.app/product/list";
const url = "https://lobster-app-ddwng.ondigitalocean.app/product/add_new";

function App(props) {
  const [search, setSearch] = useState("");
  const [allproducts, setAllProducts] = useState([]);
  const [filterdProducts, setFilteredProducts] = useState([]);

  const setProd = (data) => {
    console.log("setprod", data);
    axios
      .post(
        url,
        {
          product_name: data.product_name,
          original_price: data.original_price,
          sale_price: data.sale_price,
          product_type: data.product_type,
          description: data.description,
          date_n_time: data.date_n_time,
        },
        {
          headers: {
            api_key: "Z9Q7WKEY7ORGBUFGN3EG1QS5Y7FG8DU29GHKKSZH", //apikey for post
          },
        }
      )
      .then((response) => {
        console.log(response);
        getAllData();
        alert("Product Created Successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getAllData();
  }, []);

  useEffect(() => {
    const result = allproducts.filter((eachProd) => {
      return eachProd.product_name.toLowerCase().match(search.toLowerCase());
    });
    setFilteredProducts(result);
  }, [allproducts, search]);

  const getAllData = () => {
    axios
      .get(productUrl, {
        headers: { api_key: "Z9Q7WKEY7ORGBUFGN3EG1QS5Y7FG8DU29GHKKSZH" }, // api key  for get data
      })
      .then((response) => {
        console.log(response.data.message);
        setAllProducts(response.data.message);
        setFilteredProducts(response.data.message);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const columns = [
    {
      name: "Product ID",
      selector: (row) => row._id,
    },
    {
      name: "Product Name",
      selector: (row) => row.product_name,
      sortable: true,
    },
    {
      name: "Original Price",
      selector: (row) => row.original_price,
    },
    {
      name: "Sale Price",
      selector: (row) => row.sale_price,
    },
    {
      name: "Product Type",
      selector: (row) => row.product_type,
    },
    {
      name: "Description",
      selector: (row) => row.description,
    },
    {
      name: "Date and Time",
      selector: (row) => row.description,
    },
  ];

  createTheme(
    "solarized",
    {
      text: {
        primary: "#268bd2",
        secondary: "#1b54c4",
      },
      background: {
        default: "#141b23;",
      },
      context: {
        background: "#cb4b16",
        text: "#FFFFFF",
      },
      divider: {
        borderRadius: "5px",
      },
      action: {
        button: "rgba(0,0,0,.54)",
        hover: "#fff",
        disabled: "rgba(0,0,0,.12)",
      },
    },
    "dark"
  );
  const customStyles = {
    table: {
      style: {
        backgroundColor: "#101339",
        border: "0px solid #fff",
      },
    },
    headCells: {
      style: {
        fontWeight: "700",
        fontSize: "15px",
        color: "#fff",
        border: "0px solid #fff",
        opacity: "0.8",
        textAlign: "center",
      },
    },
    rows: {
      style: {
        fontSize: "15px",
        color: "#fff",
        opacity: "0.7",
      },
    },
    cells: {
      style: {
        border: "0px solid #fff",
      },
    },
  };

  return (
    <div className="App ">
      <div className="container">
        <ProductForm setdata={setProd} />
     
      <div className="data_table_container">
        <h4>All Products</h4>
        <DataTable
          className="data_tab"
          columns={columns}
          data={filterdProducts}
          pagination
          fixedHeader
          selectableRowsHighlight
          highlightOnHover
          subHeader
          center
          keyField="_id"
          pointerOnHover
          theme="solarized"
          subHeaderComponent={
            <input
              type="text"
              placeholder="Search here"
              className="formControl"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          }
          subHeaderAlign="right"
          customStyles={customStyles}
        />
      </div>
      </div>
    </div>
  );
}

export default App;
