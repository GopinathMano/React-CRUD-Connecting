import axios from "axios";
import { useState, useEffect } from "react";
import "./post.css";
import { Button, Form, Row, Col } from "react-bootstrap";
// import DisplayPost from "../Components/displayPost";
import { NavLink } from "react-router-dom";

export default function Post() {
  const [data, setData] = useState([]);
  const [user, setUser] = useState([]);
  //Form
  const [userId, setId] = useState(0);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [postId, setPostId] = useState("");

  useEffect(() => {
    console.log("in useEffect mount");
    getPost();
    getUser();
  }, []);

  const getPost = async () => {
    console.log("in");
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      setData(response.data);
    } catch (error) {
      console.log("error in fetching date", { error });
    }
  };

  const getUser = async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      setUser(response.data);
    } catch (error) {
      console.log("error in fetching date", { error });
    }
  };
  //DisplayData

  function DisplayPost({ data, user }) {
    //  const id=data.userId-1
    let userName = "";
    let email = "";
    let title = data.title;
    let body = data.body;
    user.forEach((a) => {
      if (data.userId === a.id) userName = a.name;
      email = a.email;
    });
    return (
      <>
        <div className="card1">
          <div className="cardHeader">
            <div className="name">
              <h3>{userName}</h3>
              <p>{email}</p>
            </div>
            <div className="title">
              <p>{title}</p>
            </div>
            <div className="topButtons">
              <div>
                <Button
                  variant="primary"
                  onClick={() => {
                    copyForm(data.id);
                  }}
                >
                  Update
                </Button>
              </div>
              <div>
                <Button
                  variant="danger"
                  onClick={() => {
                    deletePost(data.id);
                  }}
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
          <hr />
          <div className="cardBody">
            <div className="body">{body}</div>
            <hr />
            <NavLink className="link1" to={`/posts/${data.id}`}>
              View comments
            </NavLink>
          </div>
        </div>
      </>
    );
  }

  const sendPost = async () => {
    try {
      let response = await axios.post(
        "https://jsonplaceholder.typicode.com/posts",
        {
          userId: userId,
          title: title,
          body: body,
        }
      );
      console.log(response.data);
      let newData = [...data];
      newData.push(response.data);
      console.log(newData);
      setData(newData);
      setId(0);
      setTitle("");
      setBody("");
      setUserName("");
      setEmail("");
    } catch (error) {
      console.log(error);
    }
  };

  //edit-post
  let editPost = async (postid) => {
    console.log("in edit");
    try {
      let updated = await axios.put(
        `https://jsonplaceholder.typicode.com/posts/${postid}`,
        {
          userId: userId,
          title: title,
          body: body,
        }
      );
      let newData = [...data];
      let index = newData.findIndex((data) => data.id === postid);
      console.log(updated);
      // newData[index]=updated.data
      //the below method only works for fake api
      newData[index] = {
        userId: userId,
        id: postid,
        title: title,
        body: body,
      };
      console.log(newData[index]);
      setData(newData);
      setId(0);
      setTitle("");
      setBody("");
      setEmail("");
      setUserName("");
    } catch (error) {
      console.log(error);
    }
  };
  //delete-post
  const deletePost = async (id) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
      let postData = [...data];
      postData = postData.filter((a) => a.id !== id);
      setData(postData);
    } catch (error) {
      console.log("error in deleting", error);
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (postId) editPost(postId);
    else sendPost();
  };

  const handleChange = ({ target: { name, value, type, checked } }) => {
    console.log(name, value, type, checked);
    if (name === "userName") {
      setUserName(value);
      user.forEach((a) => {
        console.log(a.userName, value);
        if (a.username === value) {
          console.log(a.username, a.id);
          setId(a.id);
          setEmail(a.email);
        }
      });
    }
    if (name === "title") setTitle(value);
    if (name === "body") setBody(value);
  };

  //Copy form data
  const copyForm = (id) => {
    let newPost = data.filter((a) => {
      return a.id === id;
    });
    console.log(newPost[0].id);
    setId(newPost[0].userId);
    setTitle(newPost[0].title);
    setBody(newPost[0].body);
    setPostId(newPost[0].id);
    user.forEach((a) => {
      console.log(id, a.id);
      if (id === a.id) setEmail(a.email);
    });
  };

  return (
    <>
      <div className="formContainer">
        <h2 className="midd">Create Post</h2>
        <div className="form">
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>UserName</Form.Label>
              <Form.Select
                name="userName"
                value={userName}
                onChange={(event) => {
                  handleChange(event);
                }}
              >
                <option value="Bret">Bret</option>
                <option value="Antonette">Antonette</option>
                <option value="Karianne">Karianne</option>
                <option value="Kamren">Kamren</option>
                <option value="Leopoldo_Corkery">Leopoldo_Corkery</option>
                <option value="Elwyn.Skiles">Elwyn.Skiles</option>
                <option value="Maxime_Nienow">Maxime_Nienow</option>
                <option value="Delphine">Delphine</option>
                <option value="Moriah.Stanton">Moriah.Stanton</option>
              </Form.Select>
            </Form.Group>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>user Id</Form.Label>
                  <Form.Control
                    type="text"
                    name="userId"
                    value={userId}
                  ></Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={email}
                  ></Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={title}
                onChange={(event) => {
                  handleChange(event);
                }}
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                style={{ height: "100px" }}
                type="text"
                name="body"
                value={body}
                onChange={(event) => {
                  handleChange(event);
                }}
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Button className="btn " variant="success" type="submit">
                Submit
              </Button>
            </Form.Group>
          </Form>
        </div>
      </div>
      <div className="cardContainer">
        {data.map((a) => {
          return <DisplayPost data={a} user={user} />;
        })}
      </div>
    </>
  );
}
