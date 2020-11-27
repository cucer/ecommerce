import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import Meta from '../components/Meta'
import ProductCarousel from '../components/ProductCarousel'
// import products from '../products'
// import axios from 'axios'
import { listProducts } from '../actions/productActions'

const HomeScreen = ({ match }) => {
  // const [products, setProducts] = useState([]) // we use REDUX, so they are not necessary
  const dispatch = useDispatch()

  // needed information from REDUX state
  const productList = useSelector((state) => state.productList)
  const { loading, error, products, pages, page } = productList

  // keyword from Searchboxdan
  const keyword = match.params.keyword

  const pageNumber = match.params.pageNumber || 1

  useEffect(() => {
    // dispatch(listProducts()) // add keyword
    // dispatch(listProducts(keyword)) // add pagination
    dispatch(listProducts(keyword, pageNumber))

    /* We dont use this part anymore, because we use REDUX 
    const fetchProducts = async () => {
      // 3000 for frontend, 5000 for backend
      // we have to define proxy in package.json for routes
      const { data } = await axios.get('/api/products')
      setProducts(data)

      // samething with modern method
      // const res = await axios.get('/api/products')
      // setProducts(res.data)      
    }
    fetchProducts()
    */
  }, [dispatch, keyword, pageNumber])

  return (
    <>
      <Meta />
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to='/' className='btn btn-light'>
          Go Back
        </Link>
      )}
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ''}
          />
        </>
      )}
    </>
  )
}

export default HomeScreen
