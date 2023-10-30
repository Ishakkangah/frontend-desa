//import react
import { useEffect, useState } from "react";

//import react router dom
import { Link, useNavigate } from "react-router-dom";

//import layout
import LayoutAdmin from "../../../layouts/Admin";

// import react-quill
import ReactQuill from "react-quill";

// quill CSS
import "react-quill/dist/quill.snow.css";
//import js cookie

import Cookies from "js-cookie";
//import api
import Api from "../../../services/Api";

//import toast
import toast from "react-hot-toast";

export default function PostsCreate() {
  // initial title
  document.title = "Create posts - Desa digital";

  //define state for form
  const [title, setTitle] = useState("");
  const [categoryID, setCategoryID] = useState("");
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");

  //   initial category
  const [categoryData, setCategoryData] = useState([]);

  //   initial errors
  const [errors, setErrors] = useState([]);

  //   get token from cookie
  const token = Cookies.get("token");

  //   navigate
  const navigate = useNavigate();

  //   hook useState
  const fetchDataCategories = async () => {
    await Api.get("/api/admin/categories/all", {
      //header
      headers: {
        //header Bearer + Token
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      //set response data to state "categories"
      setCategoryData(response.data.data);
    });
  };

  //useEffect
  useEffect(() => {
    fetchDataCategories();
  }, []);

  //function "storePost"
  const storePost = async (e) => {
    e.preventDefault();
    //define formData
    const formData = new FormData();

    //append data to "formData"
    formData.append("title", title);
    formData.append("image", image);
    formData.append("content", content);
    formData.append("category_id", categoryID);

    //sending data
    await Api.post("/api/admin/posts", formData, {
      //header
      headers: {
        //header Bearer + Token
        Authorization: `Bearer ${token}`,
        "content-type": "multipart/form-data",
      },
    })
      .then((response) => {
        //    show toast
        toast.success(response.data.message, {
          position: "top-right",
          duration: 4000,
        });

        //   redirect
        navigate("/admin/posts");
      })
      .catch((error) => {
        // pass data error
        setErrors(error.response.data);
      });
  };

  console.log("categories all: ", categoryData);

  return (
    <LayoutAdmin>
      <main>
        <div className="container-fluid mb-5 mt-5">
          <div className="row">
            <div className="col-md-12">
              <Link
                to="/admin/posts"
                className="btn btn-md btn-primary border-0 shadow-sm mb-3"
                type="button"
              >
                <i className="fa fa-long-arrow-alt-left me-2"></i> Back
              </Link>
              <div className="card border-0 rounded shadow-sm border-top-success">
                <div className="card-body">
                  <h6>
                    <i className="fa fa-pencil-alt"></i> Create Post
                  </h6>
                  <hr />
                  <form onSubmit={storePost}>
                    <div className="mb-3">
                      <label className="form-label fw-bold">Image</label>
                      <input
                        type="file"
                        className="form-control"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files[0])}
                      />
                    </div>
                    {errors.image && (
                      <div className="alert alert-danger">
                        {errors.image[0]}
                      </div>
                    )}
                    <div className="mb-3">
                      <label className="form-label fw-bold">Title</label>
                      <input
                        type="text"
                        className="form-control"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter Title Post"
                      />
                    </div>
                    {errors.title && (
                      <div className="alert alert-danger">
                        {errors.title[0]}
                      </div>
                    )}

                    <div className="mb-3">
                      <label className="form-label fw-bold">Category</label>
                      <select
                        className="form-select"
                        onChange={(e) => setCategoryID(e.target.value)}
                      >
                        <option value="">-- Select Category --</option>
                        {categoryData.map((category, index) => (
                          <option value={category.id} key={index}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    {errors.category_id && (
                      <div className="alert alert-danger">
                        {errors.category_id[0]}
                      </div>
                    )}

                    <div className="mb-3">
                      <label className="form-label fw-bold">Content</label>
                      <ReactQuill
                        theme="snow"
                        value={content}
                        onChange={(content) => setContent(content)}
                      />
                    </div>
                    {errors.content && (
                      <div className="alert alert-danger">
                        {errors.content[0]}
                      </div>
                    )}

                    <div>
                      <button
                        type="submit"
                        className="btn btn-md btn-primary me-2"
                      >
                        <i className="fa fa-save"></i> Save
                      </button>
                      <button type="reset" className="btn btn-md btn-warning">
                        <i className="fa fa-redo"></i> Reset
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </LayoutAdmin>
  );
}
