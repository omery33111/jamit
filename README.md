![logo](https://github.com/user-attachments/assets/29b2728d-5592-4048-b99a-7ee09459a023)


#


[![Live Netlify Server](https://img.shields.io/badge/Live%20on-Netlify-00ad9f.svg)](https://jammoveo.netlify.app/)

[![Last Commit on GitHub](https://img.shields.io/github/last-commit/omery33111/jamoveo.svg)](https://github.com/omery33111/jamoveo/commits/main)

[![Pull Requests](https://img.shields.io/github/issues-pr/omery33111/jamoveo.svg?labelColor=24292E&logo=github&logoColor=white)](https://github.com/omery33111/jamoveo/pulls)


## Table of Contents
- [Description](#description) 🖐️
- [Technologies](#technologies) 🛠️
- [Features](#features) 📕
  - [Feature List](#feature-list) 📄
- [Running Instructions](#running-instructions) 🖱️
  - [Deployments](#deployments) ✈️
  - [Back-end adjustment](#back-end-adjustment) 🖥️
  - [Front-end adjustment](#front-end-adjustment) 🖥️
- [Contact](#contact) 📞


## Description
"Jamoveo" - The place for band rehearsals.

Jamoveo is a platform for our band to rehearse remotely.

Users register their instrument, admins schedule rehearsals and select songs. During rehearsals, everyone accesses chords or lyrics based on their role (musician or vocalist).


## Technologies
* Django: serves the option to use powerful features to build complex applications quickly.

* Django REST framework: a powerful and flexible toolkit for building Web APIs.

* Simple JWT: a JSON Web Token authentication library for Django that simplifies secure user authentication.

* React: a JavaScript library for building user interfaces, which enables fast and dynamic rendering of components.

* Redux: a state management library that allows for centralized management of application state.

* TypeScript: a superset of JavaScript that adds static types, enabling better code organization and easier debugging.

* SQLite3: a lightweight and self-contained relational database management system that's ideal for smaller-scale projects.



## Features
Jamoveo provides an exceptional experience for both musicians and admins.

The authentication system is designed to verify the identity of musicians and match them with the most suitable instrument, all while maintaining the highest security standards.
Musicians will be moved to the "live page" as soon as a show begins.

Admins can sign up as administrators and plan live shows for the band. They can find any song they want and start live performances whenever they choose. Admins can also stop shows when necessary.


### Feature List

* Authentication system
* Search song
* Start / stop live show
* Automatically redirect band members at the start and end of a show
* Getting chords & lyrics orderly


## Running Instructions
### Deployments
The front-end of my website is hosted by [Netlify](https://jammoveo.netlify.app/) while the database back-end is hosted on [Render](https://render.com/), allowing for seamless integration and efficient website management.

#

In order to make the software work properly in your local host, the steps below must be followed:

### Back-end adjustment

| Step | Command | Explanation |
| --- | --- | --- |
| 1 | `git clone https://github.com/omery33111/jamoveo.git` | Clone the project from GitHub |
| 2 | `cd .\jamoveo\back-end\` | Navigate to the back-end directory |
| 3 | `py -m virtualenv [name your environments file]` | Create virtual environments |
| 4 | `.\[environments name]\Scripts\activate` | Activate the created virtual environment |
| 5 | `pip install -r .\requirements.txt` | Install the project dependencies |
| 6 | `jamoveo  -->   back-end  -->  project  -->  settings.py` | Go to the "settings.py" file in the "project" directory. |

To run the program with SQLite3, mark all related databases, and ensure that all relevant databeses are configured.

![image](https://github.com/user-attachments/assets/b54b0471-294d-4341-8c2f-40fedff8af54)


| ...6 |  |  |
| --- | --- | --- |
| 7 | `py manage.py migrate` | Apply the database migrations |
| 8 | `py manage.py runserver` | Run the back-end server |


### Front-end adjustment

| Step | Command | Explanation |
| --- | --- | --- |
| 1 | `cd ..` | Go back to the main directory |
| 2 | `cd .\front-end\` | Navigate to the front-end directory|
| 3 | `npm install` | Install the front-end dependencies |
| 4 | `jamoveo --> front-end --> src --> endpoints --> endpoints.ts` | Go to the "endpoints.ts" file in the "endpoints" directory. |

To successfully run your server on local host, it's essential to ensure that your endpoints are correctly configured to direct you to the intended destination.

Ensure to designate any external server as marked and remove the marking from the local host server as shown:

** **This file is only necessary for local hosting and should be deleted in production**

![image](https://github.com/user-attachments/assets/b7b473b5-e8c3-4ffe-b0c3-703b65aa8f8c)



| ...4 |  |  |
| --- | --- | --- |
| 5 | `npm start` | Run the front-end server |

**Now you will be able to access JAMOVEO in your local host** "http://localhost:3000".



## Contact

📧 omery33111@gmail.com

ℹ️ https://www.linkedin.com/in/omer-yanai/

🐱 https://github.com/omery33111