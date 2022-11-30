import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { filterProductsThunk, filterProduThunk, getProductsThunk } from '../store/slices/products.slice';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import { Button, InputGroup, Form, Row, Col, ListGroup, Carousel } from 'react-bootstrap';

const Home = () => {

  const dispatch = useDispatch()
  const products = useSelector(state => state.products)

  const [categoryList, setCategoryList] = useState([])
  const [inputSearch, setInputSearch] = useState("")

  useEffect(() => {
    dispatch(getProductsThunk())

    axios.get("https://e-commerce-api.academlo.tech/api/v1/products/categories")
      .then(res => setCategoryList(res.data.data.categories))
  }, [])

  console.log(categoryList)

  return (
    <div>
      <Row>
        <Col lg={2}>
          {/* Categorias */}
          <h3>Categories</h3>

          <ListGroup>
            {
              categoryList.map(category => (
                <ListGroup.Item key={category.id}
                  onClick={() => dispatch(filterProductsThunk(category.id))}
                  style={{ cursor: "pointer" }}
                >
                  {category.name}
                </ListGroup.Item>
              ))
            }
          </ListGroup>
        </Col>
        {/*DOCUMENTOS*/}
        <Col lg={10}>
          <h1>Componente Home</h1>
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="Find your product"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              value={inputSearch}
              onChange={e => setInputSearch(e.target.value)}
            />
            <Button
              variant="outline-secondary"
              id="button-addon2"
              onClick={() => dispatch(filterProduThunk(inputSearch))}
            >
              Search
            </Button>
          </InputGroup>
          <Row xs={1} md={2} lg={3} className="g-4">
            {products.map(product => (
              <Col>
                <Card>
                  <Link to={`/product/${product.id}`} style={{ textDecoration: "none" }} key={product.id}>
                    <Carousel fade>
                      <Carousel.Item>
                        <img
                          className="d-block w-100"
                          src={product.productImgs[0]}
                          alt="First slide"
                          style={{ height: 250, objectFit: "contain" }}
                        />
                      </Carousel.Item>
                      <Carousel.Item>
                        <img
                          className="d-block w-100"
                          src={product.productImgs[1]}
                          alt="Second slide"
                          style={{ height: 250, objectFit: "contain" }}
                        />
                      </Carousel.Item>
                      <Carousel.Item>
                        <img
                          className="d-block w-100"
                          src={product.productImgs[2]}
                          alt="Third slide"
                          style={{ height: 250, objectFit: "contain" }}
                        />
                      </Carousel.Item>
                    </Carousel>
                    {/* <Card.Img variant="top"
                      src={product.productImgs[0]}
                      style={{ height: 250, objectFit: "contain" }}
            /> */}
                    <hr />
                    <Card.Body>
                      <Card.Title>{product.title}</Card.Title>
                      <br />
                      <Card.Text>
                        ${product.price}
                      </Card.Text>
                      <Button variant="secondary" style={{ width: "", }}><i class='bx bxs-cart-add bx-md'></i></Button>
                    </Card.Body>
                  </Link>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Home;