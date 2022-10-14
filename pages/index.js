import { Fragment, useRef, useState } from "react";
import Head from "next/head";

import FeaturedPosts from "../components/home-page/featured-posts";
import Hero from "../components/home-page/hero";
import { getFeaturedPosts } from "../lib/posts-util";

function HomePage(props) {
  const [feedbackItems, setFeedbackItems] = useState([]);

  const emailInputRef = useRef();
  const feedbackInputRef = useRef();

  const submitFormHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredFeedback = feedbackInputRef.current.value;

    const body = { email: enteredEmail, text: enteredFeedback };

    console.log(body);

    fetch("/api/feedback", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  const loadFeedbackHandler = () => {
    fetch("/api/feedback")
      .then((response) => response.json())
      .then(({ feedback }) => setFeedbackItems(feedback));
  };

  return (
    <Fragment>
      <Head>
        <title>Max' Blog</title>
        <meta
          name="description"
          content="I post about programming and web development."
        />
      </Head>
      <div>
        <form onSubmit={submitFormHandler}>
          <div>
            <label htmlFor="email">Your Email Address</label>
            <input type="email" id="email" ref={emailInputRef} />
          </div>
          <div>
            <label htmlFor="feedback">Your Feedback</label>
            <textarea rows="5" id="feedback" ref={feedbackInputRef}></textarea>
          </div>
          <button>Send Feedback</button>
        </form>
        <hr />
        <button onClick={loadFeedbackHandler}>Load Feedback</button>
        <ul>
          {feedbackItems.map((item) => (
            <li>item</li>
          ))}
        </ul>
      </div>
    </Fragment>
  );
}

export function getStaticProps() {
  const featuredPosts = getFeaturedPosts();

  return {
    props: {
      posts: featuredPosts,
    },
  };
}

export default HomePage;
