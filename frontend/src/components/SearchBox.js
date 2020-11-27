import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'

const SearchBox = ({ history }) => {
  // we will use this "keyword" in HomeScreen
  const [keyword, setKeyword] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()

    //trim for whitespaces
    if (keyword.trim()) {
      // IMPORTANT! we dont have access to "match" and "history" props in Header. If we want to use these props in "Searchbox", we have to use it with Router to send props (Check our Header.js)
      // if we dont send prop from Heder, "history" will be "undefined"
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
