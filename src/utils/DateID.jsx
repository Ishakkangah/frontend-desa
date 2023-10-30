import React from "react";

export default function DateID(date) {
  let e = date.getDate();
  console.log("this date :", date.getMonth());
  return `${e} ${
    [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ][date.getMonth()]
  } ${date.getFullYear()}`;
}
