// utils/goalsProcessor.js

export const calculateGoals = (matches) => {
    const goals = {};

    matches.forEach(match => {
        const [score1, score2] = match.score.split(' - ').map(Number);

        // Tính bàn thắng cho team1
        if (!goals[match.team1]) {
            goals[match.team1] = 0;
        }
        goals[match.team1] += score1;

        // Tính bàn thắng cho team2
        if (!goals[match.team2]) {
            goals[match.team2] = 0;
        }
        goals[match.team2] += score2;
    });

    return goals;
};
