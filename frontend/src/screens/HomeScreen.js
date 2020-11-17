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
  // const [products, setProducts] = useState([]) //REDUX gelince gerek kalmadı
  const dispatch = useDispatch()

  // REDUX state den bütün ihtiyacımız olan bilgileri aşağıdaki gibi alırız
  const productList = useSelector((state) => state.productList)
  const { loading, error, products, pages, page } = productList

  // Searchboxdan gelen keyword
  const keyword = match.params.keyword

  const pageNumber = match.params.pageNumber || 1

  useEffect(() => {
    // dispatch(listProducts()) //Searchboxdan gelen keyword ile çalışacak hale getirdik, actions içine tanımladık
    // dispatch(listProducts(keyword)) // pagination ekledik
    dispatch(listProducts(keyword, pageNumber))

    /* Burası artık kullanılmayacak çünkü products dataları REDUX tan alacağız
    const fetchProducts = async () => {
      // burada normalde get önyüze yani 3000 e gider ama backende yani 5000 gidip data alması lazım
      // bunun düzgün çalışıp backend gitmesi için frontenddeki package.json içinde proxy yazmamız gerekiyor
      const { data } = await axios.get('/api/products')
      setProducts(data)

      //Yukarıdaki yazılışla aynı şey demek daha modern yazılış şekli
      //const { data } = await axios.get('/api/products')
      //setProducts(data)
      //const res = await axios.get('/api/products')
      //setProducts(res.data)
      
    }
    fetchProducts()
    */
  }, [dispatch, keyword, pageNumber]) // bu arrayın içinde yazılan değer her değiştiğinde useEffect çalışsın demek

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
