export const sendInvitation = async (sender, receiver) => {
    try {
        const response = await fetch("https://stuto-api.onrender.com/invitation/send", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                sender,
                receiver
            })
        });
        const data = await response.json();
        if (response.status !== 201) {
            return data.message
        }
        return data;
    } catch (error) {
        return console.error(error);
    }
};

export const acceptInvitation = async (invitationId) => {
    try {
        const response = await fetch("http://localhost:5555/invitation/accept/" + invitationId, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const result = await response.json();
        if (response.status !== 200) {
            console.log(result.message)
        }
    } catch (error) {
        return console.error(error);
    }
};

export const cancelInvitation = async (invitationId) => {
    try {
        const response = await fetch("http://localhost:5555/invitation/" + invitationId, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await response.json();
        console.log(data.message);
    } catch (error) {
        return console.error(error);
    }
};

export const unfriendHandle = async (currentUserId, friendId) => {

};