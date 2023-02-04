import {useState} from 'react'
import { editUser } from './redux/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate, Navigate } from 'react-router-dom'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'



const EditExistingUser = () => {

    const params = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const users = useSelector(state=>state.users)

    const currUser = users.filter(user=>user.id === params.id)
    const {firstName, lastName} = currUser[0]
    console.log(params)
    const [values, setValues] = useState({
        firstName,
        lastName,
    })

    const handleUpdate = (e) => {
        e.preventDefault()
        setValues({firstName: '', lastName: ''})
        dispatch(editUser({
            id: params.id,
            firstName: values.firstName,
            lastName: values.lastName
        }))
        navigate('/')
    }

    return (
        <div>
            <Container>
                <Row>
                    <Col md={6} className="m-auto">
                        <h2>Edit User's Data</h2>
                        <Form onSubmit={handleUpdate}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    onChange={(e) => setValues({ ...values, firstName: e.target.value })}
                                    value={values.firstName}
                                    placeholder="Enter First Name" />
                                <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    onChange={(e) => setValues({ ...values, lastName: e.target.value })}
                                    value={values.lastName}
                                    placeholder="Last Name" />
                            </Form.Group>
                            <Button variant="outline-primary" type="submit">
                                Update
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default EditExistingUser
