import { Scoreboard } from "./scoreboard";

const homeTeamName = "Team A";
const awayTeamName = "Team B";

describe("Scoreboard", () => {
  let scoreboard: Scoreboard;

  beforeEach(() => {
    scoreboard = new Scoreboard();
  });

  describe("Initialization", () => {
    test("should initialize scoreboard with an empty list of matches", () => {
      expect(scoreboard.getMatches().size).toBe(0);
    });
  });

  describe("Match addition", () => {
    test("should add match to the scoreboard", () => {
      const firstMatch = scoreboard.addMatch(homeTeamName, awayTeamName);
      expect(scoreboard.getMatches().size).toBe(1);
      const secondMatch = scoreboard.addMatch(homeTeamName, awayTeamName);
      expect(scoreboard.getMatches().size).toBe(2);
      expect(scoreboard.getMatchById(firstMatch.id)).toBe(firstMatch);
      expect(scoreboard.getMatchById(secondMatch.id)).toBe(secondMatch);
    });

    test("should return created match after adding it to the scoreboard", () => {
      const match = scoreboard.addMatch(homeTeamName, awayTeamName);
      expect(match.homeTeam).toBe(homeTeamName);
      expect(match.awayTeam).toBe(awayTeamName);
      expect(match.homeScore).toBe(0);
      expect(match.awayScore).toBe(0);
    });
  });

  describe("Match retrieval", () => {
    test("should get match from the scoreboard by match id", () => {
      const exampleMatch1 = scoreboard.addMatch(homeTeamName, awayTeamName);
      const exampleMatch2 = scoreboard.addMatch(homeTeamName, awayTeamName);
      expect(scoreboard.getMatchById(exampleMatch1.id)).toBe(exampleMatch1);
      expect(scoreboard.getMatchById(exampleMatch2.id)).toBe(exampleMatch2);
    });

    test("should return undefined if match with provided id doesn't exist", () => {
      const incorrectMatchId = "id_of_non_existing_match";
      expect(scoreboard.getMatchById(incorrectMatchId)).toBe(undefined);
    });
  });

  describe("Match removal", () => {
    test("should remove match from the scoreboard", () => {
      const firstMatch = scoreboard.addMatch(homeTeamName, awayTeamName);
      const secondMatch = scoreboard.addMatch(homeTeamName, awayTeamName);
      expect(scoreboard.getMatches().size).toBe(2);
      expect(scoreboard.getMatchById(firstMatch.id)).toBe(firstMatch);
      expect(scoreboard.getMatchById(secondMatch.id)).toBe(secondMatch);
      scoreboard.removeMatch(firstMatch.id);
      expect(scoreboard.getMatches().size).toBe(1);
      expect(scoreboard.getMatchById(firstMatch.id)).toBe(undefined);
      expect(scoreboard.getMatchById(secondMatch.id)).toBe(secondMatch);
    });

    test("should throw error while trying to remove a match that doesn't exist", () => {
      const incorrectMatchId = "id_of_non_existing_match";
      expect(() => scoreboard.removeMatch(incorrectMatchId)).toThrow(
        `Match with id ${incorrectMatchId} doesn't exist`,
      );
    });
  });

  describe("Match update", () => {
    test("should update match score", () => {
      const match = scoreboard.addMatch(homeTeamName, awayTeamName);
      const homeScore = 5;
      const awayScore = 3;
      scoreboard.updateMatchScore(match.id, homeScore, awayScore);
      const matchFromTheScoreboard = scoreboard.getMatchById(match.id);
      expect(matchFromTheScoreboard?.homeScore).toBe(homeScore);
      expect(matchFromTheScoreboard?.awayScore).toBe(awayScore);
    });

    test("should not modify other matches score while updating match score", () => {
      const firstMatch = scoreboard.addMatch(homeTeamName, awayTeamName);
      const secondMatch = scoreboard.addMatch(homeTeamName, awayTeamName);
      const homeScore = 5;
      const awayScore = 3;
      scoreboard.updateMatchScore(firstMatch.id, homeScore, awayScore);
      const firstMatchFromTheScoreboard = scoreboard.getMatchById(
        firstMatch.id,
      );
      expect(firstMatchFromTheScoreboard?.homeScore).toBe(homeScore);
      expect(firstMatchFromTheScoreboard?.awayScore).toBe(awayScore);
      const secondMatchFromTheScoreboard = scoreboard.getMatchById(
        secondMatch.id,
      );
      expect(secondMatchFromTheScoreboard?.homeScore).toBe(0);
      expect(secondMatchFromTheScoreboard?.awayScore).toBe(0);
    });

    test("should throw error while trying to update a score of a match that doesn't exist", () => {
      const incorrectMatchId = "id_of_non_existing_match";
      expect(() => scoreboard.updateMatchScore(incorrectMatchId, 1, 1)).toThrow(
        `Match with id ${incorrectMatchId} doesn't exist`,
      );
    });
  });

  describe("Matches summary", () => {
    test("should return list of matches sorted by total score", () => {
      const firstMatchWithTotal2 = scoreboard.addMatch(
        homeTeamName,
        awayTeamName,
      );
      scoreboard.updateMatchScore(firstMatchWithTotal2.id, 1, 1);
      const secondMatchWithTotal1 = scoreboard.addMatch(
        homeTeamName,
        awayTeamName,
      );
      scoreboard.updateMatchScore(secondMatchWithTotal1.id, 1, 0);
      const thirdMatchWithTotal3 = scoreboard.addMatch(
        homeTeamName,
        awayTeamName,
      );
      scoreboard.updateMatchScore(thirdMatchWithTotal3.id, 1, 2);

      expect(scoreboard.getSummary()).toEqual([
        thirdMatchWithTotal3,
        firstMatchWithTotal2,
        secondMatchWithTotal1,
      ]);
    });

    test("should return list of matches sorted by latest creation date if the total score is the same", () => {
      const firstMatchWithEqualTotalScore = scoreboard.addMatch(
        homeTeamName,
        awayTeamName,
      );
      scoreboard.updateMatchScore(firstMatchWithEqualTotalScore.id, 1, 1);

      const secondMatchWithEqualTotalScore = scoreboard.addMatch(
        homeTeamName,
        awayTeamName,
      );
      scoreboard.updateMatchScore(secondMatchWithEqualTotalScore.id, 1, 1);

      const thirdMatchWithHigherTotalScore = scoreboard.addMatch(
        homeTeamName,
        awayTeamName,
      );
      scoreboard.updateMatchScore(thirdMatchWithHigherTotalScore.id, 2, 1);

      const fourthMatchWithLowerTotalScore = scoreboard.addMatch(
        homeTeamName,
        awayTeamName,
      );
      scoreboard.updateMatchScore(fourthMatchWithLowerTotalScore.id, 0, 1);

      expect(scoreboard.getSummary()).toEqual([
        thirdMatchWithHigherTotalScore,
        secondMatchWithEqualTotalScore,
        firstMatchWithEqualTotalScore,
        fourthMatchWithLowerTotalScore,
      ]);
    });

    test("should return an empty list if there are no matches", () => {
      expect(scoreboard.getMatches().size).toEqual(0);
      expect(scoreboard.getSummary()).toEqual([]);
    });

    test("should not include in the list matches that were removed", () => {
      const firstMatch = scoreboard.addMatch(homeTeamName, awayTeamName);
      const matchToBeRemoved = scoreboard.addMatch(homeTeamName, awayTeamName);
      const thirdMatch = scoreboard.addMatch(homeTeamName, awayTeamName);
      scoreboard.removeMatch(matchToBeRemoved.id);
      expect(scoreboard.getSummary()).toContain(firstMatch);
      expect(scoreboard.getSummary()).not.toContain(matchToBeRemoved);
      expect(scoreboard.getSummary()).toContain(thirdMatch);
    });

    test("example test from the task", () => {
      const firstMatchWithTotal5 = scoreboard.addMatch("Mexico", "Canada");
      scoreboard.updateMatchScore(firstMatchWithTotal5.id, 0, 5);
      const secondMatchWithTotal12 = scoreboard.addMatch("Spain", "Brazil");
      scoreboard.updateMatchScore(secondMatchWithTotal12.id, 10, 2);
      const thirdMatchWithTotal4 = scoreboard.addMatch("Germany", "France");
      scoreboard.updateMatchScore(thirdMatchWithTotal4.id, 2, 2);
      const fourthMatchWithTotal12 = scoreboard.addMatch("Germany", "France");
      scoreboard.updateMatchScore(fourthMatchWithTotal12.id, 6, 6);
      const fifthMatchWithTotal4 = scoreboard.addMatch(
        "Argentina",
        "Australia",
      );
      scoreboard.updateMatchScore(fifthMatchWithTotal4.id, 3, 1);

      expect(scoreboard.getSummary()).toEqual([
        fourthMatchWithTotal12,
        secondMatchWithTotal12,
        firstMatchWithTotal5,
        fifthMatchWithTotal4,
        thirdMatchWithTotal4,
      ]);
    });
  });
});
