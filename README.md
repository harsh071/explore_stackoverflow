## DESCRIPTION
A user can input a tag T in the textbox and click search button, the web application shall extract from stackoverflow.com the 10 newest questions, as well as the 10 most voted related questions posted in the past week related to tag T as one merged list sorted based on their creation day in descending order. 

In the project directory, you can run:
### `npm start`

Runs the app in the development mode.

To search for a tag in stackoverflow enter the tag on the search bar and click on search. 

### Running the Docker Container:

=> Pull the docker repo

`docker pull harsh071/comp4350_assignment:assignment`

=> After pulling, build the image: 

`docker build -t harsh071/comp4350_assignment`

=> Then run the image. 

`docker run -it -p 3000:3000 harsh071/comp4350_assignment`


### Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
