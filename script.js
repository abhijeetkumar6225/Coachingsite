// setting dark theme
function toggleTheme() {
    togglePageBackground(); // Call function to toggle page background
    jumboTheme() ;// Call function to toggle card theme
  }

  function togglePageBackground() {
    document.body.classList.toggle('dark-page-background'); // Toggle dark background color for page
  }

 
    // card.classList.toggle('dark-carrd'); // Toggle dark theme for card
  
function jumboTheme() {
    var jumbotron = document.getElementById('jumbotron');
    jumbotron.classList.toggle('dark-jumbotron');
  }
  function cardbackTheme(){
    cardTheme();
    togglePageBackground();
}

  // Function to toggle between themes
function cardTheme() {
    const container = document.querySelector('.parentcard');
    container.classList.toggle('dark-theme');
}

// Event listener for the theme button
document.getElementById('themeButton').addEventListener('click', toggleTheme);

//   function toggleTheme() {
//     var card = document.getElementById('card');
//     // Toggle between light and dark theme classes
//     card.classList.toggle('dark-card');
//   }



// Function to show/hide the "Back to Top" button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    var backToTopButton = document.getElementById("back-to-top-btn");
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        backToTopButton.style.display = "block";
    } else {
        backToTopButton.style.display = "none";
    }
}

// Function to scroll back to the top of the page when the button is clicked
function backToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}
