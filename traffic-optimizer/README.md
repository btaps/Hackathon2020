# TEAM GREEN LIGHT

Objective: Optimize traffic lights using Q-learning, sound recognition, HERE Maps and Agora.
## How to run the code :

#### OS requirement: *nix machine
#### Run this on terminal
#### To run the live demo :

    $ make # or javac -classpath .:java_lib/javax.json-1.0.4.jar ActionImpl.java CarImpl.java LearningModuleImpl.java Main.java RoadMapImpl.java TrafficLightImpl.java Viewer.java
    $
    $ java -classpath .:java_lib/javax.json-1.0.4.jar Main $(echo `node fetch_stats.js`)
    
#### To generate graphs :

    $node script.js 
    $make
    $java Main dailytime.csv 
    $sudo pip install -r requirements.txt 
    $python plotting.py
    