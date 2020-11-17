import React from 'react'
import { Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

// Önemli React Bootstrap içinde Pagination componenti olduğu için karışmasın diye buranın adını Paginate yaptık
// App.js içinde 2 tane path var biri keyword aranında pagination biri de default keywordsuz pagination, aşağıda ikisi içinde çalışacak koşul yazmak gerekli
// Burada isAdmin olayı önemli, çünkü pagination admin products sayfasında da kullanılacak, ama orada paginationa tıkladığında anasayfadaki gibi listeleme yapmaması lazım, sadece admindeki ürünler gibi listelemesi lazım, aşağıda bunu yapacağız
const Paginate = ({ pages, page, isAdmin = false, keyword = '' }) => {
  return (
    pages > 1 && (
      <Pagination>
        {[...Array(pages).keys()].map((x) => (
          <LinkContainer
            key={x + 1}
            to={
              !isAdmin
                ? keyword
                  ? `/search/${keyword}/page/${x + 1}`
                  : `/page/${x + 1}`
                : `/admin/productlist/${x + 1}`
            }
          >
            <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
          </LinkContainer>
        ))}
      </Pagination>
    )
  )
}

export default Paginate
