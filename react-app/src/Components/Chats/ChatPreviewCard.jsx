import React from 'react';
import Card from 'react-bootstrap/Card';

function ChatPreviewCard(props) {
  const name = props.attr.name;
  return (
    <Card>
      <Card.Header as="h6">{name}</Card.Header>
      <Card.Body>
        <Card.Title>Special title treatment</Card.Title>
        <Card.Text>
          With supporting text below as a natural lead-in to additional content.
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default ChatPreviewCard;
