import { useState } from 'react'
import EditUser from './editUser'
import { v4 as uuidv4 } from 'uuid'
import { addUser, deleteUser } from './redux/userSlice'
import {Routes, Route, Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap'


const App = () => {

  const dispatch = useDispatch()
  const users = useSelector(state => state.users)
  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    setValues({
      firstName: '',
      lastName: '',
    })
    dispatch(addUser({
      id: uuidv4(),
      firstName: values.firstName,
      lastName: values.lastName
    }))
  }

  const handleDelete = (id) => {
    dispatch(deleteUser({id:id}))
  }

  return (
    <>
      <Container>
        <Row>
          <Col md={8} className="m-auto">
            <h2>Add New User</h2>
            <Form onSubmit={handleSubmit}>
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
                Submit
              </Button>
            </Form>
          </Col>
          <Col md={12}>

            <h3>Users List</h3>
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th># id</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Username</th>
                  <th colSpan={2}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr>
                    <td>{user.id}</td>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.firstName}{user.lastName}</td>
                    <td><Link to={`/edit/${user.id}`}>Edit</Link></td>
                    <td><a onClick={()=>handleDelete(user.id)} href="#">Delete</a></td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
      <Routes>
        <Route path="/edit/:id" exact element={<EditUser />} />
      </Routes>
    </>
  )
}

export default App
