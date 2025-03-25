import { v4 as uuid } from "uuid";

export class Match {
  private readonly _id: string;
  private readonly _homeTeam: string;
  private readonly _awayTeam: string;
  private _homeScore: number;
  private _awayScore: number;

  constructor(homeTeam: string, awayTeam: string) {
    this._id = uuid();
    this._homeTeam = homeTeam;
    this._awayTeam = awayTeam;
    this._homeScore = 0;
    this._awayScore = 0;
  }

  updateScore(homeScore: number, awayScore: number): void {
    this._homeScore = homeScore;
    this._awayScore = awayScore;
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
