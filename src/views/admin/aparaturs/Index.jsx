// import react
import { useEffect, useState } from "react";

// import layout admin
import LayoutAdmin from "../../../layouts/Admin";

// import react-router-dom
import { Link } from "react-router-dom";

// import js-cookie
import Cookies from "js-cookie";

// import api
import Api from "../../../services/Api";

// import pagination
import Pagination from "../../../components/general/Pagination";

// import permission
import hasAnyPermission from "../../../utils/Permissions";

// import confirm alert
import { confirmAlert } from "react-confirm-alert";

// Import css confirm alert
import "react-confirm-alert/src/react-confirm-alert.css";

// Import react-hot-toast
import toast from "react-hot-toast";

export default function AparatursIndex() {
  // initial title
  document.title = "Aparaturs - Desa digital";

  //   initial state
  const [aparaturs, setAparaturs] = useState([]);

  const [keywords, setKeywords] = useState("");

  //   pagination
  const [pagination, setPagination] = useState({
    currentPage: 0,
    perPage: 0,
    total: 0,
  });

  console.log("aparaturs", aparaturs);

  //   get token from cookies
  const token = Cookies.get("token");

  //   fetch data aparaturs
  const fetchDataAparaturs = async (pageNumber = 1, keywords = "") => {
    const page = pageNumber ? pageNumber : pagination.currentPage;
    await Api.get(`/api/admin/aparaturs?search=${keywords}&page=${page}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      // pass data to aparaturs
      setAparaturs(response.data.data.data);

      //   pass data paginaton
      setPagination({
        currentPage: response.data.data.current_page,
        perPage: response.data.data.per_page,
        total: response.data.data.total,
      });
    });
  };

  //   useEffect
  useEffect(() => {
    fetchDataAparaturs();
  }, []);

  //   searchData
  const searchData = (e) => {
    fetchDataAparaturs(1, e.target.value);
  };

  //   deleteData
  const deleteAparatur = (id) => {
    // show confirm alert
    confirmAlert({
      title: "Are you sure ?",
      message: "Want to delete this data",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            await Api.delete(`/api/admin/aparaturs/${id}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }).then((response) => {
              // show toast
              toast.success(response.data.message, {
                position: "top-right",
                duration: 4000,
              });

              // fetch data
              fetchDataAparaturs(1, keywords);
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
                  {hasAnyPermission(["aparaturs.create"]) && (
                    <Link
                      to="/admin/aparaturs/create"
                      className="btn btn-md btn-primary border-0 shadow-sm w-100"
                      type="button"
                    >
                      <i className="fa fa-plus-circle"></i> Add New
                    </Link>
                  )}
                </div>
                <div className="col-md-9 col-12 mb-2">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control border-0 shadow-sm"
                      onChange={(e) => searchData(e)}
                      placeholder="search here..."
                    />
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
                          <th className="border-0">Image</th>
                          <th className="border-0">Full Name</th>
                          <th className="border-0">Role</th>
                          <th className="border-0" style={{ width: "15%" }}>
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {aparaturs.length > 0 ? (
                          aparaturs.map((aparatur, index) => (
                            <tr key={index}>
                              <td className="fw-bold text-center">
                                {++index +
                                  (pagination.currentPage - 1) *
                                    pagination.perPage}
                              </td>
                              <td className="text-center">
                                <img src={aparatur.image} width="50" />
                              </td>
                              <td>{aparatur.name}</td>
                              <td>{aparatur.role}</td>
                              <td className="text-center">
                                {hasAnyPermission(["aparaturs.edit"]) && (
                                  <Link
                                    to={`/admin/aparaturs/edit/${aparatur.id}`}
                                    className="btn btn-primary btn-sm me-2"
                                  >
                                    <i className="fa fa-pencil-alt"></i>
                                  </Link>
                                )}

                                {hasAnyPermission(["aparaturs.delete"]) && (
                                  <button
                                    className="btn btn-danger btn-sm"
                                    onClick={(e) => deleteAparatur(aparatur.id)}
                                  >
                                    <i className="fa fa-trash"></i>
                                  </button>
                                )}
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={5}>
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
                      fetchDataAparaturs(pageNumber, keywords)
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
