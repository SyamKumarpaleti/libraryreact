function AllBooks(){
    return (
        <div>
            <div>
      <AdminNavbar />

      <div className="container mt-5">
        <h1 className="mb-4">Admin Dashboard</h1>

        <button
          className={`btn ${showBooks ? "btn-danger" : "btn-success"} mb-2`}
          onClick={() => setShowBooks(!showBooks)}
        >
          {showBooks ? `Hide Books (${books.length})` : `Show Books (${books.length})`}
        </button>

        {showBooks && (
          <div className="d-flex flex-wrap">
            {books.map((book) => (
              <Card key={book.id} className="m-2" style={{ width: "18rem" }}>
                <Card.Body>
                  <Card.Title>{book.bookTitle}</Card.Title>
                  <Card.Text>
                    <strong>Author:</strong> {book.author}
                  </Card.Text>
                  <Card.Text>
                    <strong>Price:</strong> {book.bookPrice}
                  </Card.Text>
                  <Card.Text>
                    <strong>ISBN:</strong> {book.isbn}
                  </Card.Text>
                  <Button
                    variant="primary"
                    className="mr-2"
                    onClick={() => navigateToAddBook()}
                  >
                    ADD
                  </Button>
                  <Button
                    variant="info"
                    onClick={() => navigateToUpdateBook(book.id)}
                  >
                    UPDATE
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDeleteBook(book.id)}
                  >
                    DELETE
                  </Button>
                 
                </Card.Body>
              </Card>
            ))}
          </div>
        )}
        </div></div>

        </div>
    )
}
export default AllBooks;