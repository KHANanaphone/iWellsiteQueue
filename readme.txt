iWellsiteQueue by Adam Ferguson
===============================

INSTALLATION:

(Disclaimer: You would probably know better than I would how to get this running in a different environment, but I'll try my best. I have literally never done any web development with Java before so my vocabulary might be off.)

"Broker" is the back-end server, it runs on a Tomcat 7.0 server on port 8080. If you have to change the port or are not running on 'localhost', then you'll have to change the "serverName" value in Tests/WebContent/js/config.js. The URL that the Test pages use is localhost:8080/Broker/<topicname>. You can try that out in a browser, and it will just say "No ID found".

"Front End" is the front-end server, also on a Tomcat 7.0 server on port 8180. I wanted it to be running on a different server than the broker, because that seemed more sensible. There were some issues with this that I couldn't dig deeper into because I was crunched for time, so the security is lacking. I looked into SSL for a bit as well, but decided I had to make sure the functionality worked first. The pages you're interested in are http://localhost:8180/FrontEnd/consumer.html and http://localhost:8180/FrontEnd/producer.html

================================

BROKER:

When a POST request comes to <url>/<topicname>, then whatever is in the "message" parameter gets added to the TopicManager for that topicname.

When a GET request comes to <url>/<topicname>, then the TopicManager is checked for topics with that topic name, and if there is one that the given user hasn't seen yet, it returns that. Otherwise, it will do five 1 second retries to see if any new data has been entered.

One special URL is <url>/GetSessionID, which returns a session id for the Consumer. I am aware that the security for this is lacking, the user can just type any ID and it won't reject them.

================================

PRODUCER:

The producer page is fairly simple. There are errors shown if the topic name doesn't exist or has odd characters in it. I just used simple bootstrap for the styling.

================================

CONSUMER:

This page is more complicated. It waits for the server to provide a session ID, then allows the user to enter topics. When they enter a topic, it shows up in their feed below. They can just click the "check" button afterward to check that topic again. They can also just click the "auto-check" checkbox and it'll just keep checking forever (until an error gets thrown).

The javascript is fairly ugly, ideally it would be organized better with "Topic" object.