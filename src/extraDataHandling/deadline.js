import { getAllProjects } from "../services/AdminServices";

const deadlineData = {
        nearDeadlinesCount:null
}


export function calculateDeadline(data) {

    let allProjectsdata = data.projects;
    const today = new Date();

    const onemonthFromToday = new Date();
    onemonthFromToday.setMonth(onemonthFromToday.getMonth() + 1);

    const nearDeadlinesCount = allProjectsdata.filter(project => {
        const deadline = new Date(project.deadline);
        return deadline >= today && deadline <= onemonthFromToday;
    }
    ).length;

    deadlineData.nearDeadlinesCount = nearDeadlinesCount;
    
    return deadlineData;
}