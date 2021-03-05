In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Running the Docker Container:

=> Pull the docker repo

`docker pull harsh071/comp4350_assignment:assignment`

=> After pulling, build the image: 

`docker build -t harsh071/comp4350_assignment`

=> Then run the image. 

`docker run -it -p 3000:3000 harsh071/comp4350_assignment`
