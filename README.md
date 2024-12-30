# Kommandos 

```bash
npm run dev # Server hochfahren 

# Dependencies
npm install loglevel # LogLevels für die Protokollierung installieren -> src/utils/logger.js 
npm install axios # Axios bietet eine sauberere und prägnantere API für HTTP-Anfragen im Vergleich zur Fetch-API.
npm install @mui/material # Installation von "@mui/icons-material für page.tsx
npm install react-slick --legacy-peer-deps #Installation von react slick für das Karussell
npm install slick-carousel --legacy-peer-deps #Installation der Karussell-Komponenten
npm install next-auth jwt-simple bcryptjs --legacy-peer-deps #Installation der fürs Login notwenigen Packete

# GitHub 

git add . # Alle Änderungen Stagen 
git add < file > # Spezifische Dateien    
git commit -m "message" # Einen Commit mit einer Nachricht erstellen
git push -u origin main # Alle Änderungen ins Haupt-Repository pushen 
```

# OpenApi Code Generation

Use the provided OpenAPI documentation from {{Host}}:Port/swagger-json (e.g. https://localhost:3000/swagger-json):
```bash
  npm install -g openapi-typescript
```
This is managed via package.json dependencies. 
To generate the code for client, dtos etc. Following command may be required.
To further ease integration the OpenAPI documentation is included in this project, but can otherwise be directly loaded from the API via: {{ }}

```bash
openapi-typescript C:\Users\...\...\...\openapi\swagger.json --output src/api.ts
```
