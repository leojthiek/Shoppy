import React from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { Form, Button } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import Message from "../component/message"
import Loader from "../component/loader"
import { userDetailsAction, userUpdateAction } from "../redux/action/userAction"
import FormContainer from "../component/formContainer"
import { USER_EDIT_RESET } from "../redux/constant/userConstant"

export default function UserEditScreen() {
  const [name, setName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [isAdmin, setIsAdmin] = React.useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const params = useParams()
  const userId = params.id

  const userDetails = useSelector((state) => state.userDetails)
  const { error, loading, user } = userDetails

  const userEdit = useSelector((state) => state.userEdit)
  const {
    error: errorEdit,
    loading: loadingEdit,
    success: successEdit,
  } = userEdit

  React.useEffect(() => {
    if (successEdit) {
      dispatch({ type: USER_EDIT_RESET })
      navigate("/admin/userlist")
    } else {
      if (!user.name || user._id !== userId) {
        dispatch(userDetailsAction(userId))
      } else {
        setName(user.name)
        setEmail(user.email)
        setIsAdmin(user.isAdmin)
      }
    }
  }, [dispatch, user, userId, navigate, successEdit])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(userUpdateAction({ _id: userId, name, email, isAdmin }))
  }

  return (
    <div className="user-edit-screen">
      <Link to='/admin/userlist' className='btn btn-dark rounded'>
        Go Back
      </Link>
      <FormContainer>
        <h1 className="user-edit-title">Edit User</h1>
        {loadingEdit && <Loader />}
        {errorEdit && <Message variant='danger'>{errorEdit}</Message>}

        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name' className='form-name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                disabled={true}
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='email' className='form-email'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type='email'
                disabled={true}
                placeholder='Enter email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='isAdmin' className='form-checkbox'>
              <Form.Check
                type='checkbox'
                checked={isAdmin}
                label='isAdmin'
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group>
            <div className="d-grid">
              <Button type='submit' variant='primary' className='form-button'>
                update
              </Button>
            </div>
          </Form>
        )}
      </FormContainer>
    </div>
  )
}
