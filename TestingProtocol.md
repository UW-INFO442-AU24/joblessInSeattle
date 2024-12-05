<h1 align="center"><strong>Testing Protocol</strong></h1>

<h2>Testing the Dashboard</h2>

The dashboard is our landing page that acts as an essential hub for the user's health statistics. For testing:

**Test 1:** The dashboard loads with 4 tiles, and the user clicks on the one of the `[water/sleep/medications/buddy]` tiles.

- **Outcome:**
    - **Success:** The respective page should load up when clicked.
    - **Fail:** The respectiec page does not load whien clicked.
    - **Fail:** The wrong page loads instead when clicked.

**Test 2:** Dashboard tiles should display a quick glance into water and sleep health statistics.

- **Oucome:**
    - **Success:** The Water tile should display the total amount of water that the user has drank that day. The Sleep tile should display the total hours slept that day.
    - **Success:** Making a change in each of the trackers should be reflected on the Dashboard and in that resepctive tile.

    - **Fail:** The respective tiles do not display the health statistics

    - **Fail:** The respective tiles do not display the correct health statstic. If user makes an update and add an entry, the change should be reflected on the Dashboard.

<h2> Testing the Water Tracker </h2>

The Water Tracker is where the user can track their daily water intake habits and set goals for how much water they want to drink.

**Test 1:** User is able to add in 16 fl oz of water as their daily water intake.

- **Outcome:**
    - **Success:** Clicking on the `+` button one time should increase the count to 8 fl oz, clicking a second time should increase to 16 fl oz. On submit, the "Water Consumed Today" card should update, adding 16 fl oz to the total.
    - **Success:** If the count is at 0 fl oz, the user should not be able to subtract water intake. The submit button should also be disabled.
    - **Success:** User cannot add more than 96 fl oz of water at one time. `+` should be disabled after 96 fl oz is added.
    - **Fail:** Clicking on the buttons does not update the count.
    - **Fail:** Upon clicking the submit button, the water consumed today does not update with to add 16 fl oz of water.


**Test 2:** User is able to add and edit water goals to 64 fl oz.

- **Outcome:**
    - **Success:** Clicking on the `Edit Goal` button enables the form so that the user can enter in a water goal. 
    - **Success:** User can input any number including 1 - 99 fl oz. User can input 64 fl oz. 
    - **Success:** On click of the submit button, the "current goal" should update with 64 fl oz as the new current goal.
    - **Success:** User cannot edit the goal form without clicking on the "edit goal" button.
    - **Fail:** Clicking on the "edit goals" button does not enable the form.
    - **Fail:** Upon clicking the submit button, the water goal does not update with to 64 fl oz of water.

**NOTE:** Graph is not interactive and will not update with the changes that are made. This is just a placeholder and part of our P1. 

<h2> Testing the Sleep Tracker </h2>

The Sleep Tracker is where the user can track their daily sleeping habits and set goals for how much sleep they want to get.

**Test 1:** User is able to add in 11:30PM fl as their sleep time and 8:00AM as their wakeup time.

- **Outcome:**
    - **Success:** Clicking on the bed time/wake-up time form will pop up a clock interface that the user can spin around. User clicks to 11:30PM as sleeptime and 8:00AM as the wke-up time. Clicking log will save the times inputted and "last bed time" and "last wake time" should update with times inputted.
    - **Fail:** Clicking on the form does not load the clock interface.
    - **Fail:** Upon clicking the log button, the times inputted do not update the last bed time and last wake time..


**Test 2:** User is able to add and edit sleep goals to 7 hours, 30 mins.

- **Outcome:**
    - **Success:** Clicking on the `Edit Goal` button enables the form so that the user can enter in a sleep goal. 
    - **Success:** User inputs 7 hours into the hr form and 30 mins into the mins form.
    - **Success:** On click of the submit button, the "current goal" should update with "7 hr 30 min" as the new current goal.
    - **Success:** User cannot edit the goal form without clicking on the "edit goal" button.
    - **Fail:** Clicking on the "edit goals" button does not enable the form.
    - **Fail:** Upon clicking the submit button, the water goal does not update with to "7 hr 30 min".

**NOTE:** Graph is not interactive and will not update with the changes that are made. This is just a placeholder and part of our P1s. 


<h2>General Test Practices</h2>
We have created a suite of tests that will perform in order to verify that our code is running as expected and meets our functional requirements, along with doing our own manual testing.

**Manual test**:
- We utilized many Console.log() statements to check if the outputs or variables are matching what we are expect.
- Use the Chrome Inspect feature to see what error messages are being logged.
- Running our mobile web app on the localhost and interacting with our features to see if everything is working correctly.

**Automated test**:
- Write a suite of Jest tests to check that each of the features are rendering correctly and assert that the inputs and interactions are working correctly

**Running the Tests:**

In order to run the tests, use the command:
```
npm run test
```

If you want to run specific test files, use the command:
```
npm run test <name.test.js>
```

<h2>Explanation of Dashboard.test.js</h2>

- The first test ensures that the Dashboard component is rendering properly. This is done by asserting that "MY DASHBOARD" shows up in the testing DOM.

- The rest of the tests ensures that the navigation is working. This includes the navigation to the Water Tracker page, Sleep Tracker page, Medications page, and the Buddy page. 

<h2>Explanation of WaterTracker.test.js</h2>

- The first test ensures that the Water Tracker component is rendering properly. This is done by asserting that "Water Tracker" shows up in the testing DOM.

- The rest of the tests ensures that the button ineractions are working as expected. When the user clicks on the `+` button, it should increase the water count by 8 fl oz. When the `-` button is pressed, it should decrease the water count by 8 fl oz. We have a few tests to make sure these interactions work as expected.

**Known Bugs:**

- On smaller screens in the Medications page, there may be an overlap of input box and border. To fix this, move to a bigger screen or website mode instead of phone. In the future, this could be fixed with adding margins or padding.

- For Jest testing, there are some tests that fail, even though on the running application, the interaction works. In Jest, it requires certain modules to be ignored.

- If you get the error about no access control allow origin header, you need to do an `npm install CORS` in your terminal in the root joblessInSeattle folder. 