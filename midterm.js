function create() {
  // Get input values from the user
   const postTitle = document.getElementById("postTitleInput").value;
  const postContent = document.getElementById("postContentInput").value;
  const commentAuthor = document.getElementById("commentAuthorInput").value;
  const commentContent = document.getElementById("commentContentInput").value;

  // Create the post object
  const postObject = {
    title: postTitle,
    content: postContent,
    author: {
      name: commentAuthor
    },
    comments: [
      {
        author: {
          name: commentAuthor
        },
        content: commentContent
      }
    ]
  };

  // Send a POST request to the server to create the post
  fetch('/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(postObject)
  })
  .then(response => response.json())
  .then(data => {
    // Display the created post and comment on the page
    const postsContainer = document.getElementById("postsContainer");
    const postElement = createPostElement(data);
    postsContainer.appendChild(postElement);
  })
  .catch(error => console.error(error));
}

// Helper function to create a post element from a post object
function createPostElement(postObject) {
  const postElement = document.createElement("div");
  postElement.classList.add("post");

  const postTitleElement = document.createElement("h2");
  postTitleElement.textContent = postObject.title;
  postElement.appendChild(postTitleElement);

  const postContentElement = document.createElement("p");
  postContentElement.textContent = postObject.content;
  postElement.appendChild(postContentElement);

  const postAuthorElement = document.createElement("p");
  postAuthorElement.textContent = `Written by ${postObject.author.name}`;
  postElement.appendChild(postAuthorElement);

  const commentsContainer = document.createElement("div");
  commentsContainer.classList.add("comments");
  postObject.comments.forEach(comment => {
    const commentElement = createCommentElement(comment);
    commentsContainer.appendChild(commentElement);
  });
  postElement.appendChild(commentsContainer);

  return postElement;
}

// Helper function to create a comment element from a comment object
function createCommentElement(commentObject) {
  const commentElement = document.createElement("div");
  commentElement.classList.add("comment");

  const commentAuthorElement = document.createElement("p");
  commentAuthorElement.classList.add("comment-author");
  commentAuthorElement.textContent = commentObject.author.name;
  commentElement.appendChild(commentAuthorElement);

  const commentDateElement = document.createElement("span");
  commentDateElement.classList.add("comment-date");
  commentDateElement.textContent = new Date().toLocaleDateString();
  commentAuthorElement.appendChild(commentDateElement);

  const commentContentElement = document.createElement("p");
  commentContentElement.classList.add("comment-content");
  commentContentElement.textContent = commentObject.content;
  commentElement.appendChild(commentContentElement);

  return commentElement;
}
