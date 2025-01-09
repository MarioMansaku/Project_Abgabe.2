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
npm install prettier  # Prettier installieren

npm install --save-dev eslint-config-prettier eslint-plugin-prettier prettier-plugin-organize-imports

# GitHub 

git add . # Alle Änderungen Stagen 
git add < file > # Spezifische Dateien    
git commit -m "message" # Einen Commit mit einer Nachricht erstellen
git push -u origin main # Alle Änderungen ins Haupt-Repository pushen 
```

## OpenApi Code Generation

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

## Prettier

```bash
npm install prettier  # Prettier installieren

node --eval "fs.writeFileSync('.prettierrc','{}\n')" # prettierrc erzeugen

node --eval "fs.writeFileSync('.prettierignore','# Ignore artifacts:\nbuild\ncoverage\n')"  
# prettierignore erzeugen
```

## Terminal Split Pane

Vier SplitPanes im Terminal bitte für eure Nutzung die Pfade entsprechend anpassen
How-To:
In Windows Terminal Ctrl + , öffnet die Settings, dann unten links 'json Datei bearbeiten und 'profiles' folgende Profile einfügen

```text
{     
    "commandline": "PathToPowerShellExecutable\\pwsh.exe -NoExit -Command \"docker compose up\"",
    "guid": "{d8a70359-38a9-4fb0-a55e-4718eb018741}",
    "hidden": true,
    "name": "Postgres",
    "startingDirectory": "C:\\Users\\UserName\\PathToProject\\.extras\\compose\\backend\\postgres"
},
{
    "commandline": "PathToPowerShellExecutable\\pwsh.exe -NoExit -Command \"docker compose up\"",
    "guid": "{441533ea-5686-4d21-8d84-17ef98d0ff11}",
    "hidden": true,
    "name": "Keycloak",
    "startingDirectory": "C:\\Users\\UserName\\PathToProject\\.extras\\compose\\backend\\keycloak"
},
{
    "commandline": "PathToPowerShellExecutable\\pwsh.exe -NoExit -Command \"npm run dev\"",
    "guid": "{a5661da3-5840-45a8-ae51-8635c6af596e}",
    "hidden": true,
    "name": "Frontend",
    "startingDirectory": "C:\\Users\\UserName\\PathToProject\\Project_Abgabe.2"
},
{
    "commandline": "PathToPowerShellExecutable\\pwsh.exe -NoExit -Command \"npm run dev\"",
    "guid": "{8b2b0a59-3e0a-4257-b078-deac27e1b2d1}",
    "hidden": true,
    "name": "Backend",
    "startingDirectory": "C:\\Users\\UserName\\PathToProject\\beispiel"
},
{
    "commandline": "wt -w 0 new-tab -p \"Backend\" ; split-pane -V -p \"Postgres\"  ; move-focus left ; split-pane -H -p \"Keycloak\" ; move-focus up ; move-focus right ; split-pane -H -p \"Frontend\"",
    "guid": "{585843b2-d111-4960-a3c7-bd508fbb5084}",
    "hidden": false,
    "name": "FrontEnd Demo",
    "tabTitle": "FrontEndDemo"
}
```

Das Profil 'FrontEnd Demo' sollte dann bei Terminal Neustart verfügbar sein.
