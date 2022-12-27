# IN-BOOK
Spice of Life Web Application
## Requisite
On any linux distro download the following package using your favorite package manager:
```sh
sudo apt-get install git npm nodejs
```
## Configuration File ENV
Using the library <i>dotenv</i>, we can store every useful configuration element, like the database host or the database password, in a separated file.
Obviously the file <b>WILL NOT</b> be uploaded in the repository, thus must be created on your own with the name <i>'.env'</i> in the root folder.
This file must define these variables:
```js
PORT = NUMBER_HERE //The number used as server port
DB_HOST = STRING_HERE //Database Host IP address
DB_USER = STRING_HERE // Database user
DB_PASSWORD = STRING_HERE // Database password
DB_NAME = STRING_HERE // Database name
SECRET = STRING_HERE // Random generated string to encrypt sessions
```

## Starting Guide
0. Clone the current repository with
```bash
git clone https://github.com/Dagasma/CommunityAllert
```

1. Move inside the cloned folder with cd and install all required component with <b><i>NPM</b></i>
```bash
cd CommunityAllert/backend
npm install
```
2. Run the package's test with <b><i>NPM</b></i>
```bash
npm run test
```

3. + Run the page locally using <b><i>node.js</b></i>
    ```bash
    npm run start
    ```
    <b><i><center>ELSE</center></b></i>
    + Run in development mode using 
    ```bash
    npm run dev
    ```
    with this command on every change of any .js file the server will automatically restart.

## Download Node.js on windows
1.  Download Node.js https://nodejs.org/en/download/
2.  Check the version 
```bash
npm -v
node -v
```
3. Open shell and install npm 
```bash
npm install -g npm
```
### Guide
1. Documentation https://nodejs.org/docs/latest/api/
2. Italian guide of node.js https://www.youtube.com/watch?v=J5Ac3yVedgU&list=PLCBrF3nJN_i150hB-9zfXhHamDMVyA2R9&index=4
3. English guide of node.js https://www.youtube.com/watch?v=TlB_eWDSMt4
