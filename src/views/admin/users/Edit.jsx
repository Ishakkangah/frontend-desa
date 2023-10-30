import React, { useEffect, useState } from "react";

import LayoutAdmin from "../../../layouts/Admin";
import { Link, useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import Api from "../../../services/Api";
import toast from "react-hot-toast";

export default function UsersEdit() {
  //   initial title
  document.title = "User edit - Desa digital";

  //   initial state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [rolesData, setRolesData] = useState([]);
  const [roles, setRoles] = useState([]);
  const [errors, setErrors] = useState([]);

  const token = Cookies.get("token");
  const navigate = useNavigate();

  //   fetch data roles
  const fetchDataRoles = async () => {
    await Api.get("/api/admin/roles/all", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      setRoles(response.data.data);
    });
  };

  const handleChackBoxChange = (e) => {
    let data = rolesData;
    if (data.some((name) => name === e.target.value)) {
      data = data.filter((name) => name !== e.target.value);
    } else {
      data.push(e.target.value);
    }
    setRolesData(data);
  };

  const { id } = useParams();

  const fetchDataUser = async () => {
    await Api.get(`/api/admin/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      setName(response.data.data.name);
      setEmail(response.data.data.email);
      setRolesData(response.data.data.roles.map((obj) => obj.name));
    });
  };

  //   hook useEffect
  useEffect(() => {
    fetchDataUser();
    fetchDataRoles();
  }, []);

  // Edit data user
  const EditUser = async (e) => {
    e.preventDefault();

    await Api.post(
      `/api/admin/users/${id}`,
      {
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
        roles: rolesData,
        _method: "PUT",
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then(() => {
        // show toast
        toast.success("Data berhasil di update", {
          position: "top-right",
          duration: 4000,
        });

        // redirect
        navigate("/admin/users");
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
                to="/admin/users"
                className="btn btn-md btn-primary border-0 shadow-sm mb-3"
                type="button"
              >
                <i className="fa fa-long-arrow-alt-left me-2"></i> Back
              </Link>
              <div className="card border-0 rounded shadow-sm border-top-success">
                <div className="card-body">
                  <h6>
                    <i className="fa fa-user"></i> Create User
                  </h6>
                  <hr />
                  <form onSubmit={EditUser}>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label fw-bold">
                            Full Name
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter Full Name"
                          />
                        </div>
                        {errors.name && (
                          <div className="alert alert-danger">
                            {errors.name[0]}
                          </div>
                        )}
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label fw-bold">
                            Email Address
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter Email Address"
                          />
                        </div>
                        {errors.email && (
                          <div className="alert alert-danger">
                            {errors.email[0]}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label fw-bold">Password</label>
                          <input
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter Password"
                          />
                        </div>
                        {errors.password && (
                          <div className="alert alert-danger">
                            {errors.password[0]}
                          </div>
                        )}
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label fw-bold">
                            Password Confirmation
                          </label>
                          <input
                            type="password"
                            className="form-control"
                            value={passwordConfirmation}
                            onChange={(e) =>
                              setPasswordConfirmation(e.target.value)
                            }
                            placeholder="Enter Password Confirmation"
                          />
                        </div>
                      </div>
                    </div>
                    <hr />
                    <div className="mb-3">
                      <label className="fw-bold">Roles</label>
                      <br />
                      {roles.map((role) => (
                        <div
                          className="form-check form-check-inline"
                          key={Math.random()}
                        >
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value={role.name}
                            defaultChecked={rolesData.some(
                              (name) => name === role.name ?? true
                            )}
                            onChange={handleChackBoxChange}
                            id={`check-${role.id}`}
                          />
                          <label
                            className="form-check-label fw-normal"
                            htmlFor={`check-${role.id}`}
                          >
                            {role.name}
                          </label>
                        </div>
                      ))}
                      {errors.roles && (
                        <div className="alert alert-danger">
                          {errors.roles[0]}
                        </div>
                      )}
                    </div>
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
