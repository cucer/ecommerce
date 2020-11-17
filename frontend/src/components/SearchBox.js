import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'

const SearchBox = ({ history }) => {
  // Burada girilen keywordu HomeScreen de kullanacağız
  const [keyword, setKeyword] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()

    //trim ile whitespaceleri yok ettik
    if (keyword.trim()) {
      //ÖNEMLİ, Searchbox ın çağırıldığı Header de match ve history propslarına direk erişimimiz yok, Searchbox içerisinde history kullanabilmek için componenti eklerken Route ile ekleyip prop göndermek gerekiyor, burada gelenlen direk Headerdan gönderilen proplar
      // Screenler gibi App.js de path tanımımız olmadığı için böyle sanırım
      // Header dan prop gönderilmeseydi history undefined olacaktı
      history.push(`/search/${keyword}`)
    } else {
      history.push('/')
    }
  }

  return (
    <Form onSubmit={submitHandler} inline>
      <Form.Control
        type='text'
        name='q'
        onChange={(e) => setKeyword(e.target.value)}
        placeholder='Search products...'
        className='mr-sm-2 ml-sm-5'
      ></Form.Control>
      <Button type='submit' variant='outline-success' className='p-2'>
        Search
      </Button>
    </Form>
  )
}

export default SearchBox
