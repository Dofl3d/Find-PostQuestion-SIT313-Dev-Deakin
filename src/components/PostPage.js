// PostPage.js
// This component provides a form for users to post new questions.
// It collects question data, uploads images if provided, and saves the question to Firestore.
import React, { useState } from 'react';
import { Form, Button, Container, Header, Message, Card, Segment, Icon } from 'semantic-ui-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/config';
import ImageUpload from './ImageUpload';

const PostPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tags: '',
    type: 'question'
  });
  const [imageBase64, setImageBase64] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', content: '' });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageSelect = (base64String) => {
    setImageBase64(base64String);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', content: '' });
    
    try {
      // Prepare post data
      const postData = {
        title: formData.title,
        description: formData.description,
        type: formData.type,
        tags: formData.tags 
          ? formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
          : [],
        imageBase64: imageBase64 || null, // Store Base64 string or null
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };

      // Save to Firestore
      const docRef = await addDoc(collection(db, 'posts'), postData);
      
      setMessage({ 
        type: 'success', 
        content: `Post created successfully! Document ID: ${docRef.id}` 
      });
      
      // Reset form
      setFormData({ title: '', description: '', tags: '', type: 'question' });
      setImageBase64(null);
      
      // Clear file input
      const fileInput = document.getElementById('image-upload');
      if (fileInput) fileInput.value = '';
      
    } catch (error) {
      console.error('Error creating post:', error);
      setMessage({ 
        type: 'error', 
        content: `Error creating post: ${error.message}` 
      });
    }
    
    setLoading(false);
  };

  return (
    <Container>
      <Header as="h1" icon>
        <Icon name="edit" />
        Create New Post
        <Header.Subheader>
          Share your questions and articles with the DEV@Deakin community
        </Header.Subheader>
      </Header>
      
      {message.content && (
        <Message 
          positive={message.type === 'success'} 
          negative={message.type === 'error'}
          icon
        >
          <Icon name={message.type === 'success' ? 'checkmark' : 'warning'} />
          <Message.Content>
            <Message.Header>
              {message.type === 'success' ? 'Success!' : 'Error!'}
            </Message.Header>
            {message.content}
          </Message.Content>
        </Message>
      )}

      <Card fluid>
        <Card.Content>
          <Form onSubmit={handleSubmit} loading={loading}>
            {/* Post Type Selection */}
            <Form.Group inline>
              <label><strong>Post Type:</strong></label>
              <Form.Radio
                label="Question"
                value="question"
                checked={formData.type === 'question'}
                onChange={(e, { value }) => setFormData({ ...formData, type: value })}
              />
              <Form.Radio
                label="Article"
                value="article"
                checked={formData.type === 'article'}
                onChange={(e, { value }) => setFormData({ ...formData, type: value })}
              />
            </Form.Group>

            {/* Title */}
            <Form.Input
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder={`Enter your ${formData.type} title...`}
              required
              icon="heading"
              iconPosition="left"
            />

            {/* Description */}
            <Form.TextArea
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder={`Describe your ${formData.type} in detail...`}
              required
              rows={6}
            />

            {/* Tags */}
            <Form.Input
              label="Tags"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="react, javascript, firebase, web-development"
              icon="tags"
              iconPosition="left"
            />
            <p style={{ fontSize: '0.9em', color: '#666', marginTop: '-10px' }}>
              Separate tags with commas. Tags help others find your post.
            </p>

            {/* Image Upload */}
            <Segment>
              <Header as="h4" dividing>
                <Icon name="image" />
                Add Image (Optional)
              </Header>
              <ImageUpload onImageSelect={handleImageSelect} />
            </Segment>

            {/* Submit Button */}
            <Button 
              type="submit" 
              primary 
              size="large"
              disabled={loading || !formData.title || !formData.description}
              icon
              labelPosition="right"
            >
              <Icon name="send" />
              {loading ? 'Creating Post...' : `Post ${formData.type}`}
            </Button>
            
            <Button 
              type="button" 
              secondary 
              size="large"
              onClick={() => {
                setFormData({ title: '', description: '', tags: '', type: 'question' });
                setImageBase64(null);
                setMessage({ type: '', content: '' });
              }}
              style={{ marginLeft: '10px' }}
            >
              Clear Form
            </Button>
          </Form>
        </Card.Content>
      </Card>
    </Container>
  );
};

export default PostPage;