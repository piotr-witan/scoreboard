import { Match } from "./match";
import { validate as validateUuid } from "uuid";

const homeTeamName = "Team A";
const awayTeamName = "Team B";

describe("Match", () => {
  test("should create match with given home and away team names", () => {
    const match = new Match(homeTeamName, awayTeamName);
    expect(match.homeTeam).toBe(homeTeamName);
    expect(match.awayTeam).toBe(awayTeamName);
  });

  test("should create match with a default 0 - 0 score", () => {
    const match = new Match(homeTeamName, awayTeamName);
    expect(match.homeScore).toBe(0);
    expect(match.awayScore).toBe(0);
    expect(validateUuid(match.id)).toBe(true);
  });

  test("should create match with valid id", () => {
    const match = new Match(homeTeamName, awayTeamName);
    expect(validateUuid(match.id)).toBe(true);
  });

  test("should not create two matches with the same id", () => {
    const match1 = new Match(homeTeamName, awayTeamName);
    const match2 = new Match(homeTeamName, awayTeamName);
    expect(match1.id).not.toBe(match2.id);
  });

  test("should update score", () => {
    const match = new Match(homeTeamName, awayTeamName);
    match.updateScore(5, 3);
    expect(match.homeScore).toBe(5);
    expect(match.awayScore).toBe(3);
  });
});
