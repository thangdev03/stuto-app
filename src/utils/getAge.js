export const getAge = (dob) => {
    const currYear = new Date().getFullYear();
    const birthYear = (new Date(dob)).getFullYear();
    return currYear - birthYear;
}

export const getMinAge = (users) => {
    let result = 0;
    users.forEach((user,index) => {
        const age = getAge(user.info.date_of_birth);
        if (index == 0) {
            result = age;
        } else {
            if (age < result) {
                result = age;
            }
        }
    }); 

    return result;
}

export const getMaxAge = (users) => {
    let result = 50;
    users.forEach((user,index) => {
        const age = getAge(user.info.date_of_birth);
        if (index == 0) {
            result = age;
        } else {
            if (age > result) {
                result = age;
            }
        }
    }); 

    return result;
}