<h1 align="center"><strong>Testing Protocol</strong></h1>

We have created a suite of tests that will perform in order to verify that our code is running as expected and meets our functional requirements.

<h2>General Test Practices</h2>

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