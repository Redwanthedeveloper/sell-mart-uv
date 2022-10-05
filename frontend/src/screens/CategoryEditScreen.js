import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { getCategoryById, updateCategory } from "../actions/productActions";

const CategoryEditScreen = ({ match, history }) => {
  const cat_id = match.params.id;

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();



  useEffect(() => {
   dispatch(getCategoryById(cat_id)).then(res => {
    setName(res.data.name)
   })
  }, []);


  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateCategory(name, cat_id)
    );
  };

  return (
    <>
      <Link to="/admin/categories" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Category</h1>
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
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default CategoryEditScreen;
