//import useState and useEffect
import { useState, useEffect } from "react";

//import Link from react router dom
import { Link } from "react-router-dom";

//import api
import Api from "../../../services/Api";

//import js cookie
import Cookies from "js-cookie";

//import layout
import LayoutAdmin from "../../../layouts/Admin";

//import permissions
import hasAnyPermission from "../../../utils/Permissions";

//import pagination component
import Pagination from "../../../components/general/Pagination";

//import react confirm alert
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { Button } from "bootstrap";
import toast from "react-hot-toast";

export default function RolesIndex() {
  // initial title
  document.title = "Roles - Desa digital";

  //  initial "useState roles"
  const [roles, setRoles] = useState([]);

  //  initial "useState permissions"
  const [pagination, setPagination] = useState({
    currentPage: 0,
    perPage: 0,
    total: 0,
  });

  const [keywords, setKeywords] = useState("");

  const token = Cookies.get("token");

  //   fetch data api
  const fetchData = async (pageNumber = 1, keywords = "") => {
    const page = pageNumber ? pageNumber : pagination.currentPage;
    const response = await Api.get(
      `/api/admin/roles?search=${keywords}&page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // set data set roles
    setRoles(response.data.data.data);

    // set data pagination to "useState"
    setPagination(() => ({
      currentPage: response.data.data.current_page,
      perPage: response.data.data.per_page,
      total: response.data.data.total,
    }));
  };

  //   hook useEffect
  useEffect(() => {
    fetchData();
  }, []);

  //function "searchData"
  const searchData = async (e) => {
    e.preventDefault();
    fetchData(1, keywords);
  };

  // delete role
  const deleteRole = (id) => {
    //show confirm alert
    confirmAlert({
      title: "Are you sure",
      message: "Want to delete this data ?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            await Api.delete(`/api/admin/roles/${id}`, {
              // header
              headers: {
                //header Bearer + Token
                Authorization: `Bearer ${token}`,
              },
            }).then((response) => {
              //show toast
              toast.success("roles berhasil dihapus", {
                position: "top-right",
                duration: 4000,
              });

              //call function "fetchData"
              fetchData();
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
                {hasAnyPermission(["roles.create"]) && (
                  <div className="col-md-3 col-12 mb-2">
                    <Link
                      to="/admin/roles/create"
                      className="btn btn-md btn-primary border-0 shadow w-100"
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
                          <th className="border-0">Role Name</th>
                          <th className="border-0" style={{ width: "60%" }}>
                            Permissions
                          </th>
                          <th className="border-0" style={{ width: "15%" }}>
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* check data roles */}
                        {roles.length > 0 ? (
                          roles.map((role, index) => (
                            <tr key={index}>
                              <td className="fw-bold text-center">
                                {++index +
                                  (pagination.currentPage - 1) *
                                    pagination.perPage}
                              </td>
                              <td>{role.name}</td>
                              <td>
                                {role.permissions.map((permission, index) => (
                                  <span
                                    className="btn btn-warning btn-sm shadow-sm border-0 ms-2 mb-2 fw-normal"
                                    key={index}
                                  >
                                    {permission.name}
                                  </span>
                                ))}
                              </td>
                              <td className="text-center">
                                {hasAnyPermission(["roles.edit"]) && (
                                  <Link
                                    to={`/admin/roles/edit/${role.id}`}
                                    className="btn btn-primary btn-sm me-2"
                                  >
                                    <i className="fa fa-pencil-alt"></i>
                                  </Link>
                                )}

                                {hasAnyPermission(["roles.delete"]) && (
                                  <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => deleteRole(role.id)}
                                  >
                                    <i className="fa fa-trash"></i>
                                  </button>
                                )}
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={4}>
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
