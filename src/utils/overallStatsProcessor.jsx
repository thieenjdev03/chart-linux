// utils/overallStatsProcessor.js

export const calculateOverallStats = (matches) => {
    const overallStats = { wins: 0, losses: 0, draws: 0 };

    matches.forEach(match => {
        const [score1, score2] = match.score.split(' - ').map(Number);

        if (score1 > score2) {
            overallStats.wins += 1;
            overallStats.losses += 1;
        } else if (score1 < score2) {
            overallStats.losses += 1;
            overallStats.wins += 1;
        } else {
            overallStats.draws += 2; // mỗi đội 1 trận hòa
        }
    });

    return overallStats;
};
