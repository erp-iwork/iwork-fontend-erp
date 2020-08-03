import React from "react";
import { Col } from "reactstrap";
export default function Error({ error }) {
  return (
    <Col className="text-danger" style={{ color: "red" }}>
      {" "}
      {error}{" "}
    </Col>
  );
}
