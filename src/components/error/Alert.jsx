import React from "react";
import { Col, Alert, UncontrolledAlert } from "reactstrap";
export default function CustomAlert({ type, msg }) {
  return type === "success" ? (
    <Col>
      <UncontrolledAlert color="success">{msg}</UncontrolledAlert>
    </Col>
  ) : (
    <Col>
      <Alert color={type}>{msg}</Alert>
    </Col>
  );
}
