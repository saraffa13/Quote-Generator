const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// const arr=localQuotes

let apiQuotes = [] ;


const loading=()=>{
    loader.hidden=false;
    quoteContainer.hidden=true;
};

const loaded=()=>{
    loader.hidden=true;
    quoteContainer.hidden=false;
}


//Get quotes From API 
const newQuote=()=>{
    //Pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random()*apiQuotes.length)];
    console.log(quote);

        if(!quote.author)
        {
            authorText.innerHTML='Unknown'
        }
        else{
            authorText.innerHTML = quote.author;

        }


        if(quote.text.length > 50)
        {
            quoteText.classList.add('long-quote');            
        }
        else 
        {
            quoteText.classList.remove('long-quote');
        }
             
    quoteText.innerHTML=quote.text;
}

async function getQuotes()
{
    loading();
    const apiUrl='https://type.fit/api/quotes';
    try{
        const response= await fetch(apiUrl);
        apiQuotes = await response.json();
        // console.log(apiQuotes[10]);
        newQuote();
    }
    catch(error){
        // alert(error);
    }
    loaded();
}

getQuotes();
// loading();

function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent.tweet?text=${quoteText.textContent} - ${authorText.textContent}`
    window.open(twitterUrl,'_blank');
}


twitterBtn.addEventListener('click',tweetQuote)
newQuoteBtn.addEventListener('click' ,newQuote);





