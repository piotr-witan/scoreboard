import { Match } from "../match/match";

export class Scoreboard {
  private matches: Map<string, Match> = new Map();

  addMatch(homeTeam: string, awayTeam: string): Match {
    const match = new Match(homeTeam, awayTeam);
    this.matches.set(match.id, match);
    return match;
  }

  getMatches(): Map<string, Match> {
    return this.matches;
  }

  getMatchById(matchId: string): Match | undefined {
    return this.matches.get(matchId);
  }

  updateMatchScore(
    matchId: string,
    homeScore: number,
    awayScore: number,
  ): Match {
    const match = this.matches.get(matchId);

    if (!match) {
      throw new Error(`Match with id ${matchId} doesn't exist`);
    }

    match.updateScore(homeScore, awayScore);
    return match;
  }

  removeMatch(matchId: string): void {
    if (!this.matches.has(matchId)) {
      throw new Error(`Match with id ${matchId} doesn't exist`);
    }
    this.matches.delete(matchId);
  }

  getSummary(): Match[] {
    return Array.from(this.matches.values()).sort((a, b) => {
      const aTotalScore = a.homeScore + a.awayScore;
      const bTotalScore = b.homeScore + b.awayScore;
      if (aTotalScore > bTotalScore) return -1;
      if (aTotalScore < bTotalScore) return 1;
      return -1; // Latest match should be first if total score is the same
    });
  }
}
