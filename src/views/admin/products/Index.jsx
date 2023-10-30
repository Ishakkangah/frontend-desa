//import useState and useEffect
import { useState, useEffect } from "react";

//import Link from react router dom
import { Link } from "react-router-dom";

//import layout
import LayoutAdmin from "../../../layouts/Admin";

// import cookie from js-cookie
import Cookies from "js-cookie";

// import api
import Api from "../../../services/Api";

// import pagination
import Pagination from "../../../components/general/Pagination";
import hasAnyPermission from "../../../utils/Permissions";

// import react-confirm alert
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

// import toast
import toast from "react-hot-toast";

export default function ProductsIndex() {
  // initial title
  document.title = "Products -  Desa digital";

  // initial state
  const [products, setProducts] = useState([]);
  const [keywords, setKeywords] = useState("");

  // initial pagination
  const [pagination, setPagination] = useState({
    currentPage: 0,
    perPage: 0,
    total: 0,
  });

  // get token from cookie
  const token = Cookies.get("token");

  // useState
  const fetchDataProducts = async (pageNumber = 1, keywords = "") => {
    const page = pageNumber ? pageNumber : pagination.currentPage;
    await Api.get(`/api/admin/products?search=${keywords}&page=${page}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      // pass data to product
      setProducts(response.data.data.data);

      // pass data pagination
      setPagination({
        currentPage: response.data.data.current_page,
        perPage: response.data.data.per_page,
        total: response.data.data.total,
      });
    });
  };

  // useEffect
  useEffect(() => {
    fetchDataProducts();
  }, []);

  // searchData
  const searchData = (e) => {
    e.preventDefault();

    fetchDataProducts(1, keywords);
  };

  // delete product
  const deleteProduct = (id) => {
    // show react-confirm-alert
    confirmAlert({
      title: "Title",
      message: "Message",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            await Api.delete(`/api/admin/products/${id}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }).then((response) => {
              // show toast
              toast.success(response.data.message, {
                duration: 4000,
                position: "top-right",
              });

              // fetch data products
              fetchDataProducts(1, keywords);
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
                <div className="col-md-3 col-12 mb-2">
                  {hasAnyPermission(["products.create"]) && (
                    <Link
                      to="/admin/products/create"
                      className="btn btn-md btn-primary border-0 shadow-sm w-100"
                      type="button"
                    >
                      <i className="fa fa-plus-circle"></i> Add New
                    </Link>
                  )}
                </div>
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
                          <th className="border-0">Title</th>
                          <th className="border-0">Owner</th>
                          <th className="border-0">Phone</th>
                          <th className="border-0">Price</th>
                          <th className="border-0" style={{ width: "15%" }}>
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {products.length > 0 ? (
                          products.map((product, index) => (
                            <tr key={Math.random() * index}>
                              <td className="fw-bold text-center">
                                {++index +
                                  (pagination.currentPage - 1) *
                                    pagination.perPage}
                              </td>
                              <td>{product.title}</td>
                              <td>{product.owner}</td>
                              <td>{product.phone}</td>
                              <td>{product.price}</td>
                              <td className="text-center">
                                {hasAnyPermission(["products.edit"]) && (
                                  <Link
                                    to={`/admin/products/edit/${product.id}}`}
                                    className="btn btn-primary btn-sm me-2"
                                  >
                                    <i className="fa fa-pencil-alt"></i>
                                  </Link>
                                )}

                                {hasAnyPermission(["products.delete"]) && (
                                  <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => deleteProduct([product.id])}
                                  >
                                    <i className="fa fa-trash"></i>
                                  </button>
                                )}
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={6}>
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
                    onChange={(pageNumber) => fetchData(pageNumber, keywords)}
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
