import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import CustomModal from "../CustomModal";
export default function ReferenceForm(props) {
  const [showAddModal, setShowAddModal] = useState(false);
  // showEditModal conatins the id of the selected skill to be editted
  const [showEditModal, setShowEditModal] = useState();
  const [reference, setReference] = useState(props.data || { references: [] });
  const [newRef, setNewRef] = useState({ name: "", email: "" });
  const [editRef, setEditRef] = useState({});
}