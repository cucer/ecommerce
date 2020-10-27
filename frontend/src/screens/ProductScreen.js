import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import Message from '../components/Message'
import Loader from '../components/Loader'
// import products from '../products'
// import axios from 'axios'
import { listProductDetails } from '../actions/productActions'

const ProductScreen = ({ match, history }) => {
  const [qty, setQty] = useState(1)

  /* Bu iptal çünkü artık backendden gelecek
  const product = products.find((p) => p._id === match.params.id) // buradaki id route dan gelen :id
  */

  // const [product, setProduct] = useState({}) // REDUX gelince gerek kalmadı
  const dispatch = useDispatch()

  // REDUX state den bütün ihtiyacımız olan bilgileri aşağıdaki gibi alırız
  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  useEffect(() => {
    dispatch(listProductDetails(match.params.id))
    /* Burası artık kullanılmayacak çünkü products dataları REDUX tan alacağız
    const fetchProduct = async () => {
      const { data } = await axios.get(`/api/products/${match.params.id}`)
      setProduct(data)
    }
    fetchProduct()
    */
  }, [dispatch, match]) //dispatch redux ile eklendi, match değiştiğinde değişmesi lazım, zaten bunu buraya yazmasaydık vs code terminalde uyarı verirdi Line 21:6:  React Hook useEffect has a missing dependency: 'match.params.id'. Either include it or remove the dependency array  react-hooks/exhau

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`)
  }

  return (
    <>
      <Link className='btn btn-dark my-3' to='/'>
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          <Col md={6}>
            {/* buraya fluid eklemezsen image ı kendi başına ayrı tutmaz, iç içe girer */}
            <Image src={product.image} alt={product.image} fluid />
          </Col>
          <Col md={3}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>{product.name}</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />
              </ListGroup.Item>
              <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
              <ListGroup.Item>
                Description: {product.description}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>${product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                    </Col>
                  </Row>
                </ListGroup.Item>

                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty</Col>
                      <Col>
                        <Form.Control
                          as='select'
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                        >
                          {/* [...Array(product.countInStock).keys()]  Bunun anlamı listede 5 value varsa [0,1,2,3,4] şeklinde getir demek*/}
                          {/* Array 0 ile başlar ama biz qty 0 seçtiremeyiz 1 den başlsın diye x+1  yaptık */}
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}

                <ListGroup.Item>
                  <Button
                    className='btn-block'
                    type='button'
                    disabled={product.countInStock === 0}
                    onClick={addToCartHandler}
                  >
                    Add To Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  )
}

export default ProductScreen
