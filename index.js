/*
 * Name: Caiwei Tian
 * Data: Nov 4, 2020
 * Section: CSE 154 AI
 * This is the javascript file for my jokes page. Each time the user requests,
 * a random joke will be fetched from API.
 */
"use strict";

(function() {
  const URL = "http://api.icndb.com/jokes/random";
  window.addEventListener("load", init);

  /**
   * Initialize the web page
   */
  function init() {
    id("get-joke").addEventListener("click", getJoke);
  }

  /**
   * Get a joke from API
   */
  function getJoke() {
    let url = URL;
    fetch(url)
      .then(checkStatus)
      .then(resp => resp.json())
      .then(fillJoke)
      .catch(handleError);
  }

  /**
   * Add the fetched joke to the web page
   * @param {JSON} response a JSON file containing a joke fetched from API
   */
  function fillJoke(response) {
    let card = id("joke-card");
    let prev = document.getElementById("joke");
    if (prev !== null) {
      card.removeChild(prev);
    }
    let joke = gen("p");
    let content = response.value.joke;
    joke.textContent = content.replace(/&quot;/g, '"');
    joke.setAttribute("id", "joke");
    card.appendChild(joke);
  }

  /**
   * Show an error message if error occured when fetching data
   */
  function handleError() {
    let msg = gen("aside");
    msg.textContent = "Oops..we lose it. Please try again later.";
    let card = id("joke-card");
    card.appendChild(msg);
  }

  /**
   * Returns the DOM object with the given id attribute.
   * @param {string} idName - element ID
   * @returns {object} DOM object associated with id (null if not found).
   */
  function id(idName) {
    return document.getElementById(idName);
  }

  /**
   * Returns a new element with the given tagname.
   * @param {string} tagName - name of element to create and return.
   * @returns {object} new DOM element with the given tagname.
   */
  function gen(tagName) {
    return document.createElement(tagName);
  }

  /**
   * Helper function to return the response's result text if successful, otherwise
   * returns the rejected Promise result with an error status and corresponding text
   * @param {object} response - response to check for success/error
   * @return {object} - valid response if response was successful, otherwise rejected
   *                    Promise result
   */
  function checkStatus(response) {
    if (!response.ok) {
      throw Error("Error in request: " + response.statusText);
    }
    return response; // a Response object
  }
})();