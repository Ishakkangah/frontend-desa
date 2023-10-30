import React, { useState } from "react";

// import layout admin
import LayoutAdmin from "../../../layouts/Admin";
import Cookies from "js-cookie";
import Api from "../../../services/Api";
import toast from "react-hot-toast";

export default function SlidersCreate(props) {
  // inital form data
  const [image, setImage] = useState("");
  // initial form errors
  const [errors, setErrors] = useState([]);

  // get token from cookie
  const token = Cookies.get("token");

  const storeSlider = async (e) => {
    e.preventDefault();

    // define formData
    const formData = new FormData();

    // append data image to form data
    formData.append("image", image);

    // store data slider
    await Api.post(`/api/admin/sliders`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        // show toast
        toast.success(response.data.message, {
          position: "top-right",
          duration: 4000,
        });

        // clear form
        document.getElementById("file").value = "";

        // get fetch data
        props.fetchData();
        setErrors([]);
      })
      .catch((errors) => {
        setErrors(errors.response.data);
      });
  };
  return (
    <div className="card border-0 rounded shadow-sm border-top-success">
      <div className="card-body">
        <form onSubmit={storeSlider}>
          <div className="mb-3">
            <label className="form-label fw-bold">Image</label>
            <input
              type="file"
              id="file"
              className="form-control"
              accept="images/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
          {errors.image && (
            <div className="alert alert-danger">{errors.image[0]}</div>
          )}
          <div>
            <button type="submit" className="btn btn-md btn-primary me-2">
              <i className="fa fa-save"></i> Upload
            </button>
            <button type="reset" className="btn btn-md btn-warning">
              <i className="fa fa-redo"></i> Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
