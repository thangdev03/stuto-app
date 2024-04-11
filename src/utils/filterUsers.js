import { getAge } from "./getAge";

export const handleFilter = (availableUsers, minAge, maxAge, gender, major, subject, city) => {
    let data = availableUsers;
    if (gender === "man") {
        data = data.filter(user => user.info.sex === "Nam")
    } else if (gender === "woman") {
        data = data.filter(user => user.info.sex === "Nữ")
    }

    if (major) {
        data = data.filter(user => user.info.major?.name === major)
    }
    
    if (subject) {
        data = data.filter(user => user.info.wish?.subject?.name === subject)
    }

    if (city) {
        data = data.filter(user => user.info.location === city)
    }
    data = data.filter(user => {
        const age = getAge(user.info.date_of_birth)
        return age >= minAge && age <= maxAge
    })
        
    return data;
}