export function getQueryCount(data) {

    const totalQueries = data.total_queries || 0;
    const closedQueries = data.closed || 0;

    const remainingQueries = totalQueries - closedQueries;

    return remainingQueries;
}

export function taskCompletionRate(data){
    const completionRate = (data.completed / data.total_projects ) * 100;

    return completionRate;
}