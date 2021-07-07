import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Tops() {
  const { type } = useParams();

  useEffect(() => {
    axios.get(`/api/v1/top/${type}`).then(({ data }) => {
      console.log(data);
    });
  }, []);
  return <div></div>;
}
