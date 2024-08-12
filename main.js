import './style.css'
import DatabaseService from './database.service'

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
    </div>`)

document.getElementById("profile").innerHTML = profilesDisplay.join("");


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

                    queryResults.innerHTML = ""
                    queryResults.style.display = 'none'
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