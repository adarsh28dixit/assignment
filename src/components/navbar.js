import React, { useState, useEffect } from "react";
import axios from "axios";

function Navbar() {
  const [item, setItem] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const fetchItem = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.get(
        "https://api.github.com/search/repositories?q=language:Javascript&sort=stars&order=desc",
        config
      );

      setItem(data.items);
    } catch (error) {}
  };

  useEffect(() => {
    fetchItem();
  }, []);
  console.log(item);

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = item.filter((value) => {
      return (
        value.language.toLowerCase().includes(searchWord.toLowerCase()) ||
        value.name.toLowerCase().includes(searchWord.toLowerCase())
      );
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="#">
          Navbar
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="#">
                Home <span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Link
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link disabled" href="#">
                Disabled
              </a>
            </li>
          </ul>
          <form className="form-inline my-2 my-lg-0">
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={wordEntered}
              onChange={handleFilter}
            />
            <button
              className="btn btn-outline-success my-2 my-sm-0"
              type="submit"
            >
              Search
            </button>
          </form>
        </div>
      </nav>

      {filteredData.length === 0 ? (
        <div></div>
      ) : (
        filteredData.map((i) => {
          return (
            <div key={i.id}>
              <a href={i.clone_url}>
                <div className="card text-center">
                  <div className="card-header">{i.full_name}</div>
                  <div className="card-body">
                    <h5 className="card-title">
                      {i.owner.login}{" "}
                      <i className="fa fa-star-o" aria-hidden="true"></i>
                      {i.stargazers_count}
                    </h5>
                    <p className="card-text">{i.description}</p>
                  </div>
                  <div>Forks : {i.forks_count}</div>
                  <div className="card-footer text-muted">{i.language}</div>
                </div>
              </a>
            </div>
          );
        })
      )}
    </div>
  );
}

export default Navbar;
