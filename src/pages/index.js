import React from "react"
import { Link } from "gatsby"
import './../components/css/style.css'
import Layout from "../components/layout"
import SEO from "../components/seo"

import { Container, Row, Col } from 'react-bootstrap'

const IndexPage = () => (
  <Layout>
    <Container className='p-5' style={{minHeight: "70vh"}}>  
      <SEO title="Home" />
      <Row className=''>
        <Col className='d-flex flex-column  justify-content-center align-items-center'>
          <h1>Dear User</h1>
          <p>This is my first use of Gatsby JS hope you like it</p>
          <p>If you want to see the pricing for services click the link bellow</p>
          <Link className=" rounded-pill pricesBtn" to="/pricing">Pricing</Link>
        </Col>
      </Row>
    </Container>
  </Layout>
)

export default IndexPage
