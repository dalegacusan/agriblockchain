# 📈 Team Agriblockchain

## Goal
To create an application (web or mobile) to help the agricultural sector have an efficient *farm-to-market* process by utilizing blockchain technology.

## Tech Stack

<img src="https://imgur.com/bZZKeaW.png" width="300"/>

**MongoDB** for *Key-Value Pair Data* (ex: *```{name: "Blockies"}```*) and a *Schemaless* (can have varying sets of data and fields) database system

**ExpressJS** for *routing* (ex: *```/home /contact /users/1```*)

**ReactJS** for *Dynamic Frontend Rendering* - no need to refresh page on changes

**NodeJS** for running Javascript on the server

## Installation

1. Install [NodeJS](https://nodejs.org/en/) (comes with `NPM`)
   
   * Make sure to select `LTS` version of NodeJS

   <img src="https://imgur.com/EQxmuDM.png" />
   
   **Verify that NodeJS and NPM are installed**

   Open your terminal and enter the following commands
   
   ```bash
   node --version
   ```
   
   The system should display the Node.js version installed on your system. You can do the same for NPM:
   
   ```bash
   npm --version
   ```
   
3. Install [Git](https://www.atlassian.com/git/tutorials/install-git#:~:text=Install%20Git%20on%20Windows,-Git%20for%20Windows&text=Download%20the%20latest%20Git%20for%20Windows%20installer.,pretty%20sensible%20for%20most%20users.)
   
   **Verify that Git is installed**

   Open your terminal and enter the following commands
   
   ```bash
   git --version
   ```
   
4. To clone the repository to your local machine, enter the following command

   Make sure to `cd` over to where you want your project file to be placed

   ```bash
   git clone https://github.com/swenceslao/agriblockchain.git
   ```

5. Open the folder and run `npm i` 
   
   **Note:** Running `npm i` will create a node_modules folder

   <img src="https://imgur.com/uiwux64.png" width="500"/>
   
   
6. `cd` over to **back-end** then run `npm i` again

   <img src="https://imgur.com/PhyIaBQ.png" width="500" />
   
7. Create a `.env` in the **back-end** folder and type the following
   
   ```
   MONGODB_URL=
   ```
   *Preferably do this in your Code Editor (VSCode in photo)*
   
   * The URL is censored because it contains an API key.
   * I'll send the API Key on Viber nalang
   
   <br>
   
   <img src="https://imgur.com/zv0OEwr.png" />
   
8. `cd` to **front-end** using the following command
   
   ```bash
   cd ../front-end/
   ```
   
   then run `npm i` again
   
   <img src="https://imgur.com/tlMZU75.png" width="500"/>
   
9. `cd` back to the root directory by typing the following

   ```
   cd ../
   ```
   
   You should now be in the `agriblockchain` folder
   
10. Enter the following to run the app 
   
    ```
    npm run dev
    ```
    
    You can see the backend server *running* on `localhost:8080` and the frontend on `localhost:3000`
