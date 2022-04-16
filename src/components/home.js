import React, { useState, useEffect } from "react";
import "./home.css";
import axios from "axios";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";

function Home() {
  const [item, setItem] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [star, setStar] = useState([]);
  const [name, setName] = useState([]);

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
      setStar(data.items.map((i) => i.stargazers_count));
      setName(data.items.map((i) => i.name));
    } catch (error) {}
  };

  useEffect(() => {
    fetchItem();
  }, []);

  //   const sortByStars = item.map((s) => {
  //     return <div>{s.stargazers_count}</div>;
  //   });
  //   console.log(sortByStars);

  //   const sortByName = item.map((s) => {
  //     return <div>{s.name}</div>;
  //   });

  //   console.log(sortByName);

  const itemsPerPage = 6;
  const pagesVisited = pageNumber * itemsPerPage;

  const displayItems = item
    .sort(function (a, b) {
      return b.star - a.star;
    })
    .slice(pagesVisited, pagesVisited + itemsPerPage)
    .map((i) => {
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
    });

  const pageCount = Math.ceil(item.length / itemsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  //   console.log(star);
  //   console.log(name);
  //   console.log(item);
  return (
    <div className="container">
      <div className="main">{displayItems}</div>
      <div className="page">
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={"paginationBttns"}
          previousLinkClassName={"previousBttn"}
          nextLinkClassName={"nextBttn"}
          disabledClassName={"paginationDisabled"}
          activeClassName={"paginationActive"}
        />
      </div>
    </div>
  );
}

export default Home;
