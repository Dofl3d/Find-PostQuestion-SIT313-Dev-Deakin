import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Menu, Container, Icon } from 'semantic-ui-react';
import FindQuestionPage from './components/FindQuestionPage';
import PostPage from './components/PostPage';
import 'semantic-ui-css/semantic.min.css';
import './styles/components.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Menu inverted color="blue">
          <Container>
            <Menu.Item as={Link} to="/" header>
              <Icon name="code" />
              DEV@Deakin
            </Menu.Item>
            <Menu.Item as={Link} to="/find-questions">
              <Icon name="search" />
              Find Questions
            </Menu.Item>
            <Menu.Item as={Link} to="/post">
              <Icon name="edit" />
              Post
            </Menu.Item>
          </Container>
        </Menu>

        <Container style={{ marginTop: '2em', marginBottom: '2em' }}>
          <Routes>
            <Route path="/" element={
              <div style={{ textAlign: 'center', padding: '4em 0' }}>
                <Icon name="home" size="huge" color="blue" />
                <h1>Welcome to DEV@Deakin</h1>
                <p style={{ fontSize: '1.2em', color: '#666' }}>
                  A community platform for developers to share questions and articles
                </p>
                <div style={{ marginTop: '2em' }}>
                  <Link to="/find-questions" style={{ marginRight: '1em' }}>
                    <Icon name="search" /> Explore Questions
                  </Link>
                  <Link to="/post">
                    <Icon name="edit" /> Create Post
                  </Link>
                </div>
              </div>
            } />
            <Route path="/find-questions" element={<FindQuestionPage />} />
            <Route path="/post" element={<PostPage />} />
          </Routes>
        </Container>
      </div>
    </Router>
  );
}

export default App;