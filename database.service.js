const loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean in lectus ipsum. Maecenas vel nulla velit. Vivamus in varius leo, at pretium libero. Curabitur eu rutrum leo. Duis facilisis semper lectus, sit amet tempor erat. Quisque ut mauris in dui convallis convallis a sit amet ipsum. Integer semper augue at leo scelerisque, a condimentum neque gravida.";


/**
 * Mock service for getting profile reviews from the database
 * 
 */
const getTopProfileReviews = () => [
    {
        lawyerId: 1,
        lawyerName: "Mitchell M.",
        location: "Cherry Hill, NJ",
        subjectMatter: "Family Law",
        mostRecentReview: loremIpsum,
        overallRating: 5, 
        profileImage: "lawyer1.jpg"
    },
    {
        lawyerId: 2,
        lawyerName: "Joel C.",
        location: "Little Rock, AK",
        subjectMatter: "Job & Employment Law",
        mostRecentReview: loremIpsum,
        overallRating: 5,
        profileImage: "lawyer2.jpg"
    },
    {
        lawyerId: 3,
        lawyerName: "Brigida R.",
        location: "Dallas, TX",
        subjectMatter: "Family Law",
        mostRecentReview: loremIpsum,
        overallRating: 5,
        profileImage: "lawyer3.jpg"
    },
]

const getLawyerById = (id) => {
    return getTopProfileReviews().filter(profile => profile.lawyerId == id)
}

const getZipCodesAndCities = () => [
    "Nowheresville, XX 00000"
]

const getAllCategories = () => [
    "Family",
    "Criminal Defense",
    "Business",
    "Personal Injury",
    "Bankruptcy & Finances",
    "Products & Services",
    "Employment",
    "Real Estate",
    "Immigration",
    "Wills, Trusts & Estates",
    "Government",
    "Intellectual Property"
]

export default {
    getTopProfileReviews,
    getLawyerById,
    getZipCodesAndCities,
    getAllCategories
}