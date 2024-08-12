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