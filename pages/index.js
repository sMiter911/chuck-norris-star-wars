import Head from "next/head";
import Image from "next/image";
import chuck from "../public/chuck_png.png";
import { useState } from "react";

export default function Home() {
  // States for the character field
  const [character, setCharacter] = useState("");

  // Form validation state
  const [errors, SetErrors] = useState({});

  // Set button text on submit
  const [buttonText, setButtonText] = useState("Submit");

  // Set success or failure message states
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);

  const [joke, setJoke] = useState("");

  // Validation check method
  const handleValidation = () => {
    let errors = {};
    let formIsValid = true;

    // Check for empty fields
    if (!character) {
      formIsValid = false;
      errors["character"] = "Please enter a character";
    }

    // Set the errors state
    SetErrors(errors);

    // Return the form validation state
    return formIsValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check for form validation
    if (handleValidation()) {
      // Set the button text to loading
      setButtonText("Chuck is using the force...");

      // Set the success and failure states to false
      setSuccess(false);
      setFailure(false);

      // Make the API call
      fetch(`https://api.chucknorris.io/jokes/search?query=${character}`)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          // Set the button text to success
          setButtonText("The force is strong with Chuck!");
          console.log(data);
          // Set the success state to true
          setSuccess(true);
          // return the joke
          setJoke(randomJoke(data.result));
          // return joke;
        })
        .catch((err) => {
          // Set the button text to failure
          setButtonText("The force failed Chuck...");

          // Set the failure state to true
          setFailure(true);
        });
    }
  };

  const randomJoke = (jokes) => {
    const randomIndex = Math.floor(Math.random() * jokes.length);
    console.log(jokes[randomIndex].value);
    return jokes[randomIndex].value;
  };

  return (
    <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-600">
      <div className="relative bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10">
        <div className="relative flex flex-col justify-center">
          <Image src={chuck} width={294} height={298} />
          <h1 className="text-3xl font-bold">Chuck Norris is the Baddest</h1>
          <hr />
          <form className="flex flex-col py-2">
            <div className="form-group mb-6">
              <input
                onChange={(e) => setCharacter(e.target.value)}
                placeholder="Search for a Pop Culture Character"
                type="text"
                id="character"
                name="character"
                value={character}
                className="form-control
              block
              w-full
              px-3
              py-1.5
              text-base
              font-normal
              text-gray-700
              bg-white bg-clip-padding
              border border-solid border-gray-300
              rounded
              transition
              ease-in-out
              m-0
              focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              />
              {errors?.character && (
                <p className="text-red-500 flex justify-center">
                  Character cannot be empty.
                </p>
              )}
            </div>
            <div className="form-group mb-6 flex justify-center">
              <a
                onClick={(e) => {
                  handleSubmit(e);
                }}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
              >
                {buttonText}
              </a>
            </div>
            <div className="text-left">
              {success && (
                <p className="text-green-500">
                  Thank you! Chuck Norris has deemed you worth...for now.
                </p>
              )}
              {failure && (
                <p className="text-red-500">
                  Oops! Chuck is not happy, pack you your belongings.
                </p>
              )}
            </div>
          </form>
          <div className="flex flex-col justify-center">{joke}</div>
        </div>
      </div>
    </div>
  );
}
