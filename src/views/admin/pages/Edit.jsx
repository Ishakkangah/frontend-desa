//import react
import { useEffect, useState } from "react";

// import layout admin
import LayoutAdmin from "../../../layouts/Admin";

// import react-router-dom
import { Link, useNavigate, useParams } from "react-router-dom";

// import reactQuill
import ReactQuill from "react-quill";

// import css reactQuill
import "react-quill/dist/quill.snow.css";
import Cookies from "js-cookie";
import Api from "../../../services/Api";
import toast from "react-hot-toast";

export default function PagesEdit() {
  // initial title
  document.title = "Create page - Desa digital";

  // initial state
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState([]);

  // get token from cookie
  const token = Cookies.get("token");

  // navigate
  const navigate = useNavigate();

  // use params
  const { id } = useParams();

  // get page
  const fetchDatapage = async () => {
    await Api.get(`/api/admin/pages/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }).then((response) => {
      setTitle(response.data.data.title);
      setContent(response.data.data.content);
    });
  };

  // use hook
  useEffect(() => {
    fetchDatapage();
  }, []);

  // store page
  const editPage = async (e) => {
    e.preventDefault();

    await Api.post(
      `/api/admin/pages/${id}`,
      {
        title,
        content,
        _method: "PUT",
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "content-type": "multipart/form-data",
        },
      }
    )
      .then((response) => {
        // show toast
        toast.success(response.data.message, {
          duration: 4000,
          position: "top-right",
        });

        // redirect
        navigate("/admin/pages");
      })
      .catch((error) => {
        setErrors(error.response.data);
      });
  };

  return (
    <LayoutAdmin>
      <main>
        <div className="container-fluid mb-5 mt-5">
          <div className="row">
            <div className="col-md-12">
              <Link
                to="/admin/pages"
                className="btn btn-md btn-primary border-0 shadow-sm mb-3"
                type="button"
              >
                <i className="fa fa-long-arrow-alt-left me-2"></i> Back
              </Link>
              <div className="card border-0 rounded shadow-sm border-top-success">
                <div className="card-body">
                  <h6>
                    <i className="fa fa-pencil-alt"></i> Edit Page
                  </h6>
                  <hr />
                  <form onSubmit={editPage}>
                    <div className="mb-3">
                      <label className="form-label fw-bold">Title</label>
                      <input
                        type="text"
                        className="form-control"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter Title Page"
                      />
                    </div>
                    {errors.title && (
                      <div className="alert alert-danger">
                        {errors.title[0]}
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
