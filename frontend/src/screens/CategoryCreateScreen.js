import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import {
    createCategory
} from "../actions/productActions";

const CategoryCreateScreen = ({ match, history }) => {
  //   const productId = match.params.id;

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);


  const dispatch = useDispatch();


  const submitHandler = async (e) => {
    setLoading(true)
    e.preventDefault();
    await dispatch(
        createCategory({name: name})
    );

    setLoading(false)
    history.push('/admin/categories')
  };

  return (
    <>
      <Link to="/admin/categories" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Create Category</h1>
        {loading ? (
          <Loader />
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary">
              Save
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default CategoryCreateScreen;
