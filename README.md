# Runner Route Website

This is an old proof of concept that I built a while back.

The website uses an Apple Watch app and several AWS services to allow users to live stream their running/walking workouts as well as their heart rates onto a plane that would be viewable by any user of the 'runnerroute' website.

See the example screenshot below that illustrates two users whose activities are being tracked at the same
time.

![screenshot.png](./docs/tracker-screenshot.png)

The red line's data is provided by Apple's GPS movement simulator for Apple Watch development. The pink
dot at the origin's data is provided by my own physical Apple Watch as I was sitting at my desk.

## Watch App

The code for the Apple Watch app is within a private repository as it was fairly simple. I just forked
an example workout watch app provided by Apple. I then added a REST call into the app that provides the watch's GPS coordinates and the user's current heart rate to a Lambda function at regular intervals.

## Future Development

Currently, I have no plans to revive this project but it did serve as a fun way to explore AWS, Apple Watch development, and build a fun website that crosses into the real world.