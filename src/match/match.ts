export class Match {
  private readonly _id: string;
  private readonly _homeTeam: string;
  private readonly _awayTeam: string;
  private readonly _homeScore: number;
  private readonly _awayScore: number;

  constructor(homeTeam: string, awayTeam: string) {
    this._id = "";
    this._homeTeam = "";
    this._awayTeam = "";
    this._homeScore = 0;
    this._awayScore = 0;
    // @todo Implement
  }

  updateScore(homeScore: number, awayScore: number): void {
    // @todo Implement
  }

  get id(): string {
    return this._id;
  }

  get homeTeam(): string {
    return this._homeTeam;
  }

  get awayTeam(): string {
    return this._awayTeam;
  }

  get homeScore(): number {
    return this._homeScore;
  }

  get awayScore(): number {
    return this._awayScore;
  }
}
