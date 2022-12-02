import React, { useEffect, useState } from 'react';
import { Button, Card, Carousel, Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getProductsThunk } from '../store/slices/products.slice';
import { createPurchaseThunk } from '../store/slices/purchases.slice';

const ProductDetail = () => {

  const { id } = useParams()

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getProductsThunk())
  }, [])

  const productsList = useSelector(state => state.products)

  const productsFound = productsList.find(product => product.id === Number(id))
  const relatedProducts = productsList.filter(product =>
    product.category.id === productsFound.category.id &&
    product.id !== productsFound.id
  )

  console.log(relatedProducts)

  const [quantity, setQuantity] = useState(" ")

  const addToCart = () => {
    const idUser = {
      id: productsFound.id,
      quantity: quantity
    }
    console.log(idUser)
    dispatch(createPurchaseThunk(idUser))
  }

  return (
    <div>

      <Row xs={1} md={2} className="g-4" key={productsFound?.id}>
        <Col>
          <Carousel slide={false} variant="dark">
            <Carousel.Item>
              <img
                className="img-fluid"
                src={productsFound?.productImgs[0]}
                alt="First slide"

              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="img-fluid"
                src={productsFound?.productImgs[1]}
                alt="Second slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="img-fluid"
                src={productsFound?.productImgs[2]}
                alt="Third slide"

              />
            </Carousel.Item>
          </Carousel>
        </Col>
        <Col>
          <h2><i class='bx bx-cross' ></i>{" "}{productsFound?.title}</h2>
          <br />
          <h4><b>Description</b></h4>
          <p>
            {productsFound?.description}
          </p>
          <br />
          <span><b>Price</b></span>
          <br />
          <span>${productsFound?.price}</span>
          <br /><br />
          <span><b>Select quantity</b></span>
          <br />
          <input
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            type="number"
            placeholder='Quantity'
            style={{ width: "80px", boxShadow: "1px 1px 15px 5px lightgray" }}

          >
          </input>
          <br /><br />
          <Button onClick={addToCart} style={{ width: "100%" }}>
            Add to cart
          </Button>
        </Col>
      </Row>
      <br /><br />

      <h4 style={{ textAlign: "center" }}>
        <b>Related Products</b></h4>
      <hr />
      <Row xs={1} md={2} lg={3} className="g-4" >
        {relatedProducts.map(product => (
          <Col key={product.id} >
            <Card key={product.id}>
              <Link to={`/product/${product.id}`} style={{ textDecoration: "none" }} key={product.id}>
                <Card.Img variant="top"
                  src={product.productImgs[0]}
                  style={{ height: 250, objectFit: "contain" }}
                />
                <hr />
                <Card.Body>
                  <Card.Title><i class='bx bx-cross' ></i>{" "}{product.title}</Card.Title>
                  <br />
                  <Card.Text>
                    ${product.price}
                  </Card.Text>
                  <Button onClick={addToCart} variant="secondary" style={{ width: "", }}><i class='bx bxs-cart-add bx-md'></i></Button>
                </Card.Body>
              </Link>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ProductDetail;