export default function Welcome(props) {
  return (
    <div className="quizzical">
      <h1 className="quizzical__title">Quizzical</h1>
      <p className="quizzical__subtext">
        Lorem ipsum dolor sit amet norben tu sok lub ot ke dyeld
      </p>
      <div className="quizzical___form_options">
        <div className="form_group">
          <label htmlFor="trivia_amount">Amount of Questions </label>
          <select
            onChange={props.handleFormChange}
            value={props.formData.trivia_amount}
            name="trivia_amount"
            id="trivia_amount"
          >
            <option value="5">5</option>
            <option value="10">10</option>
          </select>
        </div>
        <div className="form_group">
          <label htmlFor="trivia_category">Category</label>
          <select
            name="trivia_category"
            onChange={props.handleFormChange}
            value={props.formData.trivia_category}
            id="trivia_category"
          >
            <option value="any">Any Category</option>
            <option value="9">General Knowledge</option>
            <option value="10">Entertainment: Books</option>
            <option value="11">Entertainment: Film</option>
            <option value="12">Entertainment: Music</option>
            <option value="13">Entertainment: Musicals &amp; Theatres</option>
            <option value="14">Entertainment: Television</option>
            <option value="15">Entertainment: Video Games</option>
            <option value="16">Entertainment: Board Games</option>
            <option value="17">Science &amp; Nature</option>
            <option value="18">Science: Computers</option>
            <option value="19">Science: Mathematics</option>
            <option value="20">Mythology</option>
            <option value="21">Sports</option>
            <option value="22">Geography</option>
            <option value="23">History</option>
            <option value="24">Politics</option>
            <option value="25">Art</option>
            <option value="26">Celebrities</option>
            <option value="27">Animals</option>
            <option value="28">Vehicles</option>
            <option value="29">Entertainment: Comics</option>
            <option value="30">Science: Gadgets</option>
            <option value="31">
              Entertainment: Japanese Anime &amp; Manga
            </option>
            <option value="32">Entertainment: Cartoon &amp; Animations</option>
          </select>
        </div>
        <div className="form_group">
          <label htmlFor="trivia_difficulty">Difficulty</label>
          <select
            name="trivia_difficulty"
            onChange={props.handleFormChange}
            value={props.formData.trivia_difficulty}
            id="trivia_difficulty"
          >
            <option value="any">Any Difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
      </div>
      <button className="button" onClick={() => props.setIsGameStarted(true)}>
        Start Quiz
      </button>
    </div>
  );
}
<select name="trivia_category" class="form-control"></select>;
