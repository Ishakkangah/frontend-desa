import React, { useEffect, useState } from "react";

import LayoutAdmin from "../../../layouts/Admin";
import { Link } from "react-router-dom";
import Api from "../../../services/Api";
import Cookies from "js-cookie";
import hasAnyPermission from "../../../utils/Permissions";
//import pagination component
import Pagination from "../../../components/general/Pagination";
import toast from "react-hot-toast";

// react-confirm-alert
import ReactConfirmAlert, { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

export default function UsersIndex() {
  // initial title
  document.title = "Users - Desa digital";

  // initial useState
  const [users, setUsers] = useState([]);

  //  initial "useState permissions"
  const [pagination, setPagination] = useState({
    currentPage: 0,
    perPage: 0,
    total: 0,
  });

  // keyword
  const [keywords, setKeywords] = useState("");
  // errors
  const [errors, setErrors] = useState([]);

  //   get token from cookie
  const token = Cookies.get("token");

  const fetchDataUsers = async (NumberPage = 1, keywords = "") => {
    const page = NumberPage ? NumberPage : pagination.currentPage;
    await Api.get(`/api/admin/users?search=${keywords}&page=${page}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        setUsers(response.data.data.data);
        setPagination(() => ({
          currentPage: response.data.data.current_page,
          perPage: response.data.data.per_page,
          total: response.data.data.total,
        }));
      })
      .catch((error) => {
        console.log("this errors :", error);
      });
  };

  //   hook useEffect
  useEffect(() => {
    fetchDataUsers();
  }, []);

  //   search data
  const searchData = (e) => {
    e.preventDefault();
    fetchDataUsers(1, keywords);
  };

  //   delete user
  const deleteUser = (id) => {
    // reect-confirm-alert
    confirmAlert({
      title: "Are you sure",
      message: "Want to delete this data",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            await Api.delete(`/api/admin/users/${id}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }).then((response) => {
              //show toast
              toast.success("roles berhasil dihapus", {
                position: "top-right",
                duration: 4000,
              });

              //call function "fetchData"
              fetchDataUsers();
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
    <>
      <LayoutAdmin>
        <main>
          <div className="container-fluid mb-5 mt-5">
            <div className="row">
              <div className="col-md-8">
                <div className="row">
                  <div className="col-md-3 col-12 mb-2">
                    {hasAnyPermission(["users.create"]) && (
                      <Link
                        to="/admin/users/create"
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
                            <th className="border-0">Full Name</th>
                            <th className="border-0">Email Address</th>
                            <th className="border-0">Roles</th>
                            <th className="border-0" style={{ width: "15%" }}>
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {/* looping data */}
                          {users.length > 0 ? (
                            users.map((user, index) => (
                              <tr key={Math.random()}>
                                <td className="fw-bold text-center">
                                  {++index +
                                    (pagination.currentPage - 1) *
                                      pagination.perPage}
                                </td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                  {user.roles.map((role, index) => (
                                    <span
                                      className="btn btn-warning btn-sm shadow-sm border-0 ms-2 mb-2 fw-normal"
                                      key={Math.random()}
                                    >
                                      {role.name}
                                    </span>
                                  ))}
                                </td>
                                <td className="text-center">
                                  {hasAnyPermission(["users.edit"]) && (
                                    <Link
                                      to={`/admin/users/edit/${user.id}`}
                                      className="btn btn-primary btn-sm me-2"
                                    >
                                      <i className="fa fa-pencil-alt"></i>
                                    </Link>
                                  )}

                                  {hasAnyPermission(["users.delete"]) && (
                                    <button
                                      className="btn btn-danger btn-sm"
                                      onClick={() => deleteUser(user.id)}
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
                        fetchDataUsers(pageNumber, keywords)
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
    </>
  );
}
