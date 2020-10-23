import React, { useState, useEffect } from 'react';
import './App.css';
import { Card, Container, Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
function App() {
  const [quotes, setQuotes] = useState([]);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchQuotes() {
      const response = await axios('https://type.fit/api/quotes');
      const quotesData = response.data.map(
        (quoteObj) =>
          new QuoteModel({
            color: getRandomColor(),
            quote: quoteObj.text,
            author: quoteObj.author,
          })
      );
      setQuotes(quotesData);
      setLoading(false);
      setQuoteIndex(Math.floor(Math.random() * quotesData.length));
      console.log(quotesData);
    }
    fetchQuotes();
  }, []);

  var quoteColor =
    quotes[quoteIndex] !== undefined ? quotes[quoteIndex].color : '#7c879b';
  return (
    <div
      className="d-flex justify-content-end align-items-center App"
      style={{
        backgroundColor: quoteColor,
      }}
    >
      <Container fluid className="Container">
        <Row className="justify-content-center">
          <Col xs="auto">
            <Card
              id="quote-box"
              className="p-md-3 shadow-lg rounded"
              style={{ width: '60em', height: '25em' }}
            >
              <Card.Body className="d-flex flex-column justify-content-between">
                {isLoading ? (
                  <div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                ) : (
                  <blockquote className="blockquote mb-0">
                    <p id="text"> {quotes[quoteIndex].quote} </p>
                    <footer className="blockquote-footer" id="author">
                      {quotes[quoteIndex].author}{' '}
                    </footer>
                  </blockquote>
                )}
                <Row>
                  <Col xs={10}>
                    <Button
                      id="tweet-quote"
                      href="twitter.com/intent/tweet"
                      variant="primary"
                      style={{
                        backgroundColor: quoteColor,
                        borderColor: quoteColor,
                      }}
                    >
                      <FontAwesomeIcon icon={faTwitter} />
                    </Button>
                  </Col>
                  <Col xs={2}>
                    <Button
                      id="new-quote"
                      href="#"
                      variant="primary"
                      style={{
                        backgroundColor: quoteColor,
                        borderColor: quoteColor,
                      }}
                      onClick={() => {
                        if (quoteIndex === quotes.length - 1) {
                          setQuoteIndex(0);
                        } else {
                          setQuoteIndex(quoteIndex + 1);
                        }
                      }}
                    >
                      Next Quote
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

class QuoteModel {
  constructor({ color, quote, author }) {
    this.color = color;
    this.quote = quote;
    this.author = author;
  }
}
function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export default App;
