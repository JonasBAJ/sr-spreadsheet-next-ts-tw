# Baby Excel project

Simplified, React-based spreadsheet application that implements some functionality of standard spreadsheet software. Despite the limitations of a deliberately slow and buggy server, it ensures smooth UX.

## Requirements

- Create a simple, reactive spreadsheet application using React/NextJS.
- UI design based on the provided Figma design.
- Implementation of Excel-like cells that auto-save user inputs.
- Reactive and user-friendly UI that can handle server limitations.
- Client-side computation of arithmetic expressions.
- Auto recomputation of expressions when referenced cell values change.
- Accommodation of a slow and buggy server to maintain a high-quality UX.

## Instructions

### Frontend

Install dependencies:

```
npm install
```

Run locally:

```
npm run dev
```

### Backend

A server as a docker image, [located here](https://hub.docker.com/r/stakingrewards/engineering-frontend-challenge)

Install image locally:

```
docker pull stakingrewards/engineering-frontend-challenge:latest
```

Run docker image:

```
docker run --name fe-challenge -d -p 8082:8081 stakingrewards/engineering-frontend-challenge:latest
```

# Feature improvements:

- Add/Remove columns
- Remove rows
- Excel-like function support
- Range selections
