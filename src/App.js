import './App.css';
import React, { useEffect, useState } from 'react'

function App() {
  const [tracks, setTracks] = useState([])
  const [search, setSearch] = useState("")
  const [isLoading, setIsLoading] = useState(false)
    const getTracks = async()=>{
      setIsLoading(true)
      let data = await fetch(`https://v1.nocodeapi.com/romit/spotify/YWvvhHsPcMskQcTB/search?q=${search=="" ? "trending" : search}&type=track`)
      let convertedData = await data.json();
      console.log(convertedData.tracks.items);
      setTracks(convertedData.tracks.items)
      setIsLoading(false)
    }
    useEffect(() => {
     getTracks()
    }, [])

    
  return (
    <>
    <div>
        <nav className="navbar navbar-dark navbar-expand-lg bg-dark">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">
      Enjoy Musically!!
    </a>
    <div className="collapse navbar-collapse d-flex justify-content-center" id="navbarSupportedContent">
     
      
        <input
          value={search}
          onChange={(e)=> setSearch(e.target.value)}
          className="form-control me-2 w-75"
          type="search"
          placeholder="Search"
          aria-label="Search"
        />
        <button className="btn btn-outline-success" onClick={getTracks}>
          Search
        </button>
     
    </div>
  </div>
</nav>

    </div>

    <div className='container'>
      <div className={`row ${isLoading ? "":"d-none"}`}>
        <div className="col-12 py-5 text-center">
          <div
             className="spinner-border"
             style={{ width: "3rem", height: "3rem" }}
             role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>

        </div>
      </div>
       <div className="row">
          {
            tracks.map((e)=>{
                return(
                    // <div key={e.id} className="col">
                    //   <img className='border-2 '
                    //   src={e.album.images[1].url}
                    //   alt=''
                    //   />
                    // </div>
                    <div key={e.id} className='col-lg-3 col-md-6 py-2'>
                    <div className="card" style={{ width: "18rem" }}>
                      <img src={e.album.images[1].url} className="card-img-top" alt="..." />
                      <div className="card-body">
                      <h5 className="card-title">{e.name}</h5>
                      <p className="card-text">
                        <p>
                           {e.album.artists[0].name}
                        </p>
                        <p>
                           Release: {e.album.release_date}
                        </p>
                      </p>
                      <audio src={e.preview_url} controls className='w-100'></audio>
                      </div>
                    </div>
                    </div>
                )
            })
          }
       </div>
    </div>
    </>
  );
}

export default App;
