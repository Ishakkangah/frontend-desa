import React from "react";
import { Link } from "react-router-dom";

export default function CardPages({ page }) {
  console.log("pages : ", page);
  return (
    <div className="col-md-4 mb-4">
      <Link to={`/pages/${page.slug}`} className="text-decoration-none">
        <div
          className="card border-0 shadow-sm rounded-3 text-center text-uppercase"
          key={page.key}
        >
          <div className="card-body mt-2">
            <h5>{page.title}</h5>
          </div>
        </div>
      </Link>
    </div>
  );
}
