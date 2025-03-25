# Scoreboard

A simple sport matches scoreboard library written in TypeScript.

## Usage

### Initialization

```typescript
import { Scoreboard } from "scoreboard";
const scoreboard = new Scoreboard();
```

### Adding a match

```typescript
scoreboard.addMatch("Team A", "Team B");
```
### Retrieving all matches

```typescript
scoreboard.getMatches();
```

### Retrieving a match by id

```typescript
scoreboard.getMatchById("match_id");
```

### Removing a match

```typescript
scoreboard.removeMatch("match_id");
```

### Updating a match score

```typescript
scoreboard.updateMatchScore("match_id", 5, 3); // Update given match home score to 5 and away score to 3
```

### Getting a summary of all matches

```typescript
scoreboard.getSummary(); // Returns list of Match objects sorted by total score and then by the latest start date
```

## Running tests

You can check the test results in the automated pipeline in the [Actions tab](https://github.com/piotr-witan/scoreboard/actions/workflows/test.yml) or run them on your own using following command:
```bash 
npm test
```