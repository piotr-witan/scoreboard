import { Match } from "../match/match";

export class Scoreboard {
  private matches: Map<string, Match> = new Map();

  addMatch(homeTeam: string, awayTeam: string): Match {
    // @todo Implement
    return new Match("", "");
  }

  getMatches(): Map<string, Match> {
    return this.matches;
  }

  getMatchById(matchId: string): Match | undefined {
    // @todo Implement
    return;
  }

  updateMatchScore(
    matchId: string,
    homeScore: number,
    awayScore: number,
  ): Match {
    // @todo Implement
    return new Match("", "");
  }

  removeMatch(matchId: string): void {
    // @todo Implement
  }

  getSummary(): Match[] {
    // @todo Implement
    return [];
  }
}
