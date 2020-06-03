import React from 'react'
import Layout from './../components/layout'
import { Container, Row, Col, Form } from 'react-bootstrap'
import { MdArrowForward } from 'react-icons/md'
import { MdEuroSymbol } from 'react-icons/md'

class pricing extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            length: '12',
            currency: 'EUR',
            loaded: false,
            fetchedData: [],
        }
        this.handleChange = this.handleChange.bind(this)
        this.requestPlans = this.requestPlans.bind(this)
    }
    async componentDidMount() {
        await this.requestPlans(this.state.currency)
    }
    requestPlans = async (currency) => {
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json;charset=utf-8');
        myHeaders.append('x-pm-appversion', 'Other');
        myHeaders.append('x-pm-apiversion', '3');
        myHeaders.append('Accept', 'application/vnd.protonmail.v1+json');
        const myInit = {
            method: 'GET',
            headers: myHeaders,
            mode: 'cors',
            cache: 'default'
        };
        const response = await fetch(`https://api.protonmail.ch/payments/plans?Currency=${currency}`, myInit)
        const result = await response.json();
        this.setState({ fetchedData: result.Plans })
        return result.Plans;
    }


    handleChange(e) {
        const { name, value } = e.target
        this.setState({
            [name]: value
        },
            () => this.requestPlans(this.state.currency)

        )

    }
    render() {
        // let plans = this.state.fetchedData
        let myplans = []
        let plans = this.state.fetchedData.filter(plan => {
            if (plan.Name === 'plus' || plan.Name === 'visionary' || plan.Name === 'business' || plan.Name === 'professional') {
                myplans.push(plan)
            }
            return myplans
        })
        console.log('myplans: ', myplans)
        let payLength = ''
        if (this.state.length === '12') {
            payLength = 'per year'
        } else if (this.state.length === '24') {
            payLength = "for 2 years"
        } else if (this.state.length === '1') {
            payLength = 'monthly'
        }
        return (
            <Layout>
                {console.log(this.state.fetchedData)}
                <Container style={{minHeight: "70vh"}}>
                    <Row className='my-5'>
                        <Col>
                            <h5>Plans & Prices </h5>
                           acttive currency:  {this.state.currency}
                        </Col>
                    </Row>
                    <Row className=''>
                        <Col>
                            <Form>
                                <Form.Row className='justify-content-end'>
                                    <Form.Group controlId="exampleForm.SelectCustom" className='mr-1'>
                                        <Form.Control as="select" name='length' value={this.state.length} onChange={this.handleChange}>
                                            <option value='12'>Annually</option>
                                            <option value='1'>Monthly</option>
                                            <option value='24'>2 Years</option>
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId="exampleForm.SelectCustom">
                                        <Form.Control as="select" name='currency' value={this.state.currency} onChange={this.handleChange}>
                                            <option value="EUR">&euro; Euro</option>
                                            <option value="USD">&#36; USD</option>
                                            <option value="CHF">&#8355; CHF</option>
                                        </Form.Control>
                                    </Form.Group>
                                </Form.Row>
                            </Form>
                            {/* <CustomSelect /> */}
                        </Col>
                    </Row>
                    <Row className='mt-3 mb-5 d-flex justify-content-center '>
                        {
                            myplans.map(plan => {
                                let simbol = ''
                                if (plan.Currency === "EUR") {
                                    simbol = "€"
                                } else if (plan.Currency === "CHF") {
                                    simbol = "CHF";
                                } else if (plan.Currency === "USD") {
                                    simbol = '$';
                                }

                                return (
                                    <Col
                                        key={plan.ID} leg="3" md="3" sm="6" xs="9" 
                                        className='border titles mb-3'
                                    >
                                        <div className='d-flex justify-content-center align-items-center text-center '>
                                            {plan.Name === "plus" && <p className='text-uppercase mostPopular'>Most Popular</p>}
                                        </div>
                                        <div className='py-5 px-2 text-center '>
                                            <h6 className='text-center text-uppercase font-weight-bold'>{plan.Name}</h6>
                                            <p className='d-flex align-items-baseline justify-content-center'>
                                                <small className=' mr-1 simbol'>{simbol} </small>
                                                <span className='value '> {plan.Pricing[this.state.length] ? Math.floor(plan.Pricing[this.state.length] / this.state.length) : "Not available"}</span>
                                                /
                                                <small>Mo</small>
                                            </p>
                                            {
                                                plan.Pricing[this.state.length] ?
                                                    <p className='text-muted '>
                                                        Billed as
                                                <small className=''> {simbol}</small>
                                                        <span> {plan.Pricing[this.state.length]} </span>
                                                        {payLength}
                                                    </p> : "Not Available"}
                                        </div>
                                        <div className='px-3 text-muted pb-5'>
                                            {/* {plan.MaxMembers > 0 ? <p><MdArrowForward />{plan.MaxMembers} User</p> : <p> </p>} */}
                                            <p><MdArrowForward className='mr-2' />{plan.MaxMembers} {plan.MaxMembers === 1 ? 'user' : 'users'}</p>
                                            <p><MdArrowForward className='mr-2' />{Math.floor((Math.floor(plan.MaxSpace / 1000000)) / 1024)} GB storage</p>
                                            <p><MdArrowForward className='mr-2' />{plan.MaxAddresses} address</p>
                                            <p><MdArrowForward className='mr-2' />Supports {plan.MaxDomains}  {plan.MaxDomains > 1 ? 'domains' : 'domain'}</p>
                                            <p><MdArrowForward className='mr-2' />{plan.MaxVPN === 0 ? "ProtonVPN (optional) * " : "Includes ProtonVPN"} </p>
                                            <p><MdArrowForward className='mr-2' />{plan.Services === 1 ? "Support" : "Premium Support"} </p>
                                        </div>
                                        <div className='my-5 d-flex justify-content-center'>
                                            <button className='select'>Select</button>
                                        </div>
                                    </Col>
                                )
                            })
                        }
                    </Row>
                </Container>
            </Layout>
        )
    }
}

export default pricing

// Amount: 500
// Currency: "EUR"
// Cycle: 1
// Features: 0
// ID: "ziWi-ZOb28XR4sCGFCEpqQbd1FITVWYfTfKYUmV_wKKR3GsveN4HZCh9er5dhelYylEp-fhjBbUPDMHGU699fw=="
// MaxAddresses: 5
// MaxDomains: 1
// MaxMembers: 1
// MaxSpace: 5368709120
// MaxTier: 0
// MaxVPN: 0
// Name: "plus"
// Pricing:
// 1: 500
// 12: 4800
// 24: 7900
// __proto__: Object
// Quantity: 1
// Services: 1
// Title: "ProtonMail Plus"
// Type: 1