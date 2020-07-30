export default function Login() {
  return (
    <div>
      <div className="card">
        <img
          alt="A photo of Joe LeBlanc and Andrew Asdell in adorable suits."
          src="andrew-and-joe.jpg"
          height="390"
          width="400"
        />
      </div>

      <h1 className="title">House of Asdell-LeBlanc</h1>

      <p className="description">
        Welcome to our house! Please enter a name to get started.
      </p>

      <form>
        <p>
          <input name="name" placeholder="your name here..." />
        </p>

        <p>
          <label>
            <input name="agree" type="checkbox" /> I agree to the{" "}
            <a href="https://firstdonoharm.dev/version/2/1/license.html">
              Hippocratic License
            </a>
            .
          </label>
        </p>

        <p>
          <button>Enter</button>
        </p>
      </form>
    </div>
  );
}
