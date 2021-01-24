# Automated Videos

This is a project to automate video creation using common slideshow techniques from categorized media by category.

## Theory

This project is inspired by ML and human memory theory.
It's my hypothesis that viewing media similar to what you want to create, even very briefly in the case of images, will lead to drastically better creative output.
I'm sure there are many applications this could be used for or tested on but I intend for this to "supercharge" my creativity and ability in both worldbuilding and improvisation as a game master in Dungeons & Dragons.

## Getting Started

At the time of writing the program will create a composition of appropriate length and add images to it from an array of file paths.
Create your own .env file and add your media root folder's absolute path, don't add anything to the /media folder in this repo.

The plan is to use Elasticsearch to get the images paths after categorizing them, so this will be much more relevant later.

## The Plan

Download a ton of creative D&D art that could legally be used on YouTube in a slideshow also store fair and proper attribution for the artist.
Once a good collection of media is on deck, categorize all of it somehow (not necessarily programmatically).
Use Elasticsearch to get a sub-collection from the main collection and render two slideshows, one normal one and one where each image is only shown for a max of .5 seconds.
Programmatically build a video title and description, and upload the video to YouTube. Note: Add a numeric ID to the description that can be parsed. Have an automated video takedown in case of copyright report.

Every image should have noticble, but not distracting, movement.

Eventually, have a good method for categorizing/finding media effeciently and simply run a CLI command with a query to create, render, and upload YouTube videos.
Long-term the goal would be to fully automate this so videos are periodically created and uploaded with no human interaction.

Bonus plan: Optimize thumbnail clickability somehow.

## Outstanding Questions

How to handle music? I'm kinda thinking Adobe Audition would be good to hook into because you can extend songs to virtually any duration.
Doing it this way would mean that the amount of images is the sole determining factor of how long each video is which I kind of like. 

How should outros be handled? Maybe have a pre-rendered outro and just toss it in there? Could probably be a lot more creative than that.
