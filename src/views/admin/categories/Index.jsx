//import useState and useEffect
import { useEffect, useState } from "react";

//import Link from react router dom
import { Link } from "react-router-dom";

//import layout
import LayoutAdmin from "../../../layouts/Admin";

//import api
import Api from "../../../services/Api";

//import js cookie
import Cookies from "js-cookie";

//import pagination component
import Pagination from "../../../components/general/Pagination";

//import permissions
import hasAnyPermission from "../../../utils/Permissions";
import toast from "react-hot-toast";

// react-confirm-alert
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

export default function CategoriesIndex() {
  // initital title
  document.title = "Categories - Desa digital";

  //define state "categories"
  const [categories, setCategories] = useState([]);

  //define state "pagination"
  const [pagination, setPagination] = useState({
    currentPage: 0,
    perPage: 0,
    total: 0,
  });

  //define state "keywords"
  const [keywords, setKeywords] = useState("");

  // get token from cookie
  const token = Cookies.get("token");

  //function fetchData
  const fetchDataCategories = async (pageNumber = 1, keywords = "") => {
    //define variable "page"
    const page = pageNumber ? pageNumber : pagination.currentPage;
    await Api.get(`/api/admin/categories?search=${keywords}&page=${page}`, {
      //header
      headers: {
        //header Bearer + Token
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      //set data response to state "setCategories"
      setCategories(response.data.data.data);

      // pass data to pagination
      setPagination({
        currentPage: response.data.data.current_page,
        perPage: response.data.data.per_page,
        total: response.data.data.total,
      });
    });
  };

  useEffect(() => {
    fetchDataCategories();
  }, []);

  //   search data
  const searchData = (e) => {
    e.preventDefault();
    console.log("keyword :", keywords);
    fetchDataCategories(1, keywords);
  };

  // delete category
  const deleteCategory = (id) => {
    // reect-confirm-alert
    confirmAlert({
      title: "Are you sure",
      message: "Want to delete this data",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            await Api.delete(`/api/admin/categories/${id}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }).then((response) => {
              // show toast
              toast.success(response.data.message, {
                position: "top-right",
                duration: 4000,
              });

              // redirect
              fetchDataCategories();
            });
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
      closeOnEscape: true,
      closeOnClickOutside: true,
      keyCodeForClose: [8, 32],
      willUnmount: () => {},
      afterClose: () => {},
      onClickOutside: () => {},
      onKeypress: () => {},
      onKeypressEscape: () => {},
      overlayClassName: "overlay-custom-class-name",
    });
  };

  return (
    <LayoutAdmin>
      <main>
        <div className="container-fluid mb-5 mt-5">
          <div className="row">
            <div className="col-md-8">
              <div className="row">
                {hasAnyPermission(["categories.create"]) && (
                  <div className="col-md-3 col-12 mb-2">
                    <Link
                      to="/admin/categories/create"
                      className="btn btn-md btn-primary border-0 shadow-sm w-100"
                      type="button"
                    >
                      <i className="fa fa-plus-circle"></i> Add New
                    </Link>
                  </div>
                )}
                <div className="col-md-9 col-12 mb-2">
                  <div className="input-group">
                    <form action="#" onSubmit={searchData}>
                      <input
                        type="text"
                        className="form-control border-0 shadow-sm"
                        onChange={(e) => setKeywords(e.target.value)}
                        placeholder="search here..."
                      />
                    </form>

                    <span className="input-group-text border-0 shadow-sm">
                      <i className="fa fa-search"></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-1">
            <div className="col-md-12">
              <div className="card border-0 rounded shadow-sm border-top-success">
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-bordered table-centered mb-0 rounded">
                      <thead className="thead-dark">
                        <tr className="border-0">
                          <th className="border-0" style={{ width: "5%" }}>
                            No.
                          </th>
                          <th className="border-0">Category Name</th>
                          <th className="border-0" style={{ width: "15%" }}>
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {categories.length > 0 ? (
                          categories.map((category, index) => (
                            <tr key={Math.random()}>
                              <td className="fw-bold text-center">
                                {++index +
                                  (pagination.currentPage - 1) *
                                    pagination.perPage}
                              </td>
                              <td>{category.name}</td>
                              <td className="text-center">
                                {hasAnyPermission(["categories.edit"]) && (
                                  <Link
                                    to={`/admin/categories/edit/${category.id}`}
                                    className="btn btn-primary btn-sm me-2"
                                  >
                                    <i className="fa fa-pencil-alt"></i>
                                  </Link>
                                )}

                                {hasAnyPermission(["categories.delete"]) && (
                                  <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => deleteCategory(category.id)}
                                  >
                                    <i className="fa fa-trash"></i>
                                  </button>
                                )}
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={3}>
                              <div
                                className="alert alert-danger border-0 rounded shadow-sm w-100 text-center"
                                role="alert"
                              >
                                Data Belum Tersedia!.
                              </div>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                  <Pagination
                    currentPage={pagination.currentPage}
                    perPage={pagination.perPage}
                    total={pagination.total}
                    onChange={(pageNumber) =>
                      fetchDataCategories(pageNumber, keywords)
                    }
                    position="end"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </LayoutAdmin>
  );
}
