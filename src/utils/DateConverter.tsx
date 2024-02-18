interface props {
    givenDate?: string
}

export default function TodayDate (props?: props) {
    let newDate = new Date()
    let date = newDate.getDate();
    let day = newDate.getDay();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    return `${days[day]}, ${date} ${monthNames[month]} ${year}`
}