import './style.css'
import DatabaseService from './database.service'

const pageState = {
    zipCity: "",
    category: ""
}

// WhichFamilyLawModal Setup
var whichFamilyLawModal = document.getElementById("which-family-law-modal");
var wFLMCloseButton = document.getElementsByClassName("wflm-close")[0];
wFLMCloseButton.onclick = function() {
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

// ClientReviewsModal Setup
var clientReviewsModal = document.getElementById("client-reviews-modal");
var crmCloseButton = document.getElementsByClassName("crm-close")[0];
crmCloseButton.onclick = function() {
    clientReviewsModal.style.display = "none";
}
window.onclick = function(event) {
    if (event.target == clientReviewsModal) {
        clientReviewsModal.style.display = "none";
    }
  }
window.openClientReviewsModal = (lawyerId) => {
    clientReviewsModal.style.display = "block";
    const lawyer = DatabaseService.getLawyerById(lawyerId);
    console.log(lawyer)
    if(lawyer.length == 1) {
        renderOpenClientReviewModal(lawyer[0])
    }
}
const renderOpenClientReviewModal = (lawyer) => {
    var clientReviewModalContent = document.getElementById("client-review-modal-content");
    var stars = new Array(lawyer.overallRating).fill(0).map(() => "<i class=\"fas fa-star review-star\"></i>").join("");
    console.log(stars)
    clientReviewModalContent.innerHTML = `
            <div class="modal-title bigger">
                CLIENT REVIEWS
              </div>
              <hr class="solid">
              <div class="lawyer-profile">
                <img src="${lawyer.profileImage}">
                <div class="lawyer-info">
                  <div class="lawyer-name">${lawyer.lawyerName}</div>
                  <div class="lawyer-location">${lawyer.location}</div>
                  <div class="lawyer-subject-matter">${lawyer.subjectMatter}</div>
                </div>
              </div>
              <div class="modal-title lawyer-rating">
                Rating <span>(29 users)</span> <span>stars</span>
              </div>
              <hr class="solid">
              <div>
                <table>
                  <thead>
                    <th>Overall</th>
                    <th>${stars}</th>
                  </thead>
                  <tr>
                    <td>Responded in a timely manner</td>
                    <td>${stars}</td>
                  </tr>
                  <tr>
                    <td>Answered questions clearly</td>
                    <td>${stars}</td>
                  </tr>
                  <tr>
                    <td>Understood needs</td>
                    <td>${stars}</td>
                  </tr>
                  <tr>
                    <td>Gave complete and clear information</td>
                    <td>${stars}</td>
                  </tr>
                  <tr>
                    <td>Knowledgeable in legal area</td>
                    <td>${stars}</td>
                  </tr>
                  <tr>
                    <td>Good value for money</td>
                    <td>${stars}</td>
                  </tr>
                  <tr>
                    <td>Would hire again</td>
                    <td>${stars}</td>
                  </tr>
                  <tr>
                    <td>Would recommend to friend</td>
                    <td>${stars}</td>
                  </tr>
                </table>
                <hr class="solid">
                <div class="review-author">
                  <span>${stars}</span> by Dexter Marchal, 06/10/2016
                </div>
                <div class="review-desc">${lawyer.lawyerName} did a great job. Got my bench warrant set aside ... was sure I was going to jail ...phew. Judge seem to respect her and I got what I</div>
                <div>
                  <button type="button" id="close-client-reviews-modal">CLOSE</button>
                </div>
              </div>`

    document.getElementById("close-client-reviews-modal").addEventListener("click", function() {
        clientReviewsModal.style.display = "none";
    })
}

// OtherCategoriesModal Setup
var otherCategoriesModal = document.getElementById("other-categories-modal");
var ocCloseButton = document.getElementsByClassName("oc-close")[0];
ocCloseButton.onclick = function() {
  otherCategoriesModal.style.display = "none";
}
window.onclick = function(event) {
  if (event.target == otherCategoriesModal) {
    otherCategoriesModal.style.display = "none";
  }
}
document.getElementById("cant-find-cat-btn").addEventListener("click", () => {
  document.getElementById("other-categories-modal").style.display = "block";
})

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
const profilesDisplay = profiles.map((profile, i) => `
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
                <div class="profile-read-review" onclick="openClientReviewsModal(${profile.lawyerId})">
                    Read Review <img src="book.png" alt="book">
                </div>
            </div>
        </div>
    </div>
    ${i != profiles.length - 1 ? '<hr class="solid">' : ''}`).join("");
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
