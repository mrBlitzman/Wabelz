import Main from "../Templates/Layouts/Main.jsx";

export default function NotFound() {
  return (
    <Main>
      <div className="notfound-container">
        <h2 className="text-white four-oh-four mt-15">404</h2>
        <h1 className="text-pastel-purple header-primary text-center">
          Sorry, page not found.
        </h1>
        <p className="text-white text-center paragraph mt-5">
          It looks like you're lost...
          <br />
          That's a trouble?
        </p>
        <a className="button button-primary back-to-home">Home</a>
      </div>
    </Main>
  );
}
