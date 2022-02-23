Author: Taylor Rainwater 113430036

This application analyzes tweets which are contained in the favs.JSON file in the data folder.
To run the application one must have node.js and express.js installed.

Once the appropriate software is installed, to start the server simply double click the start.bat file in the main folder. 

From here the app can be accessed in a browser from http://127.0.0.1:3000/

On the web browser there will be displayed several text fields and buttons for user control, each will be explained further:

1. 'Get all tweets': when clicked this button simply displays the time each tweet was created and the text associate with each tweet.

2. 'Get all IDs': when clicked this button displays all user IDs and the screen name associated with that ID.

3. 'Get a tweet by ID': here the user may enter a tweet ID in the tweet ID text box under this section, and when clicked, if a valid tweet ID is entered, the get tweet button will display the tim created and text of the tweet associated with the ID.

4. 'Post a tweet': here the user can input a valid ID in the tweet ID text box and a valid tweet body text in the tweet body text area. When clicked, if the tweet id and tweet body fields have valid inputs then the tweet will be added to the favs.JSON file containing all tweets.

5. 'Update screen name': here a user can enter an existing screen name in the screen name text input and a new screen name in the new screen name text input. If the old screen name exists in favs.JSON it will be updated where it appears when the update screen name button is clicked.

6. 'Delete a tweet': here the user can input an existing tweet ID in the tweet ID field, if the tweet ID exists in the favs.JSON file it will be deleted when the delete tweet button is clicked.