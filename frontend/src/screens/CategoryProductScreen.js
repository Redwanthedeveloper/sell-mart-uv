import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, ListGroup } from "react-bootstrap";
import Product from "../components/Product";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { useParams } from "react-router-dom";

import {
  fetchProductsByCategory,
  fetchCategories,
} from "../actions/productActions";

const CategoryProductScreen = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [products, setProducts] = useState({});
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    setLoading(true);
    dispatch(fetchProductsByCategory(id))
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, [id, dispatch]);

  useEffect(() => {
    dispatch(fetchCategories())
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Row className="mt-5">
        <Col sm={12} md={8} lg={9} xl={9}>
          {loading ? (
            <Loader />
          ) : (
            <>
              <h1>{products && products.category && products.category.name}</h1>
              <Row>
                {products &&
                  products.products &&
                  products.products.map((product) => (
                    <Col key={product._id} sm={12} md={6} lg={3} xl={3}>
                      <Product product={product} />
                    </Col>
                  ))}
              </Row>
            </>
          )}
        </Col>
        <Col sm={12} md={4} lg={3} xl={3}>
          <h1>Categories</h1>
          <Row>
            <ListGroup className="flex-fill">
              {categories.map((category) => (
                <ListGroup.Item key={category._id}>
                  <Link to={`/category/${category._id}`}>
                    <strong>{category.name}</strong>
                  </Link>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default CategoryProductScreen;
