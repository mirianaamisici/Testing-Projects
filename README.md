Install cypress and all dependencies: npm install;
In order to run the tests from the cypress interface you can use: npx cypress open;
In order to run tests from the terminal you can use: npx cypress run --browser chrome --headless --spec "cypress\e2e\*.js";
If you want to run only one `it` block from a TC you should use: it.only;

![image](https://github.com/user-attachments/assets/c6346713-ce1a-4fd5-a145-340281bcc619)
