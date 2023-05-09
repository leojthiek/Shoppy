import React from "react"
import { LinkContainer } from "react-router-bootstrap"
import { Table, Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { Row, Col } from "react-bootstrap"
import Loader from "../component/loader"
import Message from "../component/message"
import { userListAction, userDeleteAction } from "../redux/action/userAction"
import AdminSidebar from "../component/adminSidebar"

export default function UserListScreen() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userList = useSelector((state) => state.userList)
  const { users, error, loading } = userList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userDelete = useSelector((state) => state.userDelete)
  const { success: successDelete } = userDelete

  React.useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(userListAction())
    } else {
      navigate("/")
    }
  }, [dispatch, navigate, userInfo, successDelete])

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete user")) {
      dispatch(userDeleteAction(id))
    }
  }

  return (
    <>
      <Row>
        <Col md={2}>
          <AdminSidebar />
        </Col>

        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Col md={10}>
            <div className='pt-4'>
              <h1 className='userlist-title'>Users :</h1>
            </div>
            <Table bordered hover responsive className='table-sm'>
              <thead>
                <tr className='userlist-head'>
                  <td>ID</td>
                  <td>NAME</td>
                  <td>EMAIL</td>
                  <td>ADMIN</td>
                  <td></td>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id} className='userlist-row'>
                    <td>{user._id}</td>
                    <td>{user.name}</td>

                    <td>
                      <a
                        href={`mailto: ${user.email}`}
                        style={{ textDecoration: "none", color: "white" }}
                      >
                        {user.email}
                      </a>
                    </td>

                    <td>
                      {user.isAdmin ? (
                        <i
                          className='fas fa-check'
                          style={{ color: "green" }}
                        ></i>
                      ) : (
                        <i
                          className='fas fa-times'
                          style={{ color: "red" }}
                        ></i>
                      )}
                    </td>
                    <td>
                      <LinkContainer to={`/admin/user/${user._id}/edit`}>
                        <Button
                          variant='light'
                          className='btn-sm'
                          style={{ color: "black" }}
                        >
                          <i className='fas fa-edit'></i>
                        </Button>
                      </LinkContainer>
                      <Button
                        variant='danger'
                        className='btn-sm'
                        onClick={() => handleDelete(user._id)}
                      >
                        <i className='fas fa-trash'></i>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        )}
      </Row>
    </>
  )
}
