import searchIcon from "../images/searchIcon.png";

export default function SearchBar({ setSearch }) {
  return (
    <div className="container my-4">
      <div className="row">
        <div className="col-12 col-md-6 mx-auto">
          <div className="input-group">
            {/* Input Field with Search Icon Inside */}
            <input
              type="text"
              className="form-control rounded-pill ps-5"
              placeholder="Type here to search"
              onChange={(e) => setSearch(e.target.value)}
              style={{
                position: "relative",
                paddingLeft: "30px", // Space for the icon
                height: "45px",
                fontSize: "18px",
                zIndex: 1, // Ensure the input is behind the icon
              }}
            />
            <img
              src={searchIcon}
              alt="search icon"
              // onClick={handleSearchClick}
              style={{
                position: "absolute",
                top: "50%",
                left: "10px",
                transform: "translateY(-50%)",
                width: "20px",
                height: "20px",
                objectFit: "contain",
                cursor: "pointer",
                zIndex: 2, // Ensure the icon stays above the input
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
