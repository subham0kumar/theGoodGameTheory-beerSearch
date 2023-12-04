import React, { useEffect, useState } from "react";
import "./Search.css";
import axios from "axios";

const Search = () => {
  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);

  
  const fetchAPI = async () => {
    try {
      const { data } = await axios.get("https://api.punkapi.com/v2/beers");
      setData(data);
    } catch (ex) {
      console.log(ex);
    }
  };
  useEffect(() => {
    fetchAPI();
  }, []);
  
  const handleSearch=() =>{
    return data.filter((beer)=>beer.name.toLowerCase().includes(search))
  }
  return (
    <>
      <div className="container">
        <div className="inputBox">
          <input
            type="search"
            placeholder="Search your favourite.."
            className="inputField"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </div>
        <div className="box-container">
          {handleSearch().map((beer, index) => {
            return (
              <>
                <div className="box" key={index}>
                  <h3>{beer.name}</h3>
                  <div className="inner-box">
                    <div className="img-bg">
                      <img
                        className="image"
                        src={beer.image_url}
                        alt={beer.name}
                        height={"100%"}
                        width={"100%"}
                      />
                    </div>
                    <div className="texts">
                      <h4>{beer.tagline}</h4>
                      <h5>{`${beer.description.substring(0, 150)}...`}</h5>
                      <h4>First Brewed: {beer.first_brewed}</h4>
                      <h6>pH: {beer.ph}</h6>
                      <h6>
                        Food Pairings:{" "}
                        {beer.food_pairing
                          .map((ele, i) => <li key={i}>{ele}</li>)
                          .slice(0, 3)}
                      </h6>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Search;
