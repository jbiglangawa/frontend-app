import './style.css'
import DatabaseService from './database.service'

const pageState = {
    zipCity: "",
    category: ""
}

// Get the modal
var whichFamilyLawModal = document.getElementById("which-family-law-modal");
var closeButton = document.getElementsByClassName("close")[0];
closeButton.onclick = function() {
  whichFamilyLawModal.style.display = "none";
}
window.onclick = function(event) {
  if (event.target == whichFamilyLawModal) {
    whichFamilyLawModal.style.display = "none";
  }
}

const openWhichFamilyLawModal = () => {
    if(pageState.zipCity != "" && pageState.category != "") {
        whichFamilyLawModal.style.display = "block";
    }
}


// Category constant dropdown values
window.onClickDropdownItem = (selectedCategory) => {
    let categoryValue = document.getElementById("category-value");
    categoryValue.innerHTML = selectedCategory;
    document.getElementById("category-dropdown-menu").style.display = "none";
    pageState.category = selectedCategory;

    openWhichFamilyLawModal();
}
const categories = DatabaseService.getAllCategories();
const categorySelection = categories.map(catVal => `<a class="dropdown-item" onclick="onClickDropdownItem('${catVal}')">${catVal}</a>`).join("");
document.getElementById("category-dropdown-menu").innerHTML = categorySelection
document.getElementById("category-dropdown").addEventListener("click", () => {
    document.getElementById("category-dropdown-menu").style.display = "block"
})

// Setting up profile reviews
const profiles = DatabaseService.getTopProfileReviews();
const profilesDisplay = profiles.map(profile => `
    <div class="profile">
        <div class="profile-image">
            <img src="${profile.profileImage}" alt="mitchell m.">
            <div>${profile.lawyerName}</div>
            <div class="location">${profile.location}</div>
        </div>
        <div class="profile-review">
            <div class="profile-review-header">
                <span>${profile.subjectMatter}</span>
                <span>${new Array(profile.overallRating).fill(0).map(() => "<i class=\"fas fa-star review-star\"></i>").join("")}</span>
            </div>
            <div>
                <div class="profile-review-summary">${profile.mostRecentReview}</div>
                <div class="profile-read-review">
                    <a href="/">Read Review <img src="book.png" alt="book"></a>
                </div>
            </div>
        </div>
    </div>`).join("");
document.getElementById("profile").innerHTML = profilesDisplay;

// Zip City Code dynamic autocomplete setup
const zipCityDropdownValues = DatabaseService.getZipCodesAndCities();
document.getElementById("search-zip-city").addEventListener("keyup", (evt) => {
    var val = evt.target.value
    var queryResults = document.getElementById("query-results")

    if (val.length > 1) {
        queryResults.innerHTML = ""
        queryResults.style.display = 'none'
        
        zipCityDropdownValues.forEach((zipCity) => {
            if(zipCity.match(new RegExp(val,'i'))) {
                const result = zipCity.replace(new RegExp(val, "i"), "<span class='highlight-autocomplete'>$&</span>")
                let suggestion = document.createElement("li");
                suggestion.setAttribute("data-value", zipCity);
                suggestion.innerHTML = result;
                suggestion.addEventListener("click", () => {
                    let selectedValue = suggestion.getAttribute("data-value");
                    document.getElementById("search-zip-city").value = selectedValue;
                    pageState.zipCity = selectedValue;

                    queryResults.innerHTML = ""
                    queryResults.style.display = 'none'

                    openWhichFamilyLawModal()
                })

                queryResults.append(suggestion)
                queryResults.style.display = 'block';
            }
        })
    } else {
        queryResults.innerHTML = ""
        queryResults.style.display = 'none'
    }
});

// Close popups on click elsewhere event
window.addEventListener('mouseup', function(event) {
    var queryResults = document.getElementById("query-results")
    if(queryResults.style.display == "block") {
        if(event.target != queryResults && event.target.parentNode != queryResults){
            queryResults.style.display = 'none';
        }
    }

    var categoryDropdownMenu = document.getElementById("category-dropdown-menu")
    if(categoryDropdownMenu.style.display == "block") {
        if(event.target != categoryDropdownMenu && event.target.parentNode != categoryDropdownMenu){
            categoryDropdownMenu.style.display = 'none';
        }
    }
});  
