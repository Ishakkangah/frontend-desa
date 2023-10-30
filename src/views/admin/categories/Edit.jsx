import { Link, useNavigate, useParams } from "react-router-dom";
import LayoutAdmin from "../../../layouts/Admin";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Api from "../../../services/Api";
import toast from "react-hot-toast";

export default function CategoryEdit() {
  // initial title
  document.title = "Categories create - Desa digital";

  // initial state
  const [name, setName] = useState("");

  // initial errors
  const [errors, setErrors] = useState([]);

  // get token from cookie
  const token = Cookies.get("token");

  // navigate
  const navigate = useNavigate();

  // use params
  const { id } = useParams();

  // store categories
  const editCategories = async (e) => {
    e.preventDefault();

    await Api.post(
      `/api/admin/categories/${id}`,
      {
        name,
        _method: "PUT",
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        console.log("response :", response);

        // show toast
        toast.success(response.data.message, {
          position: "top-right",
          duration: 4000,
        });
        navigate("/admin/categories");
      })
      .catch((error) => {
        setErrors(error.response.data);
      });
  };

  // use Effect
  useEffect(() => {
    fetchDataCategory();
  }, []);

  const fetchDataCategory = async () => {
    await Api.get(`/api/admin/categories/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      setName(response.data.data.name);
    });
  };

  return (
    <LayoutAdmin>
      <main>
        <div className="container-fluid mb-5 mt-5">
          <div className="row">
            <div className="col-md-12">
              <Link
                to="/admin/categories"
                className="btn btn-md btn-primary border-0 shadow-sm mb-3"
                type="button"
              >
                <i className="fa fa-long-arrow-alt-left me-2"></i> Back
              </Link>
              <div className="card border-0 rounded shadow-sm border-top-success">
                <div className="card-body">
                  <h6>
                    <i className="fa fa-folder"></i> Edit Category
                  </h6>
                  <hr />
                  <form onSubmit={editCategories}>
                    <div className="mb-3">
                      <label className="form-label fw-bold">
                        Category Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter Category Name"
                      />
                    </div>
                    {errors.name && (
                      <div className="alert alert-danger">{errors.name[0]}</div>
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
