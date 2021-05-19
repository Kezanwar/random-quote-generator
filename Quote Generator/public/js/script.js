const loader = document.getElementById("loader");
const quoteContainer = document.getElementById("quote-container");
const authorText = document.getElementById("author");
const quoteText = document.getElementById("quote");
const bgDiv = document.getElementById("content-bg");
// const bgImages = [
//     {
//         "imgBG": "url(images/chris-barbalis-9mULtlv7A90-unsplash-min.jpg)"
//     },
    
//     {
//         "imgBG": "url(images/giulia-may-5j3TQQ-xd44-unsplash-min.jpg)"
//     },

//     {
//         "imgBG": "url(images/mario-gogh-jT0ZcYN-PFQ-unsplash-min.jpg)"
//     },

//     {
//         "imgBG": "url(images/muhd-asyraaf-9B-y0oNTbXo-unsplash-min.jpg)"
//     },

//     {
//         "imgBG": "url(images/renee-fisher-WbbONNTeadA-unsplash-min.jpg)"
//     },

//     {
//         "imgBG": "url(images/thiebaud-faix-rlRRIvWNJJo-unsplash-min.jpg)"
//     },

//     {
//         "imgBG": "url(images/toni-reed-t9KYFelr5sQ-unsplash.jpg)"
//     },

// ];

// Show Loading spinner and hide the quote container

function showLoadingSpinner() {

    loader.style.display = "initial";
    quoteContainer.hidden = true;

}

// Hide Loading spinner and show quote container 

function hideLoadingSpinner() {
    quoteContainer.hidden = false;
    loader.style.display = "none";
}

//  Get quotes from API
// Using an Asynchronous fetch request within a try/catch statement
// set apiQuotes as an empty array
// async request fetches the quotes and stores them in respone variable 
// uses .json() method to extract a json object with all quotes from the string of quotes that is fetched from the api and stored in const response on client side so new quotes can be generated without querying the API again



let apiQuotes = [];

async function getQuotes() {

    showLoadingSpinner();
    // show the loading animation whilst retreiving quotes from API
    // this is because sometimes the API can be sluggish and slow 

    const apiURL = 'https://type.fit/api/quotes';
    
    try {
        const response = await fetch(apiURL);
        apiQuotes = await response.json();
        newQuote();
        // once we have a response we generate a new quote (see func below)

    // throw new error ('oops')

    } catch (error) {
        
        // const errorCount = console.count(error);

     
        
        

        getQuotes();
    
    }
}


// generating a new random quote from the JSON object fetched from the API


function newQuote() {


    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    
    // querying the array with a random number between 0 and the length of the array and returning the chosen quote object into the variable

    if (!quote.author) {
            
        authorText.innerHTML = "Unknown"

        }
    
        else {

            authorText.innerText = quote.author;

    }
    
    // if there is no value in the object author property set the author text html to say unknown otherwise set this to the value in 
    
    if (quoteText.innerHTML.length >= 90 ) {

        quoteText.classList.add("long-quote");
       
    }
    
     else  {

        quoteText.classList.remove("long-quote");
       
    }

    // if quote text property is over a certain length toggle a class to the quotetext element to change font size etc
    
    quoteText.innerText = '"' + quote.text + '"';

    // set the quote text to value of object quote.text property value
    
    hideLoadingSpinner();

    // hide loader and show the quote container
    

   
    
}

// adding an event listener to the new quote to generate a new quote on click

const quoteBtn = document.getElementById('new-quote');

quoteBtn.addEventListener("click", function () {

    newQuote();
})



// On Load



window.onload = function () {


    getQuotes();
    // showLoadingSpinner();
   
    // const p = Math.floor(Math.random() * 7);

    // bgDiv.style.backgroundImage = bgImages[p].imgBG;
 
};





window.onbeforeunload = function () {
    window.scrollTo(0,0);
};

// copytoclipboard function - creating a textarea element with innerhtml of author and quote inside it, setting styles and setting attribute to read only

// selecting the text in the textarea, copying the value of the text area then removing the textarea element from the DOM

// readonly is a html attribute that holds no value therefore requires a space nexgt to it to not clash with other element attrbutes

function copyToClipboard() {
    
    const textArea = document.createElement("textarea");
    
    textArea.setAttribute('readonly', '');
    textArea.style.position = "absolute";
    textArea.style.left = "-200px";
    textArea.value = quoteText.innerHTML + " - " + authorText.innerHTML;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);


}

// adding event listener to add copytoclipboard function to copy cutton 

// Toggling class to popup for animation on click and calling copytoclipboard function

// listening for the end of the animation to remove animation class ready for the next time the button is clicked to prompt animation again


const copyBtn = document.getElementById("copy");
const popup = document.getElementById("popup");

copyBtn.addEventListener('click', function () {

    popup.classList.add("active");
    copyToClipboard();

    })

    popup.addEventListener('animationend', () => {

       popup.classList.remove("active"); 
    })



// To Tweet a Quote 

function tweetQuote() {

    const qText = quoteText.textContent;
    const aText = authorText.textContent;

    const twitterUrl = `https://twitter.com/intent/tweet?text=${qText} - ${aText} // from Kez's Random Quote Generator`;
    window.open(twitterUrl, '_blank');

    // using twitter intent documentation to insert the current quote and author in the dom to a tweet in another tab using a template string with back-ticks and ${} to insert variables
}

document.getElementById("twitter").addEventListener("click", tweetQuote);

// adding event listener to tweet button to call the tweete quote function



// TO DO LIST!


// 4. work on responsiveness - tablet & mobile
// 5. ensure all css and js files are commented out properly
// 6. push to git