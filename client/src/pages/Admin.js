import axios from "axios";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { baseURL } from "../utils/constants";

const NavBar = () => {
  return (
    <div style={styles.navbar}>
      <div>
        <NavLink to="/">
          <img src="/res/logo.png" alt="" id="logoImg" />
        </NavLink>
      </div>
      <div style={styles.but}>Logout</div>
    </div>
  );
};

function Admin() {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    stock: "",
    brand: "",
    gameKeys: "",
  });

  const [photos, setPhotos] = useState([]);
  const [background, setBackground] = useState([]);
  const [cover, setCover] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const fileArray = Array.from(files);

    if (name === "photos") {
      setPhotos(fileArray);
    } else if (name === "background") {
      setBackground(fileArray);
    } else if (name === "cover") {
      setCover(fileArray);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic, combine formData with file arrays
    console.log(formData);
    console.log("Photos:", photos);
    console.log("Background:", background);
    console.log("Cover:", cover);

    let data = new FormData();
    data.append("name", formData.name);
    data.append("price", formData.price);
    data.append("description", formData.description);
    data.append("category", formData.category);
    data.append("stock", formData.stock);
    data.append("brand", formData.brand);
    data.append("gameKeys", formData.gameKeys);
    // Append cover image (assuming it's a single file)
    if (cover.length > 0) {
      data.append("cover", cover[0]); // Append the first cover file
    }

    // Append background image (assuming it's a single file)
    if (background.length > 0) {
      data.append("background", background[0]); // Append the first background file
    }

    // Append multiple photos (loop through the photos array)
    photos.forEach((photo, index) => {
      data.append("photos", photo); // Append each photo file
    });
    const token = sessionStorage.getItem("jwtToken");
    axios
      .post(baseURL + "/admin/product/add", data, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        alert("Submitted successfully !");
        console.log(data);
      })
      .catch((err) => {
        alert("Error occured");
        console.log(err);
      });
  };

  return (
    <>
      <NavBar />
      <div style={styles.container}>
        <h2 style={{ color: "white" }}>Admin Dashboard</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.field}>
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              style={styles.input}
            />
          </div>

          <div style={styles.field}>
            <label>Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              style={styles.input}
            />
          </div>

          <div style={styles.field}>
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              style={styles.input}
            />
          </div>

          <div style={styles.field}>
            <label>Category</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              style={styles.input}
            />
          </div>

          <div style={styles.field}>
            <label>Stock</label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleInputChange}
              style={styles.input}
            />
          </div>

          <div style={styles.field}>
            <label>Brand</label>
            <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleInputChange}
              style={styles.input}
            />
          </div>

          <div style={styles.field}>
            <label>Game Keys</label>
            <input
              type="text"
              name="gameKeys"
              value={formData.gameKeys}
              onChange={handleInputChange}
              style={styles.input}
            />
          </div>

          <div style={styles.field}>
            <label>Photos</label>
            <input
              type="file"
              name="photos"
              multiple
              onChange={handleFileChange}
              style={styles.input}
            />
          </div>

          <div style={styles.field}>
            <label>Background</label>
            <input
              type="file"
              name="background"
              multiple
              onChange={handleFileChange}
              style={styles.input}
            />
          </div>

          <div style={styles.field}>
            <label>Cover</label>
            <input
              type="file"
              name="cover"
              multiple
              onChange={handleFileChange}
              style={styles.input}
            />
          </div>

          <button type="submit" style={styles.button}>
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

const styles = {
  navbar: {
    backgroundColor: "#15171db7",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "3px 12px",
  },
  but: {
    backgroundColor: "red",
    padding: "14px 32px",
    height: "fit-content",
    color: "white",
    margin: "12px 32px",
    borderRadius: "12px",
    cursor: "pointer",
  },
  container: {
    backgroundColor: "#15171db7",
    height: "100vh",
    display: "flex",
    justifyContent: "start",
    alignItems: "center",
    flexDirection: "column",
  },
  form: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)", // 2 columns
    gridTemplateRows: "repeat(3, auto)", // 3 rows
    gap: "10px",
    width: "800px",
    backgroundColor: "rgba( 255, 255, 255, 0.15 )",
    backdropFilter: "blur( 8px )",
    border: "1px solid rgba( 255, 255, 255, 0.18 )",
    borderRadius: "1rem",
    color: "white",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
  },
  field: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    padding: "8px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },
  button: {
    gridColumn: "span 2", // Button spans across both columns
    padding: "10px 140px",
    borderRadius: "8px",
    margin: "20px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    fontSize: "16px",
    cursor: "pointer",
    justifySelf: "center",
  },
};

export default Admin;
