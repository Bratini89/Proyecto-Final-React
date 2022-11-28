import React, { useEffect } from 'react';
import { Button, Card, Carousel, Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getProductsThunk } from '../store/slices/products.slice';

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

  return (
    <div>
      <Row xs={1} md={2} className="g-4">
        <Col>
          <Carousel slide={false}>
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
          <h2>{productsFound?.title}</h2>
          <br />
          <p>
            {productsFound?.description}
          </p>
          <br />
          <span>${productsFound?.price}</span>
          <br /><br />
          <Button>add to cart</Button>
        </Col>
      </Row>
      <br />
      <h3>Related Products</h3>
      <br />
      <Row xs={1} md={2} lg={3} className="g-4">
        {relatedProducts.map(product => (
          <Col>
            <Card>
              <Link to={`/product/${product.id}`} style={{ textDecoration: "none" }} key={product.id}>
                <Card.Img variant="top"
                  src={product.productImgs[0]}
                  style={{ height: 250, objectFit: "contain" }}
                />
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
    </div>
  );
};

export default ProductDetail;