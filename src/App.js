import { Component } from "react";
import "./App.css";
import Posts from "./components/Posts";
import Button from "./components/Button";
import { loadPosts } from "./utils/loadPosts";
import Input from "./components/Input";

class App extends Component {
  state = {
    posts: [],
    allPosts: [],
    pages: 2,
    postsPerPage: 2,
    disabled: false,
    searchValue: "",
  };

  async componentDidMount() {
    await this.loadPosts();
  }

  loadPosts = async () => {
    const postAndPhotos = await loadPosts();
    const postsPerPage = this.state.postsPerPage;
    this.setState({
      posts: postAndPhotos.slice(0, postsPerPage),
      allPosts: postAndPhotos,
    });
  };

  loadMorePosts = () => {
    const { postsPerPage, allPosts, pages } = this.state;
    if (postsPerPage + pages < allPosts.length) {
      this.setState({
        posts: allPosts.slice(0, postsPerPage + pages),
        postsPerPage: postsPerPage + pages,
      });
    } else {
      this.setState({ posts: allPosts, disabled: true });
    }
  };

  handleChange = (e) => {
    // console.log(e.target.value);
    this.setState({ searchValue: e.target.value });
  };

  render() {
    const { posts, disabled, searchValue, allPosts } = this.state;
    const { loadMorePosts, handleChange } = this;

    const searchPosts = searchValue
      ? allPosts.filter((post) =>
          post.title.toLowerCase().includes(searchValue.toLowerCase())
        )
      : posts;

    return (
      <section className="container">
        <Input handleChange={handleChange} searchValue={searchValue} />

        {!!searchValue && (
          <>
            <h1>Search Value: {searchValue}</h1>
          </>
        )}
        <br />
        <br />
        <br />

        {searchPosts.length === 0 && <h1>Dont exist...</h1>}

        <Posts posts={searchPosts} />
        {!searchValue && (
          <Button
            text="Load more posts..."
            click={loadMorePosts}
            disabled={disabled}
          />
        )}
      </section>
    );
  }
}

export default App;
