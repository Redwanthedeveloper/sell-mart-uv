import React, { useEffect, useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import {
 fetchCategories,
 deleteCategory
} from "../actions/productActions";

const CategoryListScreen = ({ history, match }) => {
  

useEffect(()=> {
    setLoading(true)
    dispatch(fetchCategories())
    .then((res) => {
      setCategories(res.data);
      setLoading(false)
    })
    .catch((err) => {
      console.log(err);
      setLoading(false)
    });
},[])

  const dispatch = useDispatch();
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)

 

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;


  const deleteHandler = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteCategory(id)).then(res => {
        setLoading(true)
    dispatch(fetchCategories())
    .then((res) => {
      setCategories(res.data);
      setLoading(false)
    })
    .catch((err) => {
      console.log(err);
      setLoading(false)
    });
      })
    }
  };

  const createProductHandler = () => {
    history.push("/admin/create-category");
  };

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Categories</h1>
        </Col>
        <Col className="text-right">
          <Button className="my-3" onClick={createProductHandler}>
            <i className="fas fa-plus"></i> Create Category
          </Button>
        </Col>
      </Row>
      {loading ? (
        <Loader />
      ) :
        <>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category._id}>
                  <td>{category._id}</td>
                  <td>{category.name}</td>
                  <td>
                    <LinkContainer to={`/admin/category/${category._id}/edit`}>
                      <Button variant="light" className="btn-sm">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(category._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
    
        </>
}
    </>
  );
};

export default CategoryListScreen;
